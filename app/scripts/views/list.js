/*global define*/

define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'collections/cards',
    'models/card',
    'views/cards',
    'views/card',
    'text!templates/list.html'
], function ($, ui, _, Backbone, Cards, Card, CardsView, CardView, listTemplate) {
    'use strict';

    var ListsView = Backbone.View.extend({

        template: _.template(listTemplate),
        tagName: 'div',
        className: 'list',

        initialize: function (options) {
            var that = this;
            that.appEvents = options.vent;
            //that.cards = new Cards({listId:that.model.get('id')});
            //that.cards.fetch({
            //    success: function() {
            //        that.render();
            //    }
            //});
            that.collection.on('add', that.render, that);
            that.collection.on('remove', that.render, that);
            that.collection.on('change', that.render, that);
        },

        events: {
            'click div.card': 'cardClick',
            'submit form.add_card': 'addCard',
            'click .open_form' : 'showForm',
            'click .close_form': 'hideForm'
        },

        showForm: function() {
            this.$('form.add_card').show();
            this.$('.open_form').hide();
        },

        hideForm: function() {
            this.$('form.add_card').hide();
            this.$('.open_form').show();
        },

        cardClick: function (event) {
            event.stopPropagation();
            var that = this;

            var cardId = $(event.target).data('cardId');
            var $cardModal = $('section.card_detail');

            var list = that.model;
            var card = that.collection.get(cardId);

            card.fetch({
                success: function (card) {
                    var cardView = new CardView({
                        model: card,
                        collection: that.collection
                    });
                    $cardModal.html(cardView.render().$el);
                    $cardModal.find('div.card_detail').modal();
                }
            });
        },

        addCard: function (event) {
            event.preventDefault();
            var that = this;

            var list = that.model;
            var card = new Card();

            var $form = $(event.target);
            var attrs = {};

            attrs.name = $form.find('.card_name').val();
            attrs.idList = list.get('id');
            $form[0].reset();

            if (!attrs.name) {
                return false;
            }

            card.save(attrs, {
                success: function (data) {
                    that.collection.add(card);
                }
            });
        },

        render: function () {
            var that = this;

            var list = that.model;
            var list_id = list.get('id');

            that.$el.attr('id', 'list_' + list_id);
            that.$el.html(that.template({
                list: list
            }));

            // include cards index
            var cardsView = new CardsView({
                cards: that.collection.where({idList:that.model.id})
            });
            that.$('section.cards').html(cardsView.render().el);

            that.$('div.cards').droppable({
                drop: function (event, ui) {
                    var cardId = $(event.toElement).data('cardId');
                    var listId = that.model.get('id');
                    var card = that.collection.findWhere({id:cardId});
                    card.save({idList:listId});
                }

            });

            that.$('div.card').draggable();

            return that;
        }
    });

    return ListsView;
});
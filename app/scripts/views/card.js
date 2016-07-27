define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'text!templates/card.html'
], function ($, ui, _, Backbone, cardTemplate) {
    'use strict';

    var CardView = Backbone.View.extend({
        template: _.template(cardTemplate),
        tagName: 'div',
        className: 'modal fade card_detail',
        attributes: {role:'dialog'},

        initialize: function () {
            var that = this;
            that.model.on('update', that.render, that);
            that.model.on('change', that.render, that);
        },

        events: {
        },

        render: function () {
            var that = this;
            var card = that.model;

            var renderedContent = that.template({
                card: card
            });
            that.$el.html(renderedContent);

            return that;
        }
    });

    return CardView;
});
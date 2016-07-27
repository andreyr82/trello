/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/lists',
    'collections/cards',
    'models/list',
    'views/list',
    'common/conf',
    'text!templates/board.html'
], function ($, _, Backbone, Lists, Cards, List, ListView, Conf, boardTemplate) {
    'use strict';

    var BoardView = Backbone.View.extend({
        template: _.template(boardTemplate),
        tagName: 'section',
        className: 'board-show group',

        initialize: function (options) {
            var that = this;
            that.appEvents = options.vent;
            that.appEvents.on('board:refresh', that.refresh, that);
            that.lists = new Lists();
            that.cards = new Cards();
            that.refresh();
        },

        events: {
        },

        refresh: function () {
            var that = this;
            $.when(that.lists.fetch(), that.cards.fetch())
                .then(function() {
                    that.render();
                })
        },

        render: function () {
            var that = this;

            // console.log('render board');
            var board = that.model;
            //var lists = new Lists();

            that.$el.html(that.template({
                board: board
            }));

            // render lists
            that.lists.each(function (list) {
                var listShow = new ListView({
                    model: list,
                    collection: that.cards,
                    vent: that.appEvents
                });
                that.$('section.lists').append(listShow.render().el);
            });

            return that;
        },

        onDestroy: function() {
            var that = this;
        }
    });

    return BoardView;
});

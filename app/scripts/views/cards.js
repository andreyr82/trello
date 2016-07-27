/*global define*/

define([
    'jquery',
    'jqueryui',
    'underscore',
    'backbone',
    'text!templates/cards.html'
], function ($, ui, _, Backbone, cardsTemplate) {
    'use strict';

    var CardsView = Backbone.View.extend({

        template: _.template(cardsTemplate),

        initialize: function (options) {
            var that = this;
            that.cards = options.cards
        },

        render: function () {
            var that = this;

            var renderedContent = that.template({
                cards: that.cards
            });

            that.$el.html(renderedContent);

            return that;
        }
    });

    return CardsView
});
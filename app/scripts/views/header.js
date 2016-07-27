/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html'
], function ($, _, Backbone, headerTemplate) {
    'use strict';

    var HeaderView = Backbone.View.extend({

        template: _.template(headerTemplate),

        events: {
            'click .refresh-board': 'refresh'
        },

        initialize: function (options) {
            this.appEvents = options.vent
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        refresh: function() {
            this.appEvents.trigger('board:refresh');
        }
    });

    return HeaderView
});

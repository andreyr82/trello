/*global define*/

define([
    'jquery',
    'backbone',
    'views/header',
    'views/board',
    'models/board',
    'common/conf'
], function ($, Backbone, HeaderView, BoardView, Board, Conf) {
    'use strict';

    var Router = Backbone.Router.extend({
        initialize: function (options) {
            this.appEvents = options.vent;
        },

        routes: {
            '*path':'index'
        },

        index: function() {
            var that = this;
            var header = new HeaderView({vent: this.appEvents});
            var BoardModel = new Board({id:Conf.board});
            $('#header').html(header.render().$el);
            BoardModel.fetch({
                success: function() {
                    var board = new BoardView({vent: that.appEvents, model:BoardModel});
                    $('#content').html(board.render().$el);
                }
            })
        }
    });

    return Router;
});

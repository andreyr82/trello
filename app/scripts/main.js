/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        jqueryui: {
            deps: ['jquery']
        },
        trello: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        jqueryui: '../bower_components/jquery-ui/jquery-ui.min',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
        modal: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
        text: '../bower_components/requirejs-text/text',
        trello: '//api.trello.com/1/client.js?key=0b35aeddc2ed63039f644de6a7aef92a'
    }
});

require([
    'jquery',
    'backbone',
    'routes/router',
    'text!templates/noauth.html',
    'bootstrap',
    'trello'
], function ($, Backbone, Router, noauthTemplate) {
    var success = function() {
        var vent = _.extend({}, Backbone.Events);
        var router = new Router({vent: vent});
        router.navigate('', {trigger: true});
        Backbone.history.start();
    };
    var err = function() {
        $('#content').html(noauthTemplate);
    };

    Trello.authorize({
        type: 'popup',
        name: 'Test trello app',
        scope: {
            read: true,
            write: true },
        expiration: 'never',
        success: success,
        error: err
    });
});

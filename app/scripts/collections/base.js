define([
    'underscore',
    'backbone',
    'common/util'
], function (_, Backbone, Util) {
    'use strict';
    var BaseCollection = Backbone.Collection.extend({
        sync: Util.sync
    });

    return BaseCollection;
});
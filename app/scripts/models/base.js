/*global define*/

define([
    'underscore',
    'backbone',
    'common/util'
], function (_, Backbone, Util) {
    'use strict';
    var BaseModel = Backbone.Model.extend({
        sync:Util.sync
    });

    return BaseModel;
});
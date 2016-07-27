define([
    'jquery',
    'underscore',
    'backbone',
    'common/conf'
], function ($, _, Backbone, Conf) {
    'use strict';
    var Util = {
        sync: function (method, object, options) {
            if (Trello && Trello.authorized()) {
                if(method == 'create' || method == 'update') {
                    object.set('key',  Conf.key);
                    object.set('token',  Trello.token());
                } else {
                    options.data = _.extend({}, options.data, {"key": Conf.key,"token":Trello.token()});
                }
            }
            return Backbone.sync.apply(this, [method, object, options]);
        }
    };
    return Util;
});
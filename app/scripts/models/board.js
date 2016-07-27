define([
    'underscore',
    'backbone',
    'models/base',
    'common/conf'
], function (_, Backbone, BaseModel, Conf) {
    'use strict';
    var Board = BaseModel.extend({
        urlRoot: Conf.apiUrl+'/boards'
    });

    return Board;
});
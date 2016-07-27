define([
    'underscore',
    'backbone',
    'models/base',
    'common/conf'
], function (_, Backbone, BaseModel, Conf) {
    'use strict';
    var Card = BaseModel.extend({
        urlRoot: Conf.apiUrl+'/cards'
    });

    return Card;
});
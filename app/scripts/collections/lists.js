define([
    'underscore',
    'backbone',
    'models/list',
    'collections/base',
    'common/conf'
], function (_, Backbone, List, BaseCollection, Conf) {
    'use strict';
    var Lists = BaseCollection.extend({
        url: Conf.apiUrl+'/boards/'+Conf.board+'/lists',
        model: List
    });

    return Lists;
});
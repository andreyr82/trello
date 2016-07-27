/*global define*/

define([
    'underscore',
    'backbone',
    'models/base',
    'common/conf'
], function (_, Backbone, BaseModel, Conf) {
    'use strict';
    var List = BaseModel.extend({
        urlRoot: Conf.apiUrl+'/lists'
    });

    return List;
});
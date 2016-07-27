define([
    'underscore',
    'backbone',
    'models/card',
    'collections/base',
    'common/conf'
], function (_, Backbone, Card, BaseCollection, Conf) {
    'use strict';
    var Cards = BaseCollection.extend({
        model: Card,
        url: Conf.apiUrl+'/boards/'+Conf.board+'/cards',
        comparator: function (card) {
            return card.get('position');
        }
    });

    return Cards;
});
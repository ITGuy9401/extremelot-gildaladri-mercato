'use strict';

angular.module('mercatino')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });

/**
 * Created by sophia.wang on 17/3/27.
 */
'use strict';

// signout controller
app.controller('SignoutController', ['$scope', 'SERVICE_URL', function($scope, SERVICE_URL) {
    $scope.user = {};
    $scope.authError = null;

    console.log(SERVICE_URL);
    var logoutUrl = SERVICE_URL.cas + "/logout";
    window.location = logoutUrl;
}]);

/**
 * Created by sophia.wang on 17/3/27.
 */
app.factory('User', function($q, $resource) {
    var userInfo, deferred = $q.defer();

    var api_user = window.location.pathname + "getUserInfo";
    var res_user = $resource(api_user, {});
    var api_usermenu = "/services/menu/getMenuByLoginName/:userName/:sideid";
    var res_usermenu = $resource(api_usermenu, {userName:"@userName", sideid:'@sideid'});

    return {
        getUserInfo: function () {
            res_user.get({}, function (response) {
                userInfo = response.toJSON();
                deferred.resolve(response.toJSON());
            });
            return deferred.promise;
        },
        getUserMenu: function (params) {
            res_usermenu.get(params, function (response) {
                deferred.resolve(response.toJSON());
            });
            return deferred.promise;
        }
    }
});

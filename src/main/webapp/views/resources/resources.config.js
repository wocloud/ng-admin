/**
 * Created by sophia.wang on 17/3/30.
 */
app.filter('Status', function(){
        return function(input){
            switch (input){
                case 'Enabled':    return 'Enabled';
                case 'Connected':   return 'Connected';
                default:    return input;
            }
        }
    })
    .config(['$stateProvider', function ($stateProvider){
        $stateProvider
            .state('app.resources', {
                url: '/resources',
                template: '<div ui-view></div>'
            })
            .state('app.resources.host', {
                url: '/host',
                templateUrl: 'views/resources/host/host.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('sf.ui.grid').then(
                                function () {
                                    return $ocLazyLoad.load([
                                        'views/resources/resources.service.js',
                                        'views/resources/host/host.js',
                                        'views/common/search.js'
                                    ]);
                                }
                            );
                        }]
                }
            })
            .state('app.resources.host_detail', {
                url: '/host_detail?uuid',
                templateUrl: 'views/resources/host/host_detail.html',
                controller: 'HostDetailCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load([
                                'views/resources/resources.service.js',
                                'views/resources/host/host.js'
                            ]);
                        }]
                }
            });
    }]);
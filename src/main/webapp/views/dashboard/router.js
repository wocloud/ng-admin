/**
 * Created by sophia.wang on 17/3/23.
 */
angular.module('app')
    .config(['$stateProvider', function ($stateProvider){
        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/dashboard.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(
                                ['vendor/modules/echarts/china.js',
                                'views/dashboard/dashboard.js']
                            );
                        }]
                }
            });
        }
    ]
);
/**
 * Created by sophia.wang on 17/3/23.
 */
angular.module('app')
    .config(['$stateProvider', function ($stateProvider){
        $stateProvider
            .state('app.vm', {
                url: '/vm',
                templateUrl: 'views/instances/vm/vm.html',
                deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                        return $ocLazyLoad.load('ui.grid').then(
                            function(){
                                return $ocLazyLoad.load('views/instances/vm/vm.js');
                            }
                        );
                    }]
            });
        }
    ]
);
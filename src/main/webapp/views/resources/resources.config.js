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
                template: '<div ui-view class="fade-in"></div>',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'views/resources/resources.service.js',
                                'views/common/search.js'
                            ]);
                        }]
                }
            })
            .state('app.resources.host', {
                url: '/host?uuid',
                templateUrl: 'views/resources/host/host.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('sf.ui.grid').then(
                                function () {
                                    return $ocLazyLoad.load([
                                        'views/resources/host/host.js'
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
                                'views/resources/host/host.js'
                            ]);
                        }]
                }
            })
            .state('app.resources.vm', {
                url: '/vm',
                templateUrl: 'views/resources/vm/vm.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('sf.ui.grid').then(
                                function () {
                                    return $ocLazyLoad.load([
                                        'views/resources/vm/vm.js',
                                        'vendor/jquery/bootstrapwizard/js/prettify.js',
                                        'vendor/jquery/bootstrapwizard/js/bootstrap-wizard.min.js',
                                        'vendor/jquery/bootstrapwizard/css/bootstrap-wizard.css'
                                    ]);
                                }
                            );
                        }]
                }
            })
            .state('app.resources.vm_detail', {
                url: '/vm_detail?uuid',
                templateUrl: 'views/resources/vm/vm_detail.html',
                controller: 'VMDetailCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load([
                                'views/resources/vm/vm.js'
                            ]);
                        }]
                }
            });
    }]);
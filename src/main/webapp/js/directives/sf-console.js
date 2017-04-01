/**
 * Created by sophia.wang on 17/3/29.
 */
angular.module('sf.console', [])
    .directive('sfState', function($compile) {
        return {
            restrict: 'AE',
            scope:{
                state:'=',
                type:'='
            },
            replace:true,
            template:'<span><i class="text-xs mr-6"></i> {{state | uppercase}}</span>',
            link: function(scope, elem, attrs){
                var i =  elem.find("i");
                i.attr("class","text-xs");
                if(scope.state){
                    if(scope.state == 'Enabled' || scope.state == 'Connected') {
                        i.addClass("fa fa-circle success_i");
                    }
                    if(scope.state == 'Maintenance' || scope.state.indexOf('ing') > -1) {
                        i.addClass("fa fa-spinner waring_i");
                    }
                }else{
                    i.addClass("fa fa-heart-o default_i");
                }
                $compile(elem.contents())(scope);
            }
        }
    })
    .directive('sfBreadcrumb', function() {
        return {
            restrict: 'AE',
            scope:{
                arr:'='
            },
            replace:true,
            template:'<div class="breadcrumbs wrapper padder-v-xs">' +
                '<a class="path" ui-sref="app.dashboard-v1">Application</a>' +
                '<a class="path" ng-repeat="item in arr track by $index" ui-sref="{{item.path}}">/ {{item.name}}</a>' +
            '</div>'
        }
    })
    .directive('sfSearchGroup', function() {
        return {
            restrict: 'A',
            scope:{
                callFn:'='
            },
            link: function(scope, elem, attr){



                function myKeyUp(e){
                    var keycode = window.event?e.keyCode:e.which;
                    if(keycode==13){
                        scope.callFn();
                    }
                }
            }
        }
    });

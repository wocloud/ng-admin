/**
 * Created by sophia.wang on 17/3/30.
 */
'use strict';

app.controller('HostCtrl', function HostCtrl($scope, $modal, $timeout, $log, resourceService) {

    $scope.breadcrumbs = [
        {'path': 'app.resources.host', 'name': 'Host'}
    ];

    ///////////// table ///////////////
    $scope.queryParams = {"conditions":[]};
    $scope.dataArr = [];
    $scope.colArr = [
        {
            field: 'name',
            displayName: '名称',
            cellTemplate: '<a class="text-info" ui-sref="app.resources.host_detail({uuid: row.entity.uuid})">{{ row.entity.name }}</a>'
        },
        {
            field: "description",
            displayName: '描述'
        },
        {
            field: "managementIp",
            displayName: '管理IP'
        },
        {
            field: "hypervisorType",
            displayName: '虚拟化类型'
        },
        {
            field: "state",
            displayName: '可用状态',
            cellTemplate: '<sf-state type="host" state="row.entity.state"></sf-state>'
        },
        {
            field: "status",
            displayName: '连接状态',
            cellTemplate: '<sf-state type="host" state="row.entity.status"></sf-state>'
        },
        {
            field: "uuid",
            displayName: 'UUID'
        }
    ];

    $scope.params = {grid: {}, fun: {}};

    // callback function
    $scope.callFn = function(item){
        $scope.selectedItem = item;
    };

    function getAjaxData() {
        resourceService.host_query($scope.queryParams).then(function(response){
            if(response.errorCode==0){
                $scope.dataArr = response.result;
            }
        });
    };

    $scope.loadData = function() {
        getAjaxData();
    };

    $scope.loadData();

    $scope.refresh = function(){
        $scope.queryParams = {"conditions":[]};
        getAjaxData();
    };

    ///////////// Events ///////////////
    $scope.search = function() {
        var dataStructure = [
            {'name': 'UUID', 'value':'uuid', 'type':'string'},
            {'name': '名称', 'value':'name', 'type':'string'},
            {'name': '区域ID', 'value':'zoneUuid', 'type':'string'},
            {'name': '集群ID', 'value':'clusterUuid', 'type':'string'},
            {'name': '可用状态', 'value':'state', 'type':'enum',
                options: [{'name':'Enabled', 'value': 'Enabled'}]},
            {'name': '连接状态', 'value':'status', 'type':'enum',
                options: [{'name':'Connecting', 'value': 'Connecting'},{'name':'Connected', 'value': 'Connected'}]},
            {'name': '虚拟化类型', 'value':'hypervisorType', 'type':'enum',
                options: [{'name':'KVM', 'value': 'KVM'}]},
            {'name': '管理IP', 'value':'managementIp', 'type':'string'},
            {'name': 'ssh端口', 'value':'sshPort', 'type':'string'},
            {'name': 'ssh用户名', 'value':'username', 'type':'string'},
            {'name': 'ssh密码', 'value':'password', 'type':'string'},
            {'name': '描述', 'value':'description', 'type':'string'},
            {'name': '创建日期', 'value':'createDate', 'type':'datetime'}
        ];
        $scope.params = dataStructure;
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'host_search',
            controller: 'SearchCtrl',
            resolve: {
                params: function () {
                    return $scope.params;
                }
            }
        });
        modalInstance.result.then(function (result) {
            $scope.queryParams.conditions = result;
            $scope.loadData();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addData = function(){
        $scope.params.grid = {state: "enabled"};
        $scope.params.fun = {name: "添加"};
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'host_add',
            controller: 'HostAddCtrl',
            resolve: {
                params: function () {
                    return $scope.params;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $timeout(function(){
                $scope.refresh();
            },1000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.delData = function (size) {
        if (!$scope.selectedItem) {
            window.wxc.xcConfirm("未选择删除的资源！", window.wxc.xcConfirm.typeEnum.info);
            return;
        }
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'host_delete',
            controller: 'HostDeleteCtrl',
            size: size,
            resolve: {
                selectedItem: function () {
                    return $scope.rowItem;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            removeByValue($scope.dataArr, selectedItem);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]['id'] === val['id']) {
                arr.splice(i, 1);
                $scope.rowItem = null;
                break;
            }
        }
    };

});

app.controller('HostDetailCtrl', function HostDetailCtr($scope, $stateParams, resourceService){

    var uuid = $stateParams.uuid;

    getByUUID(uuid);

    function getByUUID(uuid) {
        $scope.queryParams = {"conditions":[{"name": "uuid", "value": uuid, "op":"="}]};
        resourceService.host_query($scope.queryParams).then(function(response){
            if(response.errorCode==0){
                $scope.current = response.result[0];
                $scope.breadcrumbs = [
                    {'path': 'app.resources.host', 'name': 'Host'},
                    {'path': 'app.resources.host_detail({uuid: "'+ $scope.current.name +'"})', 'name': $scope.current.name }
                ];
            }
        });
    };
});

app.controller('HostAddCtrl', ['$scope', '$modalInstance', 'resourceService', 'params', function ($scope, $modalInstance, resourceService, params){

    $scope.fun = params.fun;
    $scope.grid = params.grid;
    $scope.ok = function (isValid, add) {
        if (!isValid) return;
        $modalInstance.close($scope.grid);
        createAjax(add);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    function createAjax(parameters) {
        $scope.cancel();
        resourceService.host_create(parameters).then(function(response){
            if(response.errorCode==0){
                $scope.newHost = response.result;
                window.wxc.xcConfirm("Host创建操作成功,请等待结果!", window.wxc.xcConfirm.typeEnum.success);
            } else {
                window.wxc.xcConfirm("Host创建操作失败!", window.wxc.xcConfirm.typeEnum.error);
            }
        });
    }

}]);

app.controller('HostDeleteCtrl', ['$scope', '$modalInstance', 'selectedItem', 'resourceService', function ($scope, $modalInstance, selectedItem, resourceService) {
    $scope.ok = function () {
        $scope.cancel();
        resourceService.host_destroy({"uuid": selectedItem.uuid}).then(function(response){
            if(response.errorCode==0){
                $scope.newHost = response.result;
                window.wxc.xcConfirm("Host删除操作成功,请等待结果!", window.wxc.xcConfirm.typeEnum.success);
            } else {
                window.wxc.xcConfirm("Host删除操作失败!", window.wxc.xcConfirm.typeEnum.error);
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

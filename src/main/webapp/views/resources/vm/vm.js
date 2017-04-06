/**
 * Created by sophia.wang on 17/4/5.
 */
'use strict';

app.controller('VMCtrl', function VMCtrl($scope, $modal, $timeout, $log, $stateParams, resourceService) {

    $scope.breadcrumbs = [
        {'path': 'app.resources.vm', 'name': 'VM'}
    ];

    ///////////// table ///////////////
    var uuid = $stateParams.uuid;
    $scope.queryParams = {"conditions":[{"name":"type","op":"=","value":"UserVm"}]};
    if(uuid) {
        $scope.queryParams.conditions.push({"name":"uuid","op":"=","value":uuid});
    }
    $scope.dataArr = [];
    $scope.colArr = [
        {
            field: 'name',
            displayName: '名称',
            cellTemplate: '<a class="text-info" ui-sref="app.resources.vm_detail({uuid: row.entity.uuid})">{{ row.entity.name }}</a>'
        },
        {
            field: "defaultIP",
            displayName: '默认IP',
            cellTemplate: '<span>{{ row.entity.vmNics[0].ip }}</span>'
        },
        {
            field: "hostIP",
            displayName: '物理机',
            cellTemplate: '<a class="text-info" ui-sref="app.resources.host({uuid: row.entity.hostUuid})">{{ row.entity.hostUuid }}</a>'
        },
        {
            field: "state",
            displayName: '可用状态',
            cellTemplate: '<sf-state type="vm" state="row.entity.state"></sf-state>'
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
        resourceService.vm_query($scope.queryParams).then(function(response){
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
        $scope.queryParams = {"conditions":[{"name":"type","op":"=","value":"UserVm"}]};
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
            {'name': '默认IP', 'value':'defaultIp', 'type':'string'},
            {'name': '描述', 'value':'description', 'type':'string'},
            {'name': '创建日期', 'value':'createDate', 'type':'datetime'}
        ];
        $scope.params = dataStructure;
        var modalInstance = $modal.open({
            backdrop: false,
            templateUrl: 'vm_search',
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
            templateUrl: 'vm_add',
            controller: 'VMAddCtrl',
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
            templateUrl: 'vm_delete',
            controller: 'VMDeleteCtrl',
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

app.controller('VMDetailCtrl', function VMDetailCtr($scope, $stateParams, resourceService){

    var uuid = $stateParams.uuid;

    getByUUID(uuid);

    function getByUUID(uuid) {
        $scope.queryParams = {"conditions":[{"name": "uuid", "value": uuid, "op":"="}]};
        resourceService.vm_query($scope.queryParams).then(function(response){
            if(response.errorCode==0){
                $scope.current = response.result[0];
                $scope.breadcrumbs = [
                    {'path': 'app.resources.vm', 'name': 'VM'},
                    {'path': 'app.resources.vm_detail({uuid: "'+ $scope.current.name +'"})', 'name': $scope.current.name }
                ];
            }
        });
    };
});

app.controller('VMAddCtrl', ['$scope', '$modalInstance', 'resourceService', 'params', function ($scope, $modalInstance, resourceService, params){

    $scope.fun = params.fun;
    $scope.grid = params.grid;

    ////////////// wizard /////////////
    var wizard = $('#add-wizard').wizard({
        keyboard : false,
        contentHeight : 400,
        contentWidth : 700,
        backdrop: 'static'
    });

    ////////////// event /////////////
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
        resourceService.vm_create(parameters).then(function(response){
            if(response.errorCode==0){
                $scope.newVM = response.result;
                window.wxc.xcConfirm("VM创建操作成功,请等待结果!", window.wxc.xcConfirm.typeEnum.success);
            } else {
                window.wxc.xcConfirm("VM创建操作失败!", window.wxc.xcConfirm.typeEnum.error);
            }
        });
    }

}]);

app.controller('VMDeleteCtrl', ['$scope', '$modalInstance', 'selectedItem', 'resourceService', function ($scope, $modalInstance, selectedItem, resourceService) {
    $scope.ok = function () {
        $scope.cancel();
        resourceService.vm_destroy({"uuid": selectedItem.uuid}).then(function(response){
            if(response.errorCode==0){
                $scope.newVM = response.result;
                window.wxc.xcConfirm("VM删除操作成功,请等待结果!", window.wxc.xcConfirm.typeEnum.success);
            } else {
                window.wxc.xcConfirm("VM删除操作失败!", window.wxc.xcConfirm.typeEnum.error);
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

/**
 * Created by sophia.wang on 17/4/1.
 */
app.controller('SearchCtrl', ['$scope', '$modalInstance', 'params', function SearchCtrl($scope, $modalInstance, params){

    //////////////// search modal variables  /////////////////
    $scope.searchNameObject = params;
    $scope.searchOpObject = [
        {name: '='},
        {name: '!='},
        {name: '>'},
        {name: '>='},
        {name: '<'},
        {name: '<='},
        {name: 'like'}
    ];
    $scope.duplicateCondition = false;
    $scope.conditions = [];
    $scope.conditionsText = [];
    $scope.curName = $scope.searchNameObject[0].value;
    $scope.currentConditionName = $scope.searchNameObject[0];

    //////////////// datepicker init  /////////////////
    $scope.today = function() {
        var dt = new Date();
        $scope.curValue = dt.toLocaleDateString();
    };
    $scope.clear = function () {
        $scope.curValue = '';
    };
    $scope.format = "yyyy/MM/dd";
    $scope.dateOptions = {
        formatYear: 'yyyy',
        formatMonth: 'MM',
        formatDay: 'dd',
        startingDay: 1,
        class: 'datepicker'
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    //////////////// search modal events  /////////////////
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.nameChange = function(curName){
        angular.forEach($scope.searchNameObject, function(value, key) {
            if(value && value.value == curName) {
                $scope.currentConditionName = value;
                $scope.curValue = '';
            }
        });
    };

    $scope.addCondition = function($event, curValue){

        var tr = $($event.target).parents("tr");
        var currentName = tr.find("td:eq(0)").find("select").val();
        var currentNameText = tr.find("td:eq(0)").find("select option:selected").text();
        var currentOp = tr.find("td:eq(1)").find("select").val();
        var currentValue = curValue;

        angular.forEach($scope.conditions, function(value, key) {
            $scope.duplicateCondition = false;
            if(value && value.name == currentName) {
                $scope.duplicateCondition = true;
                return;
            }
        });

        if(!$scope.duplicateCondition) {

            var realValue = currentValue;
            if(currentOp == 'like') {
                realValue = '%' + currentValue + '%';
            }
            var currentCondition = {
                'name' : currentName,
                'op'   : currentOp,
                'value': realValue
            };
            var currentConditionText = {
                'name' : currentNameText,
                'op'   : currentOp,
                'value': currentValue
            };

            $scope.conditions.push(currentCondition);
            $scope.conditionsText.push(currentConditionText);
        }
    };

    $scope.deleteCondition = function($event, index){
        $scope.conditions.splice(index, 1);
        $scope.conditionsText.splice(index, 1);
    };

    $scope.ok = function(){
        $modalInstance.close($scope.conditions);
    };

}]);
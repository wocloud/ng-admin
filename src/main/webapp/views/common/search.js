/**
 * Created by sophia.wang on 17/4/1.
 */
app.controller('SearchCtrl', ['$scope', '$modalInstance', 'params', function SearchCtrl($scope, $modalInstance, params){

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

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.nameChange = function(curName){

        angular.forEach($scope.searchNameObject, function(value, key) {
            if(value && value.name == curName) {
                $scope.currentConditionName = value;
                return;
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

    $scope.deleteCondition = function($event){
        $($event.target).parents("tr").remove();
    };

    $scope.ok = function(){
        $modalInstance.close($scope.conditions);
    };

}]);
angular.module('sf.ui.grid', [])
    .directive('sfUiGrid', function(i18nService){
        return {
            restrict: 'E',
            scope   :{
                arr:'=',
                colArr:'=',
                callFn:'=',
                loadData: '=',
                paginationCurrentPage: '=',
                paginationPageSize: '=',
                totalElements: '='
            },
            template: '<div ui-grid="gridOptions" style="width: 100%; height: 100%; text-align: center;"  ' +
            'ui-grid-edit ui-grid-pagination ui-grid-selection ui-grid-exporter ui-grid-resize-columns ui-grid-auto-resize></div>',
            link    : function(scope, elem, attrs){

                i18nService.setCurrentLang("zh-cn");

                var index = 0;

                scope.gridOptions = {
                    columnDefs: scope.colArr,
                    enableCellEdit: false, // 是否可编辑
                    enableSorting: true, //是否排序
                    useExternalSorting: false, //是否使用自定义排序规则
                    enableGridMenu: true, //是否显示grid 菜单
                    showGridFooter: false, //是否显示grid footer
                    enableHorizontalScrollbar: 0, //grid水平滚动条是否显示, 0-不显示  1-显示
                    enableVerticalScrollbar: 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
                    //-------- 分页属性 ----------------
                    enablePagination: true, //是否分页，默认为true
                    enablePaginationControls: true, //使用默认的底部分页
                    paginationPageSizes: [10], //每页显示个数可选项
                    paginationCurrentPage: 1, //当前页码
                    paginationPageSize: scope.paginationPageSize ? scope.paginationPageSize : 10, //每页显示个数
                    totalItems: 0, // 总数量
                    //----------- 选中 ----------------------
                    enableFooterTotalSelected: false, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                    enableFullRowSelection: true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                    enableSelectionBatchEvent : true, //默认true
                    modifierKeysToMultiSelect: true ,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                    multiSelect: true ,// 是否可以选择多个,默认为true;
                    noUnselect: false,//默认false,选中后是否可以取消选中
                    selectionRowHeaderWidth:30 ,//默认30 ，设置选择列的宽度；
                    isRowSelectable: function(row){ //GridRow
                        index += 1;
                        if (index == 1) {   //默认选中第一行
                            row.grid.api.selection.selectRow(row.entity);
                            scope.selectedItem=row.entity;
                        }
                    },
                    //---------------api---------------------
                    onRegisterApi: function(gridApi) {
                        scope.gridApi = gridApi;
                        //分页按钮事件
                        gridApi.pagination.on.paginationChanged(scope,function(newPage, pageSize) {
                            if(getPage) {
                                scope.loadData(newPage, pageSize);
                            }
                        });
                        //行选中事件
                        scope.gridApi.selection.on.rowSelectionChanged(scope,function(row, event){
                            if(row && row.isSelected){
                                scope.selectedItem = row.entity;
                            } else {
                                scope.selectedItem = undefined;
                            }
                            scope.callFn(scope.selectedItem);
                        });
                    }
                };

                var getPage = function(curPage, pageSize, totalSize) {
                    index = 0;
                    scope.gridOptions.paginationCurrentPage = curPage;
                    scope.gridOptions.paginationPageSize = pageSize;
                    scope.gridOptions.totalItems = totalSize;
                    scope.gridOptions.data = scope.arr;
                };

                scope.$watch('arr',function(newValue, oldValue){
                    if(newValue){
                        getPage(scope.paginationCurrentPage, scope.paginationPageSize, scope.totalElements);
                    }
                },true);
            }
        }
    });
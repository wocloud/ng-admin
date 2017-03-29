# Admin panel framework based on Angular 1.3.x, Bootstrap 3.3.x, FontAwesome 4.7.x

Admin template made by [skyform team](http://www.skycloudsoftware.com/).

## Based on
Angular 1.3.x, Bootstrap 3.3.x, FontAwesome 4.7.x and lots of awesome modules and plugins, such as ui-grid, echarts

## Features
* Responsive layout
* High resolution
* Bootstrap 3 CSS Framework
* Less
* Angular 1.3
* jQuery
* and many more!

##License
[MIT](LICENSE.txt) license.

##Run(if you want to change the style)
* >>npm install -g gulp
* >>npm install

## 新添加的信息
* 1 \ 与cas结合, 项目变为maven项目, 使用时请注意打包.
* 2 \ 用户信息的获取使用 $cookieStore.get('userInfo');
* 3 \ 引入动态菜单tpl/blocks/nav_auto.html,替换原有菜单. 菜单的返回格式参见js/menu.json, 具体解析详见 js/main.js
* 4 \ 引入ui.grid(ngGrid的升级版), 同时对ui.grid做了简单封装, 可选择使用
    ui.grid使用, 参见 http://ui-grid.info/;
    sf.ui.grid使用, 参见 'Table/uiGrid' .
* 5 \ 引入xcConfirm作为操作前提示弹出框, toaster作为操作结果提示弹出框;
* 6 \ 引入echarts, 示例参见 'uiKits/echartsMap'

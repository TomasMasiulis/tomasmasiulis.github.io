/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Dashboard' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
                        }
                    ]);
                }
            }
        })
        .state('index.expenses', {
            url: "/expenses",
            templateUrl: "views/expenses.html",
            data: { pageTitle: 'Expenses' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 
                                    'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['js/plugins/accounting/accounting.min.js']
                        },
                        {
                            files: ['css/drop2books/drop2books.css']
                        },
                        {
                            files: ['js/plugins/iCheck/icheck.min.js', 
                                    'css/plugins/iCheck/custom.css']
                        },
                        {
                            files: ['js/plugins/viewerjs/viewer.min.js', 
                                    'css/plugins/viewerjs/viewer.min.css']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        }
                        /*{
                            files: ['css/plugins/datapicker/datepicker3.css']
                        }*/
                    ]);
                }
            }
        })
}
angular
    .module('drop2books')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });

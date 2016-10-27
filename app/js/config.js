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
            templateUrl: "views/common/content.html"
            // resolve: {
            //     // controller will not be loaded until $waitForSignIn resolves
            //     // Auth refers to our $firebaseAuth wrapper in the factory below
            //     'currentAuth': ['Auth', function(Auth) {
            //       // $waitForSignIn returns a promise so the resolve waits for it to complete
            //       return Auth.$waitForSignIn(); return Auth.refAuth().$requireSignIn();
            //     }]
            // }
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Dashboard' },
            resolve: {
                currentAuth: ['Auth', function(Auth) {
                  // if not logged in, emits an event called "AUTH_REQUIRED"
                  // we trap that event in a jiffy
                  return Auth.$requireSignIn()
                }],
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
                        }
                    ]);
                }
            }
        })
        .state('expenses', {
            abstract: true,
            url: "/expenses",
            templateUrl: "views/common/content.html"
        })
        .state('expenses.dropped', {
            url: "/inrecognition",
            templateUrl: "views/dropped.html",
            data: { pageTitle: 'Dropped bills' },
            resolve: {
                currentAuth: ['Auth', function(Auth) {
                  // if not logged in, emits an event called "AUTH_REQUIRED"
                  // we trap that event in a jiffy
                  return Auth.$requireSignIn()
                }],
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
        .state('expenses.recognized', {
            url: "/recognized",
            templateUrl: "views/expenses.html",
            data: { pageTitle: 'Expenses' },
            resolve: {
                currentAuth: ['Auth', function(Auth) {
                  // if not logged in, emits an event called "AUTH_REQUIRED"
                  // we trap that event in a jiffy
                  return Auth.$requireSignIn()
                }],
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

function run($rootScope, $state, $location, $window) {
  
    $rootScope.$state = $state;

    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      //$location.path("/app/login.html");
        $window.location.href = '/app/login.html'
    }
    });

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        // pass in some params to the login $state, with the requested
        // state within the <code>toWhere</code> value
        //$state.go('login', { toWhere: toState });
        //$location.path("/app/login.html");
        $window.location.href = '/app/login.html'
      }
    });
}

angular
    .module('drop2books')
    .config(config)
    .run(run)

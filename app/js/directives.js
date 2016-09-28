/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'drop2books | Invoice recognition';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'drop2books | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
}

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function updateProgress(file, progress){
    var node, _i, _len, _ref, _results;
    _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.nodeName === 'PROGRESS') {
            _results.push(node.value = progress);
        } else {
            _results.push(node.style.width = "" + progress + "%");
        }
    }
 }

function viewerjs() {
    return {
        template: '<img id="image" src="http://housedivided.dickinson.edu/sites/files/2010/08/type_example.jpg" alt="Picture">',
        link: function(scope, element, attrs) {
            // View one image
            scope.loadViewer = function () {
                new Viewer(element[0].firstChild);
            };

            scope.loadViewer();
        }
    }
}

function dropzone() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {

            var config = {
                url: '/#',
                //maxFilesize: 100,
                paramName: "uploadfile",
                //maxThumbnailFilesize: 10,
                //parallelUploads: 1,
                autoProcessQueue: false
            };

            var eventHandlers = {
                'addedfile': function(file) {
                    scope.file = file;
                    
                    scope.$apply(function() {
                        scope.fileAdded = true;
                    });

                    updateProgress(file, 0);

                    var package = new Parse.Object("Package");
                    package.set("Description", file.name);

                    var packageACL = new Parse.ACL(Parse.User.current());
                    packageACL.setPublicReadAccess(true);
                    package.setACL(packageACL);

                    package.save().then(function() {
                        updateProgress(file, 10);
                        var parseFile = new Parse.File(file.name,file);
                        parseFile.save().then(function() {
                            updateProgress(file, 80);
                            // The file has been saved to Parse.
                            var expense = new Parse.Object("Expense");
                            expense.set("Memo", file.name);
                            expense.set("image", parseFile);
                            expense.set("Package", package);

                            var expenseACL = new Parse.ACL(Parse.User.current());
                            expenseACL.setPublicReadAccess(true);
                            expense.setACL(expenseACL);

                            expense.save().then(function(){
                                updateProgress(file, 100);
                                $(file.previewElement).find('.dz-progress').css('display','none');
                                file.previewElement.classList.add("dz-success");
                            });

                        }, 
                        function(error) {
                          // The file either could not be read, or could not be saved to Parse.
                        });
                    });
                },
                'totaluploadprogress': function(progress){
                    console.log(progress);
                },
                'success': function (file, response) {
                }

            };

            dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function() {
                dropzone.processQueue();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }
        }
    }
}

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('drop2books')
    .directive('icheck', icheck)
    .directive('viewerjs', viewerjs)
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('dropzone',dropzone);

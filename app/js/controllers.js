/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */

function MainCtrl($scope) {

    //this.userName = 'Example user';
    this.helloText = 'Welcome in drop2books';
    this.descriptionText = 'It is an application that collect all your expenses, recognizes them and sends to your accountant';

    var currentUser = getCurrentUser();
    this.userName = currentUser.get('username');

    var expenses = ["1", "2"];
    this.total = getTotalInvoices(this);

    $scope.expensesToApprove = [];
    getExpensesToApprove($scope);
    
    $scope.toMoney = function(number){
        var money = accounting.formatMoney(number);
        return money;
    }

    $scope.go = function(expense) {
        alert(expense.get('SupplierName'));
    }

    $scope.rowHighilited = function(row, expense){
        $scope.selectedRow = row; 
    }
};


angular
    .module('drop2books')
    .controller('MainCtrl', MainCtrl)
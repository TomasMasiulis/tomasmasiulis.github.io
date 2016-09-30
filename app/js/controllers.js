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
    this.total = "Loading..."
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


    var Expense = Parse.Object.extend("Expense");

    $scope.expense = {
        parseExpense: new Expense(),

        imageUrl: '',
        imageName:'',
        ExpenseDate: null,
        InvoiceNo: '',
        SupplierName: '',
        Total: ''
    };
    


    $scope.rowHighilited = function(row, expense){
        $scope.selectedRow = row; 

        $scope.expense.parseExpense = expense;

        $scope.expense.imageUrl = "";
        $scope.expense.imageUrl = expense.get('image').url();
        $scope.expense.imageName = expense.get('image').name();

        $scope.expense.InvoiceNo = expense.get('InvoiceNo');
        $scope.expense.SupplierName = expense.get('SupplierName');
        $scope.expense.Amount = expense.get('Amount');
        $scope.expense.Tax = expense.get('Tax');
        $scope.expense.Total = expense.get('Total');

        var invoiceDate = expense.get('InvoiceDate')
        $scope.expense.InvoiceDate = (typeof invoiceDate === "undefined") ? null : invoiceDate;
        
        var dueDate = expense.get('DueDate');
        $scope.expense.DueDate = (typeof dueDate === "undefined") ? null : dueDate;
    };

    $scope.saveParseExpense = function() {
        $scope.expense.parseExpense.save(null, {
            success: function(expense) {
                // Execute any logic that should take place after the object is saved.
                // alert('Expense saved with InvoiceNo: ' + expense.get('InvoiceNo'));
            },
            error: function(expense, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to save expense, with error code: ' + error.message);
            }
        });
    }

    $scope.changeInvoiceData = function(dataChanged){
        if (dataChanged == 'InvoiceNo')
        {
            $scope.expense.parseExpense.set('InvoiceNo',$scope.expense.InvoiceNo);
        }
        else if (dataChanged == 'SupplierName')
        {
            $scope.expense.parseExpense.set('SupplierName',$scope.expense.SupplierName);
        }
        else if (dataChanged == 'Amount')
        {
            $scope.expense.parseExpense.set('Amount',$scope.expense.Amount);
            $scope.expense.Total = $scope.expense.Amount + $scope.expense.Tax;
            $scope.expense.parseExpense.set('Total',$scope.expense.Total);
        }
        else if (dataChanged == 'Tax')
        {
            $scope.expense.parseExpense.set('Tax',$scope.expense.Tax);
            $scope.expense.Total = $scope.expense.Amount + $scope.expense.Tax;
            $scope.expense.parseExpense.set('Total',$scope.expense.Total);
        }
        else if (dataChanged == 'Total')
        {
            $scope.expense.parseExpense.set('Total',$scope.expense.Total);
        }
        
        $scope.saveParseExpense();
    }

    $scope.$watch("expense.InvoiceDate", function(newValue, oldValue) {
        if ($scope.expense.parseExpense.get('InvoiceDate') != newValue)
        {
            $scope.expense.parseExpense.set('InvoiceDate', newValue == null ? null : newValue.toDate());
            $scope.saveParseExpense();
        }
    });

    $scope.$watch("expense.DueDate", function(newValue, oldValue) {
        if ($scope.expense.parseExpense.get('DueDate') != newValue)
        {
            $scope.expense.parseExpense.set('DueDate', newValue == null ? null : newValue.toDate());
            $scope.saveParseExpense();
        }
    });

};


angular
    .module('drop2books')
    .controller('MainCtrl', MainCtrl)
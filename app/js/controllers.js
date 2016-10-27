/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */

 function MainCtrl($scope, $firebaseObject, $firebaseArray) {

    //this.userName = 'Example user';
    this.helloText = 'Welcome to drop2books';
    this.descriptionText = 'It is an application that collect all your expenses, recognizes them and sends to your accountant';

    currentAuth = function(currentAuth) {
        // currentAuth (provided by resolve) will contain the
        // authenticated user or null if not signed in
        $scope.user = currentAuth;
    };

    /*getProfiles = function() {
        var ref = firebase.database().ref();
        // download physicsmarie's profile data into a local object
        // all server changes are applied in realtime
        $scope.profile = $firebaseObject(ref.child('profiles').child('physicsmarie'));
    };

    getProfiles();*/

    var ref = firebase.database().ref();
    var refProf = ref.child('expenses');
    $scope.expensesToApprove = $firebaseArray(refProf);


    // if the messages are empty, add something for fun!
    $scope.expensesToApprove.$loaded(function() {
      $scope.total = $scope.expensesToApprove.length;
    });

    // each time the server sends records, re-sort
    $scope.expensesToApprove.$watch(function() { 
        $scope.total = $scope.expensesToApprove.length; 
    });

    $scope.droppedFilter = '';
    $scope.approvalFilter = '';
    //var inv = $firebaseArray(ref);

    //var a = $scope.profile.name;
    /*var currentUser = getCurrentUser();
    this.userName = currentUser.get('username');

    var expenses = ["1", "2"];
    this.total = "Loading..."
    this.total = getTotalInvoices(this);

    $scope.expensesToApprove = [];
    getExpensesToApprove($scope);
    */
    $scope.toMoney = function(number){
        var money = accounting.formatMoney(number);
        return money;
    }

    $scope.temp = {};

    $scope.rowHighilited = function(row, expense){
        $scope.selectedRow = row; 

        var ref = firebase.database().ref();
        var refExpense = ref.child('expenses').child(expense.$id);

        //var ref = new Firebase("https://<your-firebase>.firebaseio.com/data");
          // synchronize the object with a three-way data binding
        if ($scope.syncObject != null){
            $scope.syncObject.$destroy();
        }

        $scope.syncObject = $firebaseObject(refExpense);
        $scope.syncObject.$bindTo($scope, "expense");

        if (expense != null){
            $scope.temp.InvoiceDate = moment(expense.InvoiceDate);
            $scope.temp.DueDate = moment(expense.DueDate);
        }
        
    }

    $scope.toMoment = function(data, format){
        return moment(data).format(format);
    }

    $scope.changeInvoiceData = function(dataChanged){
    if (dataChanged == 'Amount')
        {
            $scope.expense.Total = $scope.expense.Amount + $scope.expense.Tax;
        }
        else if (dataChanged == 'Tax')
        {
            $scope.expense.Total = $scope.expense.Amount + $scope.expense.Tax;
        }
        else if (dataChanged == 'Total')
        {
            $scope.expense.parseExpense.set('Total',$scope.expense.Total);
        }
    }
    /*
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
    */

    $scope.$watch("temp.InvoiceDate", function(newValue, oldValue) {
        if ($scope.expense != null)
        {
            if (($scope.expense.InvoiceDate == null) || (newValue == null)){
                $scope.expense.InvoiceDate = {};
            }
            
            if (newValue != null)
            {
                $scope.expense.InvoiceDate.year = newValue.year();
                $scope.expense.InvoiceDate.month = newValue.month();
                $scope.expense.InvoiceDate.day = newValue.date();
            }
        }
    });

    $scope.$watch("temp.DueDate", function(newValue, oldValue) {
        if ($scope.expense != null)
        {
            if (($scope.expense.DueDate == null) || (newValue == null)){
                $scope.expense.DueDate = {};
            }
            
            if (newValue != null)
            {
                $scope.expense.DueDate.year = newValue.year();
                $scope.expense.DueDate.month = newValue.month();
                $scope.expense.DueDate.day = newValue.date();
            }
        }
    });

    /*
    $scope.$watch("temp.DueDate", function(newValue, oldValue) {
        if ($scope.expense.parseExpense.get('DueDate') != newValue)
        {
            $scope.expense.parseExpense.set('DueDate', newValue == null ? null : newValue.toDate());
            $scope.saveParseExpense();
        }
    });
    */
};


angular
    .module('drop2books')
    .controller('MainCtrl', MainCtrl);

angular
    .module('drop2books')
    .factory('Auth', ['$firebaseAuth',
      function($firebaseAuth) {
        return $firebaseAuth();
      }
    ])
    .factory("Invoices", ["$firebaseArray",
        function($firebaseArray) {
            // create a reference to the database where we will store our data
            var ref = firebase.database().ref();

            return $firebaseArray(ref);
        }
    ]);



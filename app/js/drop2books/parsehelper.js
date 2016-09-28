
$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("vvFz0YaRIOBS76eo4FWytcdxbiFWakJovbPrvVtF",
                   "Du9APG03HvN7GuhD99O5cXot8jdahPeoQdTLJJzZ");

  Parse.serverURL = 'https://parseapi.back4app.com/';

  var currentUser = Parse.User.current();
  if (currentUser) {
    // do stuff with the user
  } else {
    if ((window.location.href.indexOf("login.html") > -1) ||
        (window.location.href.indexOf("register.html") > -1))
    {
    }
    else {
      // show the signup or login page
      window.location = "login.html";
    }
  }
});

function logout() {
  Parse.User.logOut();//.then(function(){
    //var currentUser = Parse.User.current();  // this will now be null
    // show the signup or login page
    window.location = "login.html";
  //});
};

function register() {
    var self = this;

    var username = this.$("#register-username").val();
    var email = this.$("#register-email").val();
    var password = this.$("#register-password").val();

    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    // other fields can be set just like with Parse.Object
    //user.set("phone", "415-392-0202");

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        window.location = "index.html"; // Redirecting to other page.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        self.$(".m-t .error").html("Error: " + error.code + " " + error.message).show();
        
      }
});
  };

function logIn() {
  var self = this;
  self.$(".m-t .error").html("Invalid username or password. Please try again.").hide();
  var email = this.$("#login-username").val();
  var password = this.$("#login-password").val();
  
  var query = new Parse.Query(Parse.User);
  query.equalTo("email", email);  // find all the women
  query.find({
      success: function(email) {
        
          // Do stuff
          if (email.length > 0)
          {
            var user = email[0];
            var username = user.get('username');

            Parse.User.logIn(username, password, {
                success: function(user) {
                  
                    //self.undelegateEvents();
                    //delete self;

                    window.location = "index.html"; // Redirecting to other page.
                },
                error: function(user, error) {
                    self.$(".m-t .error").html("Invalid username or password. Please try again.").show();
                    //this.$(".login-form button").removeAttr("disabled");
                }
                
            });
          } else
          {
            self.$(".m-t .error").html("Invalid username or password. Please try again.").show();
          }
      },
      error: function(user, error) {
            self.$(".m-t .error").html("Invalid username or password. Please try again.").show();
            //this.$(".login-form button").removeAttr("disabled");
      }
  });

  //this.$(".login-form button").attr("disabled", "disabled");
};

function getCurrentUser() {
  var currentUser = Parse.User.current();
  if (currentUser) {
    // do stuff with the user
    return currentUser;

  } else {
      // show the signup or login page
      window.location = "login.html";
    }
};

/// Web storage
function loadPreferences() {
  var currentUser = getCurrentUser();
  
};

function getExpensesToApprove(obj){
  var Expense = Parse.Object.extend("Expense");
  var query = new Parse.Query(Expense);
  // query.equalTo("playerName", "Dan Stemkoski");
  query.find({
    success: function(results) {
      //alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      obj.expensesToApprove = results;

      /*
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        //alert(object.id + ' - ' + object.get('objectId'));
        var memo = object.get('Memo');
        obj.expensesToApprove.push(memo);
        

      }
      */
      
    },
    error: function(error) {
      //alert("Error: " + error.code + " " + error.message);
    }
  });
}

function getTotalInvoices(obj){
  var Expense = Parse.Object.extend("Expense");
  var query = new Parse.Query(Expense);

  query.count({
    success: function(count) {
      // The count request succeeded. Show the count
      obj.total = count;
    },
    error: function(error) {
      // The request failed
      obj.total = "-";
    }
  });
}

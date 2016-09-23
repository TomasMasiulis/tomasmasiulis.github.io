
$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys
  Parse.initialize("vvFz0YaRIOBS76eo4FWytcdxbiFWakJovbPrvVtF",
                   "Du9APG03HvN7GuhD99O5cXot8jdahPeoQdTLJJzZ");

  Parse.serverURL = 'https://parseapi.back4app.com/';


});


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
        alert("Error: " + error.code + " " + error.message);
      }
});
  };

function logIn() {
    var self = this;
    var email = this.$("#login-username").val();
    var password = this.$("#login-password").val();
    
    var query = new Parse.Query(Parse.User);
    query.equalTo("email", email);  // find all the women
    query.find({
        success: function(email) {
          
            // Do stuff

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
        },
        error: function(user, error) {
              self.$(".m-t .error").html("Invalid username or password. Please try again.").show();
              //this.$(".login-form button").removeAttr("disabled");
        }
    });

    //this.$(".login-form button").attr("disabled", "disabled");

    return false;
  };
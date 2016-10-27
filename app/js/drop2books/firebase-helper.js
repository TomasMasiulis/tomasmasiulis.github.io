
$(function() {

	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyDcc3dy5kA1dzDTNbZi6WrwnwNRZaM5r-E",
	authDomain: "drop2books-bfce5.firebaseapp.com",
	databaseURL: "https://drop2books-bfce5.firebaseio.com",
	storageBucket: "drop2books-bfce5.appspot.com",
	messagingSenderId: "253007724926"
	};

	firebase.initializeApp(config);

});


function register() {
	var self = this;

	var username = this.$("#register-username").val();
	var email = this.$("#register-email").val();
	var password = this.$("#register-password").val();
	var companyName = this.$("#register-companyName").val();

	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
	    
	    window.location = "index.html"; // Redirecting to other page.

	}, function(error) {
	    // Handle Errors here.

	    // Show the error message somewhere and let the user try again.
	    self.$(".m-t .error").html("Error: " + error.code + " " + error.message).show();
	});
};


function logIn() {

  var self = this;
  self.$(".m-t .error").html("Invalid username or password. Please try again.").hide();

  var email = this.$("#login-username").val();
  var password = this.$("#login-password").val();
    
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
	    
	    var user = firebase.auth().currentUser;
	    //logUser(user); // Optional

	    window.location = "index.html"; // Redirecting to other page.

	}, function(error) {
	    // Handle Errors here.

	    // Show the error message somewhere and let the user try again.
	    self.$(".m-t .error").html("Invalid username or password. Please try again.").show();
	});
};

function getCurrentUser() {

	firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	    	// User is signed in.
	    } else {
	      // No user is signed in.
	      window.location = "login.html";
	    }
	  });

};

function logout() {

	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		// show the signup or login page
		window.location = "login.html";
	}, function(error) {
		// An error happened.
	});	
};
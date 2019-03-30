// function to query NYTimes API



  var queryURL = "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=QYoz6umGY0MGq7soeaqCsnY1uFcCSUfm";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response;
    console.log(results.results);


    for (var i = 0; i < results.results.length; i++) {
      // console.log(results.results[i].title);

      var articleDiv = $("<div>");


      var article = results.results[i].short_url;
      var desc = results.results[i].title;
      var image = results.results[i].multimedia[3].url;
      console.log(image);

      $(".sports > tbody").prepend("<tr><td><a href=" +  article + ">" + desc + "</a>" + "</td><td>" + "<img src=" + image + ">" +  "</td>");

    }
  });

// END NYTIMES API FUNCTION--------------------------





// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNzMfwo6UQ5HB-GH6unmM6YB0T7yPmdOE",
    authDomain: "illbetyou.firebaseapp.com",
    databaseURL: "https://illbetyou.firebaseio.com",
    projectId: "illbetyou",
    storageBucket: "illbetyou.appspot.com",
    messagingSenderId: "448535678670"
  };
  firebase.initializeApp(config);

  //Create variable to reference the database
  var database = firebase.database();

  //Global variables
  var uid = '';
  var firstName = '';
  var lastName = '';
  var signingUp = false;

  //Useful Functions


    //HANDLES SIGN IN
    function toggleSignIn() {
          var email = document.getElementById('loginSignIn').value;
          var password = document.getElementById('passwordSignIn').value;
          if (email.length < 4) {
            alert('Please enter an email address');
          }
          if (password.length < 4) {
            alert('Please enter a valid password.');
            return;
          }
          // Sign in with email and pass.
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
          });

          window.location = 'userPage.html';
      }
  
      //HANDLES SIGN UP
      function handleSignUp() {
        var email = document.getElementById('emailUp').value;
        var password = document.getElementById('passwordUp').value;
        firstName = document.getElementById('first_name').value;
        lastName = document.getElementById('last_name').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass by creating new user
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          //if error
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
        });
        signingUp = true;
    }
  
   
      //Sends an email verification to the user.
      function sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verification Sent!');
          // [END_EXCLUDE]
        });
        // [END sendemailverification]
      }
  
      function sendPasswordReset() {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert('Password Reset Email Sent!');
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
          } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
          }
          console.log(error);
        });
      }
  
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        firebase.auth().onAuthStateChanged(function(user) {
          
          
            // If the user is signing up 
            if (signingUp === true) {
              //set display Name
              var displayNamez = firstName+' '+lastName;
              console.log('DISPLAY NAME: ', displayNamez);
              //update User with display Name
              console.log('USER: ', user);
              user.updateProfile({
                displayName: displayNamez
              }).then(function() {
                console.log('DISPLAY NAME UPDATED SUCCESFULLY');
                window.location = 'userPage.html';
              }).catch(function(error) {
                console.log(errorCode);
              })
              signingUp = false;
            }

            if (user) {
              //User is signed in

                //Grab uid from user
                uid = user.uid;
              }
        });
        // [END authstatelistener]
       
        document.getElementById('signedIn').addEventListener('click', toggleSignIn, false);
        document.getElementById('signedUp').addEventListener('click', handleSignUp, false);
        // document.getElementById('emailVerify').addEventListener('click', sendEmailVerification, false);
        // document.getElementById('resetEmail').addEventListener('click', sendPasswordReset, false);
        // document.getElementById('userSignCheck').addEventListener('click', checkUser, false);
      }
  
      window.onload = function() {
        initApp();
      };

      //CHECK TO SEE IF THEY ARE SIGNED IN
      //a signed in listener
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $('#amISignedIn').text('I am signed in');
        } else {
          $('#amISignedIn').text('Not signed in');
        }
      });

      //CHECK TO SEE IF USER IS SIGNED IN OPTION2
      function checkUser() {
      var user = firebase.auth().currentUser;
      
      if (user) {
          //User is signed in
          console.log('USER: ', user);
          console.log('TYPE OF USER: ', typeof user);
      } else {
          //User is not signed in
          console.log('USER IS NOT SIGNED IN');
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, open);
    });
document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.modal');
   var instances = M.Modal.init(elems, open);
 });

 document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, open);
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, open);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#historyModal');
  var instances = M.Modal.init(elems, open);
});

// Slider on front page


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, 100, 100, 200, 300);
});



//$(document).ready(function(){
////  $('.slider').slider();
///});
        
// -----------End Slider--------------------
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#accountModal');
  var instances = M.Modal.init(elems, open);
});

function myFunction() {
  var x = document.getElementById("#imgUpload");
  x.disabled = true;
};



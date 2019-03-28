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

      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            //User is signed in
                console.log('THERE IS A USER: ', user);
              }
          else {
              console.log('no user here');
          }
        });
  
        document.getElementById('signIn').addEventListener('click', toggleSignIn, false);
        document.getElementById('signUp').addEventListener('click', handleSignUp, false);
        // document.getElementById('emailVerify').addEventListener('click', sendEmailVerification, false);
        // document.getElementById('resetEmail').addEventListener('click', sendPasswordReset, false);
        // document.getElementById('userSignCheck').addEventListener('click', checkUser, false);
      }
  
      window.onload = function() {
        initApp();
      };


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

document.addEventListener('DomContentLoaded', function() {
    var elems = document.querySelectorAll('#accountModal');
    var instances = M.Modal.init(elems, open);
});
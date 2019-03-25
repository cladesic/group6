
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

    //HANDLES SIGN IN
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            document.getElementById('signIn').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        document.getElementById('signIn').disabled = true;
      }
  
      //HANDLES SIGN UP
      function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        console.log('EMAIL: ', email);
        console.log('PASSWORD: ', password);
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
      }
  
      /**
       * Sends an email verification to the user.
       */
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
          // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
      }
  
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('emailVerify').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('signIn').textContent = 'Sign out';
            if (!emailVerified) {
              document.getElementById('emailVerify').disabled = false;
            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('signIn').textContent = 'Sign in';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('signIn').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
  
        document.getElementById('signIn').addEventListener('click', toggleSignIn, false);
        document.getElementById('signUp').addEventListener('click', handleSignUp, false);
        document.getElementById('emailVerify').addEventListener('click', sendEmailVerification, false);
        document.getElementById('resetEmail').addEventListener('click', sendPasswordReset, false);
        document.getElementById('userSignCheck').addEventListener('click', checkUser, false);
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
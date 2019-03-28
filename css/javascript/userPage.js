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

   //Get current user
   var user = firebase.auth().currentUser;
    //If no one is logged in send back to home page
   if (user) {
    //    window.location.href = 'index.html';
    console.log('USER OBJECT: ', user);
   } else {
       console.log('NO USER OBJECT: ', user);
   }

   function initApp() {
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('THE USER IS DOWN HERE: ', user);
    } else {
      console.log('THE USER IS NOT DOWN HERE EITHER: ', user);
    }
  });
}
  
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

  //Global Variables
  //user uid
  var uid = '';

  //USEFUL FUNCTIONS
  //function to create new object
  function newBet(title, description, amountBet, expirationDate, urlIcon) {
    var obj = {};
    obj.title = title;
    obj.description = description;
    obj.amountBet = amountBet;
    obj.expirationDate = expirationDate;
    obj.urlIcon = urlIcon;
    return obj;
  }

  function log(title, item) {
    console.log(title+': ', item);
  }
      
      //  initApp handles setting up UI event listeners and registering Firebase auth listeners:
      //  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
      //  out, and that is where we update the UI.
       
      function initApp() {
        // Listening for auth state changes.
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            //User is signed in
              }
          else {
          }
        });
  
        //BUTTON LISTENERS
        //New Bet
        $('#agreeBet').on("click", function() {
          var title = $('#bet_name').val();
          var description = $('#description').val();
          var amountBet = $('#amount_bet').val();
          var dateBet = $('#date_bet').val();
          var timeBet = $('#time_bet').val();
          var urlIcon = '';

          //Store image onto firebase storage
          const ref = firebase.storage().ref();
          const file = document.querySelector('#imgUpload').files[0];
          
          //GET CURRENT USER
          var user = firebase.auth().currentUser;
          if (user) {
              uid = user.uid;
              console.log('UID: ', uid);
          }
          const name = uid + '_' + file.name;
          const metadata = {
            contentType: file.type  
          };
          const task = ref.child(name).put(file, metadata);
        task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            urlIcon = url;
    
          })
          .catch(console.error);

          var betObject = newBet(title, description, amountBet, dateBet, urlIcon);
          console.log(betObject);
          })
      }
  
      window.onload = function() {
        initApp();
      };





      //FRONT END LISTENERS
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
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('#accountModal');
    var instances = M.Modal.init(elems, open);
  });
  
  function myFunction() {
    var x = document.getElementById("#imgUpload");
    x.disabled = true;
  };
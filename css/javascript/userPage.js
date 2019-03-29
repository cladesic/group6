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
  //Signout Function
  function signingOut() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
  }

  //function to create a bet card
  function createBetCard(imageSrc, betTitle, betDesc, dataId, prependID) {
    //create new materialize card
    var card = $('<div>');
    card.addClass('card');

    //image
    var cardImageHolder = $('<div>');
    cardImageHolder.addClass('card-image waves-effect waves-block waves-light');
    var image = $('<img>');
    image.addClass('activator');
    image.attr('src', imageSrc);
    cardImageHolder.append(image);

    //card title
    var cardTitle = $('<div>');
    cardTitle.addClass('card-content');
    var spanTitle = $('<span>');
    spanTitle.addClass('card-title activator grey-text text-darken-4');
    spanTitle.html(betTitle+"<i class='material-icons right'>more_vert</i>");
    var removeBet = $('<p>');
    removeBet.addClass('removeBet');
    removeBet.attr('id', dataId);
    removeBet.text('Remove Bet');
    cardTitle.append(spanTitle, removeBet);

    //card description
    var cardDescription = $('<div>');
    cardDescription.addClass('card-reveal');
    var spanDesc = $('<span>');
    spanDesc.addClass('card-title grey-text text-darken-4');
    spanDesc.html(betTitle+"<i class='material-icons right'>close</i>");
    var pDesc = $('<p>');
    pDesc.text(betDesc);
    cardDescription.append(spanDesc, pDesc);

    //append image and content to card
    card.append(cardImageHolder, cardTitle, cardDescription);
    $(prependID).append(card);
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
            window.location = 'index.html';
          }
        });
  

        //BUTTON LISTENERS
        //New Bet
        $('#agreeBet').on("click", function() {
          event.preventDefault();
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
          }
          const name = uid + '_' + file.name;
          const metadata = {
            contentType: file.type  
          };
          const task = ref.child(name).put(file, metadata);
        task
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then((url) => {
            //Get URL of user image
            urlIcon = url;
            //Put object into firebase database
            database.ref("bets/"+uid).push({
              title: title,
              description: description, 
              amountBet: amountBet,
              dateBet: dateBet, 
              imageURL: urlIcon

              }, function(errorObject) {
                  console.log("The update failed: " + errorObject.code);
              });
          })
          .catch(console.error);
          })
      }
  
      //WHEN THE DATABASE CHANGES
      database.ref().on("value", function(snap) {
        var user = firebase.auth().currentUser;
        if (user) {
            uid = user.uid;
            userName = user.displayName;
        }
        //clear bet area, trash talk and redraw
        $('#betArea').empty();
        $('#trashCan').empty();

        //redraw bets
            for (var key in snap.child('/bets/'+uid).val()) {
              let amountBet = snap.child('/bets/'+uid+'/'+key+'/amountBet').val();
              let title = snap.child('/bets/'+uid+'/'+key+'/title').val();
              let dateBet = snap.child('/bets/'+uid+'/'+key+'/dateBet').val();
              let description = snap.child('/bets/'+uid+'/'+key+'/description').val();
              let imageURL = snap.child('/bets/'+uid+'/'+key+'/imageURL').val();
              createBetCard(imageURL, title, description, key, '#betArea');
            }
          
        //redraw trash talk
            for (var key in snap.child('/messages').val()) {
              let messageOfTrash = snap.child('messages/'+key+'/userMessage').val();
              let newP = $('<p>');
              newP.text(messageOfTrash);
              $('#trashCan').prepend(newP);
            }
        //onclick or removal of bets
          $('.removeBet').on('click', function() {
            let removeKey = this.id;
            database.ref('/bets/'+uid+'/'+removeKey).remove();
          })

          //onclick for trash talking button
          $('#trashButton').on("click", function() {
            userMessage = $('#trashTalk').val().trim();
    
            database.ref('/messages').push({
                userMessage: userName+': '+userMessage
            })
          })
      });





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


  window.onload = function() {
    initApp();
  };
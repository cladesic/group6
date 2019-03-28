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



//UPLOAD THE IMAGE TO STORAGE
$('#submit').on('click', function() {
    const ref = firebase.storage().ref();
    const file = document.querySelector('#photo').files[0]
    console.log('FILE: ', file);
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then((url) => {
    console.log('URL :', url);
    document.querySelector('#someImageTagID').src = url;
  })
  .catch(console.error);

})

//GET IMAGE FROM STORAGE
//create reference with initial file path and name
var storage = firebase.storage();
var pathReference = storage.ref('1553740562015-IMG_0797.jpg');

//Download data via URL by calling the getDownloadURL() method
pathReference.getDownloadURL().then(function(url) {
    //'url' is the download URL for image
    //insert into an <img> element
    var img = document.getElementById('displayImage');
    img.src = url;
    }).catch(function(error) {
        //Handle Error
    });
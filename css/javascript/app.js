document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.modal');
   var instances = M.Modal.init(elems, open);
 });

 document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, open);
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#profileModal');
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



$(document).ready(function(){
  $('.slider').slider();
});
        
// -----------End Slider--------------------
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#accountModal');
  var instances = M.Modal.init(elems, open);
});

function myFunction() {
  var x = document.getElementById("#imgUpload");
  x.disabled = true;
};


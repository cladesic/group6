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
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#accountModal');
  var instances = M.Modal.init(elems, open);
});

function myFunction() {
  var x = document.getElementById("#imgUpload");
  x.disabled = true;
}
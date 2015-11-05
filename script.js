"use strict"
  var items = document.getElementById('items');
  var element;
  for (var i=0; i < items.children.length; i++) {
    items.children[i].draggable = true
  };
  function over(evt){
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'link';
      var target = evt.target;
      if( target && target !== element && target.nodeName == 'LI' ){
          var rect = target.getBoundingClientRect();
          var next = (evt.clientY - rect.top)/(rect.bottom - rect.top) > .5;
          items.insertBefore(element, next && target.nextSibling || target);
      }
  }
  function end(evt){
      evt.preventDefault();
      element.classList.remove('raised');
      items.removeEventListener('dragover', over, false);
      items.removeEventListener('dragend', end, false);
 }
  items.addEventListener('dragstart', function (evt){
      element = evt.target;
      var nextElement = element.nextSibling;
      evt.dataTransfer.effectAllowed = 'link';
      evt.dataTransfer.setData('Text', element.textContent);
      items.addEventListener('dragover', over, false);
      items.addEventListener('dragend', end, false);
      setTimeout(function (){
          element.classList.add('raised');
      }, 0)
  }, false);

//додавання  нових ТУДУшок
document.getElementById('add').onclick = function () {
    //alert("f");
        swal({   title: "Add new TODO!",   text: "Write something interesting:",
           type: "input",   showCancelButton: true,   closeOnConfirm: false,
           animation: "pop",   inputPlaceholder: "Write something"},
           function(inputValue){   if (inputValue === false) return false;
           if (inputValue === "" ) {swal.showInputError("You need to write something!");
           return false}
           if (/^\s+$/.test(inputValue)) {swal.showInputError("Only spaces?? No-No!");
           return false}
           if (inputValue.length > 30) {swal.showInputError("To long! " + inputValue.length + " characters. Only 30 max");
           return false}
           swal("Nice!", "Your new TODO " + "\"" + inputValue + "\"" + " added to list!", "success"); 
            var items = document.getElementById('items');
            var el = document.createElement('li'); 
            el.innerHTML = inputValue  + '<i class="del">✖</i>';
            el.draggable = true;
            items.appendChild(el);
       });
    };
//видалення
document.getElementById('items').onclick = function(e) {
     if (!e.target.classList.contains('del')) return;
     e.target.parentNode.remove(e.target); // може не підтримуватися старими браузерами!
  }
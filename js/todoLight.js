var todo = {

  getLocalStorageData: function () {
    // Get any stored data into a json object
    json = JSON.parse(localStorage.getItem('todoLight'));

    // Loop through the stored data and recreate the list items
    for (var itemIndex in json) {
      var newItem = document.createElement('li');
      newItem.textContent = json[itemIndex][1];
      newItem.className = json[itemIndex][0];
      $(newItem).appendTo(".todoList");
    }
  },

  saveToLocalStorage: function () {
    // Store the data as a json object
    // The key should be the list item index
    // The value should be an array with the class name and the todo text
    // var todoObj = {} //{li_index: [classname, listItem]};
    var todoObj = {}
    for(var i = 0; i < $('li').length; i++) {
      todoObj[i] = [$('li')[i].className, $('li')[i].textContent];
    }

    localStorage.setItem('todoLight', JSON.stringify(todoObj));
    console.log(JSON.parse(localStorage.getItem('todoLight')));
  }
}

$(function() {

  // Move the cursor to the input box
  $('input').focus();

  // Load any previous todos from local storage
  todo.getLocalStorageData();

  // Make the unordered list sortable
  $("ul").sortable({
    appendTo: document.body
  });

  // Create an event so that after sorting the list, it will be saved
  $("ul").sortable({
    stop: function( event, ui ) {
      todo.saveToLocalStorage();
    }
  });

  $('form').on('submit', function(e) {

    e.preventDefault();

    // Create the list item and add it to the ul
    var newItem = document.createElement('li');
    newItem.textContent = e.target[0].value;
    newItem.className = "liTodo";
    $(newItem).appendTo(".todoList");

    // Clear the input value and move the cursor back
    e.target[0].value = '';
    e.target[0].focus();

    // Save the changes
    todo.saveToLocalStorage();
  });

  // Clicking on a Todo will strike it out
  $('.container').on('click', '.liTodo', function(e) {
    e.preventDefault();

    this.className = 'liClose';
    todo.saveToLocalStorage();
  })

  // Right-clicking on a Todo will select it
  $('.container').on('contextmenu', '.liTodo', function(e) {
    e.preventDefault();

    this.className = "liTodo active";
    todo.saveToLocalStorage();
  })

    // Right-clicking on an active Todo will deselect it
  $('.container').on('contextmenu', '.liTodo.active', function(e) {
    e.preventDefault();

    this.className = "liTodo";
    todo.saveToLocalStorage();
  })

  // Clicking on a Todo that is struck out will close it
  $('.container').on('click','.liClose',function(e) {
    e.preventDefault();

    // This slideUp("slow"...) visually slides up the deleted item
    // The function then removes the actual list item and saves the change
    $(this).slideUp("slow", function() {
      $(this).remove();
      todo.saveToLocalStorage();
    });
  });

  // Right clicking on a Todo that is struck out will un-strike it
  $('.container').on('contextmenu', '.liClose',function(e) {
    e.preventDefault();

    this.className = 'liTodo';
    todo.saveToLocalStorage();
  })

  // Todo: Make this code move a an active (selected) li up one by using ctrl+shift+up/down arrow
  // $(document).on('keyup',function(e){
  //   console.log(e.which);
  //   console.log(e.shiftKey);
  //   console.log(e.ctrlKey);

  //   if(e.which === 38 && e.shiftKey && e.ctrlKey) {
  //     console.log('move the active li up');
  //     console.log($(".active"));
  //     console.log($(".active").siblings('li'));
  //     var active = $(".active");
  //     console.log(active[0]);


  //   }
  // })

})

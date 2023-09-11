// JavaScript code (app.js)
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);

// Delete event
itemList.addEventListener('click', removeItem);

// Filter event
filter.addEventListener('keyup', filterItems);

// Initialize local storage
var itemsArray = JSON.parse(localStorage.getItem('items')) || [];

// Load items from local storage
loadItems();

// Add item
function addItem(e){
  e.preventDefault();

  // Get input values
  var newItemName = document.getElementById('item').value;
  var newItemDescription = document.getElementById('description').value;

  // Create new item object
  var newItem = {
    name: newItemName,
    description: newItemDescription
  };

  // Push the new item to the array
  itemsArray.push(newItem);

  // Save the updated array to local storage
  localStorage.setItem('items', JSON.stringify(itemsArray));

  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';

  // Create span elements for item name and description
  var itemNameSpan = document.createElement('span');
  itemNameSpan.className = 'item-name';
  itemNameSpan.appendChild(document.createTextNode(newItemName));

  var itemDescriptionSpan = document.createElement('span');
  itemDescriptionSpan.className = 'item-description';
  itemDescriptionSpan.appendChild(document.createTextNode(newItemDescription));

  // Create delete button element
  var deleteBtn = document.createElement('button');

  // Add classes to delete button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  // Create edit button element
  var editBtn = document.createElement('button');

  // Add classes to edit button
  editBtn.className = 'btn btn-primary btn-sm float-right edit';

  // Append text node
  editBtn.appendChild(document.createTextNode('Edit'));

  // Append spans and buttons to li
  li.appendChild(itemNameSpan);
  li.appendChild(itemDescriptionSpan);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  // Append li to list
  itemList.appendChild(li);

  // Clear input fields
  document.getElementById('item').value = '';
  document.getElementById('description').value = '';
}

// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      var itemName = li.querySelector('.item-name').textContent;
      
      // Remove the item from the array
      itemsArray = itemsArray.filter(function(item){
        return item.name !== itemName;
      });

      // Update local storage
      localStorage.setItem('items', JSON.stringify(itemsArray));

      // Remove the li element
      itemList.removeChild(li);
    }
  }
}

// Filter Items
function filterItems(e){
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName('li');
  // Convert to an array
  Array.from(items).forEach(function(item){
    var itemName = item.querySelector('.item-name').textContent.toLowerCase();
    var itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
    if(itemName.indexOf(text) != -1 || itemDescription.indexOf(text) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Load items from local storage
function loadItems() {
  if (itemsArray.length > 0) {
    itemsArray.forEach(function(item) {
      var li = document.createElement('li');
      li.className = 'list-group-item';

      var itemNameSpan = document.createElement('span');
      itemNameSpan.className = 'item-name';
      itemNameSpan.appendChild(document.createTextNode(item.name));

      var itemDescriptionSpan = document.createElement('span');
      itemDescriptionSpan.className = 'item-description';
      itemDescriptionSpan.appendChild(document.createTextNode(item.description));

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
      deleteBtn.appendChild(document.createTextNode('X'));

      var editBtn = document.createElement('button');
      editBtn.className = 'btn btn-primary btn-sm float-right edit';
      editBtn.appendChild(document.createTextNode('Edit'));

      li.appendChild(itemNameSpan);
      li.appendChild(itemDescriptionSpan);
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      itemList.appendChild(li);
    });
  }
}

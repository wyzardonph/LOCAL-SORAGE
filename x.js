document.addEventListener("DOMContentLoaded", function() {
    loadItems();
   
    document.getElementById("addBtn").addEventListener("click", addItem);
    document.getElementById("massDeleteBtn").addEventListener("click", massDelete);
  });
   
  function loadItems() {
    var items = JSON.parse(localStorage.getItem("items")) || [];
    var list = document.getElementById("list");
   
    list.innerHTML = "";
    items.forEach(function(item, index) {
      var li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.checked;
      checkbox.addEventListener("change", function() {
        items[index].checked = this.checked;
        saveItems(items);
        if (this.checked) {
          li.classList.add("checked");
        } else {
          li.classList.remove("checked");
        }
      });
      var span = document.createElement("span");
  span.textContent = item.name;
      if (item.checked) {
        li.classList.add("checked");
      }
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", function() {
        items.splice(index, 1);
        saveItems(items);
        loadItems();
      });
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      list.appendChild(li);
    });
  }
   
  function saveItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
  }
   
  function addItem() {
    var input = document.getElementById("item");
    var itemName = input.value.trim();
    if (itemName !== "") {
      var items = JSON.parse(localStorage.getItem("items")) || [];
      items.push({ name: itemName, checked: false });
      saveItems(items);
      loadItems();
      input.value = "";
    }
  }
   
  function massDelete() {
    var items = JSON.parse(localStorage.getItem("items")) || [];
    var remainingItems = items.filter(function(item) {
      return !item.checked;
    });
    saveItems(remainingItems);
    loadItems();
  }
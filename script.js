const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

function addTask() {
  if(inputBox.value == '') {
    alert("Enter a task")
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li)
    
    let deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "\u00d7";
    li.appendChild(deleteBtn);
  }
  inputBox.value = "";
  saveData()
}

listContainer.addEventListener("click", function(e){
  if(e.target.tagName == "LI") {
    e.target.classList.toggle("checked");
    saveData()
  } else if(e.target.tagName == "SPAN") {
    e.target.parentElement.remove()
    saveData()
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function displayData() {
  listContainer.innerHTML = localStorage.getItem("data")
  
  const currentTime = Date.now()
  const duration = 24 * 60 * 60 * 1000;
  
  if(listContainer.innerHTML) {
    if(currentTime - listContainer.innerHTML > duration) {
      localStorage.removeItem(listContainer.innerHTML)
    } else {
      displayData();
    }
  } else {
    console.log("No data")
  }
}
displayData();
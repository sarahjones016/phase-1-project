//Variables
const listButton = document.getElementById("list-button")
const tab = document.getElementById("tab")
const form = document.getElementById("form")
const listForm = document.getElementById("listForm")


//Makes the grocery list a drop down on mobile, insuring mobile responsiveness
listButton.addEventListener("click", function() {
    console.log("button has been clicked")

    if (tab.style.height === "150px") {
        tab.style.height = "500px";
    } else {
        tab.style.height = "150px";
    }
})

//Add To Grocery List Form
listForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const newItem = document.createElement("li")
    listForm.append(newItem)
    newItem.textContent = e.target.item.value
})

form.addEventListener("submit", function(e) {
    e.preventDefault();
    fetch("http://localhost:3000/dishes")
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {

        for (const item of data) {
            console.log(item)
        }
    })
})
//Makes the grocery list a drop down on mobile, insuring mobile responsiveness
const listButton = document.getElementById("list-button")
const tab = document.getElementById("tab")
console.log(tab)
listButton.addEventListener("click", function() {
    console.log("button has been clicked")

    if (tab.style.height === "100px") {
        tab.style.height = "500px";
    } else {
        tab.style.height = "100px";
    }

})
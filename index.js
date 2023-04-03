// function changeHeader() {
//     let h1 = document.querySelector('h1')
//     h1.textContent = 'no'
// }

// changeHeader()

//Variables
const listButton = document.getElementById("list-button");
const tab = document.getElementById("tab");
const mealForm = document.getElementById("mealForm");
const listForm = document.getElementById("listForm");
const mealList = document.getElementById("mealList");

fetch("http://localhost:3000/dishes")
  .then((res) => {
    return res.json();
  })
  .then((data) => renderPage(data));

//Makes the grocery list a drop down on mobile, insuring mobile responsiveness
listButton.addEventListener("click", function () {
  console.log("button has been clicked");

  if (tab.style.height === "150px") {
    tab.style.height = "500px";
  } else {
    tab.style.height = "150px";
  }
});

//Add To Grocery List Form
listForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newItem = document.createElement("li");
  listForm.append(newItem);
  newItem.textContent = e.target.item.value;
  listForm.reset();
});

// Render Page Info

function renderPage(dishes) {
  mealForm.addEventListener("submit", function (e) {
    e.preventDefault();
    resetForm();

    dishes.forEach(function (dish) {
      if (dish.type === e.target.cuisine.value) {
        let dishName = document.createElement("h2");
        dishName.textContent = dish.name;
        let img = document.createElement("img");
        img.src = dish.image;

        mealList.append(dishName, img);
      }
    });
    mealForm.reset();
  });
}

function resetForm() {
  mealList.innerHTML = " ";
}
//! On page render

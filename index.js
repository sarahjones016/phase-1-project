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

// Render Page

function renderPage(dishes) {
  mealForm.addEventListener("submit", (e) => {
    e.preventDefault();
    resetForm();

    dishes.forEach((dish) => {
      //function(dish){}
      produceDish(dish, e);
    });

    mealForm.reset();
  });
}

//Subfunction - resets inner divs/removes pictures and text
function resetForm() {
  mealList.innerHTML = " ";
}
//Subfunction - creates list of dishes
function produceDish(dish, e) {
  if (dish.type === e.target.cuisine.value) {

    let dishName = document.createElement("h2");
    dishName.textContent = dish.name;
    let img = document.createElement("img");
    img.src = dish.image;

    let divider = document.createElement("div");
    divider.id = "divider";

    divider.addEventListener(('mouseenter'),() => {
      // console.log('enter')
      img.hidden = true
      let time = document.createElement('h5')
      time.className = 'cardback'
      time.textContent = dish.time

      let servingSize = document.createElement('h5')
      servingSize.className = 'cardback'
      servingSize.textContent = dish.servings

      let ingredients = document.createElement('ul')
      ingredients.className = 'cardback'
      // for ()

      divider.addEventListener(('mouseleave'), () => {
        // console.log('leave')
        img.hidden = false
        ingredients.hidden = true
        servings.hidden = true
        time.hidden = true
      })
      divider.append(time,servings,ingredients)
    })

    divider.append(dishName, img);
    mealList.append(divider);
  }
}

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
  newItem.textContent = e.target.item.value;
  listForm.append(newItem);
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

//Mainfunction - creates list of dishes
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
      divider.style = "overflow-y:auto"
      let time = document.createElement('h4')
      time.className = 'cardback'
      time.textContent = "Cook Time (in mins): " + dish.time

      let servingSize = document.createElement('h4')
      servingSize.className = 'cardback'
      servingSize.textContent = "Servings: " + dish.servings

      let ingredientsTitle = document.createElement("p")
      ingredientsTitle.textContent = "Ingredients:"
      let ingredients = document.createElement('ul')
      ingredientsTitle.append(ingredients)
      ingredients.className = 'cardback'

      for (let ingredient of dish.ingredients) {
        // console.log(ingredient)

        let ingredientList = document.createElement("li")
        ingredientList.textContent = ingredient
        ingredients.append(ingredientList)

        let addToListButton = document.createElement("button")
        addToListButton.textContent = "+"

        addToListButton.addEventListener('click', () => {
          let newItem = document.createElement("li");
          newItem.textContent = ingredient;
          listForm.append(newItem);
          // console.log('click')
        })
        
        ingredientList.append(addToListButton)
      }
      
      divider.addEventListener(('mouseleave'), () => {
        // console.log('leave')
        divider.style = ' '
        img.hidden = false
        ingredients.hidden = true
        servingSize.hidden = true
        time.hidden = true
        ingredientsTitle.hidden = true
      })
      divider.append(time,servingSize,ingredientsTitle)
    })

    let thisIsABreak = document.createElement('br')
    divider.append(dishName, img);
    mealList.append(divider, thisIsABreak);
  }
}

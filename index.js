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
  addToGroceryList(e.target.item.value)
  listForm.reset();
})
  // const newItem = document.createElement("li");
  // newItem.textContent = e.target.item.value;

function addToGroceryList(item){
  let li = document.createElement("li");
  li.textContent = item;
  let deleteButton = document.createElement('button')
  deleteButton.textContent = '❌'
  deleteButton.addEventListener('click', (e) => {
    li.remove()
  })
  li.append(deleteButton)
  listForm.append(li);
}
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
//----------------------------------------------------------
    let divider = document.createElement("div");
    divider.id = "divider";

    divider.append(dishName, img); //dishLikes moves to top after image dissapears
//--------------------------------------------------------------
    
    divider.addEventListener(('mouseenter'),() => {
      // console.log('enter')
      img.hidden = true
      divider.style = "overflow-y:auto"
      let time = document.createElement('h4')
      time.className = 'cardback'
      time.textContent = "Cook Time (in mins): " + dish.time
//--------------------------------------------------------------
      let servingSize = document.createElement('h4')
      servingSize.className = 'cardback'
      servingSize.textContent = "Servings: " + dish.servings
//------------------------------------------------------------
      let ingredientsTitle = document.createElement("p")
      ingredientsTitle.textContent = "Ingredients:"
      let ingredients = document.createElement('ul')
      ingredientsTitle.append(ingredients)
      ingredients.className = 'cardback'
      
//---------------------------------------------------ingredient maker
      for (let ingredient of dish.ingredients) { 
        // console.log(ingredient)

        let ingredientList = document.createElement("li")
        ingredientList.textContent = ingredient
        ingredients.append(ingredientList)

        let addToListButton = document.createElement("button")
        addToListButton.textContent = "+"

        addToListButton.addEventListener('click', () => {

          addToGroceryList(ingredient)
          // console.log('click')
        })
        
        ingredientList.append(addToListButton)
      }
//-----------------------------------------------------
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

    
    //-------------------------------------------
    let dividerSubsection = document.createElement("div")
    dividerSubsection.id = "dividerSub"
    //----------------------------------------------------- Likes
    let dishLikes = document.createElement("h4")
    dishLikes.textContent = dish.likes + " Likes";
    //---------------------------------------------------------likes button
    let likeButton = document.createElement('button')
    likeButton.textContent = '🤢'
    likeButton.addEventListener('click', () => {
      dish.likes += 1
      dishLikes.textContent = dish.likes + " Likes"
    })

    let dishLikesDiv = document.createElement("div")
    dishLikesDiv.className = "dishLikesDiv"

    dishLikesDiv.append(dishLikes, likeButton)
    //----------------------------------------------------------- initial comments
    let commentsDiv = document.createElement('div')
    commentsDiv.className = "commentsDiv"
    let listOfComments = document.createElement('ul')
    let dishComments = dish.comments
    dishComments.forEach((comment) => createComment(comment))
    //------------------------------------------------------------- comment generator subfunction
    function createComment(comment){
      let li = document.createElement('li')
      li.textContent = comment
      listOfComments.append(li)
    }
    //----------------------------------------------------------- creating comments form
    let dishCommentForm = document.createElement("form")
    let dishCommentFormInput = document.createElement("input")
    dishCommentFormInput.name = "input"
    let dishCommentFormButton = document.createElement("button")
    dishCommentFormButton.textContent = "Comment"

    dishCommentForm.addEventListener('submit', function(e){
      e.preventDefault()
      createComment(e.target.input.value)
    })

    dishCommentForm.append(dishCommentFormInput, dishCommentFormButton)
    commentsDiv.append(listOfComments, dishCommentForm)
//------------------------------------------------------------
    let thisIsABreak = document.createElement('div')
    thisIsABreak.className = "space"

    dividerSubsection.append(dishLikesDiv, commentsDiv)
    //----------------------------------------------

    
    mealList.append(divider, dividerSubsection, thisIsABreak);
  }
}
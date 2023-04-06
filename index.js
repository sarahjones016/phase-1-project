//Variables
const listButton = document.getElementById("list-button");
const tab = document.getElementById("tab");
const mealForm = document.getElementById("mealForm");
const listForm = document.getElementById("listForm");
const mealList = document.getElementById("mealList");
const baseUrl = "http://localhost:3000/dishes"

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
  addToGroceryList(e.target.item.value);
  listForm.reset();
});

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
    let dishLink = document.createElement("a");
    dishLink.href = dish.link
    dishLink.textContent = dish.name
    dishName.append(dishLink)
    let img = document.createElement("img");
    img.src = dish.image;

    let divider = document.createElement("div");
    divider.id = "divider";

    //Likes
    let dividerSubsection = document.createElement("div")
    dividerSubsection.id="dividerSub"
    let dishLikes = document.createElement("h4")
    dishLikes.textContent = dish.likes + " Likes";
    let dishLikesButton = document.createElement("button")
    dishLikesButton.textContent = "⭐"
    let dishLikesDiv = document.createElement("div")
    dishLikesDiv.className = "dishLikesDiv"

    dishLikesButton.addEventListener("click", function() {
      dish.likes ++
      dishLikes.textContent =  dish.likes + " Likes";


//PATCH Likes
      likesObj = {
        likes: dish.likes
      }

      fetch(`${baseUrl}/${dish.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likesObj)
    })
    .then(res => res.json())
    })

    dishLikesDiv.append(dishLikes, dishLikesButton)

    //Render Comments
    let commentsDiv = document.createElement("div")
    commentsDiv.className = "commentsDiv"
    let listOfComments = document.createElement("ul")
    let dishComments = dish.comments
    dishComments.forEach((comment) => createComment(comment))

    function createComment(comment) {
      let li = document.createElement("li")
      li.textContent = comment
      listOfComments.append(li)
    }
    commentsDiv.append(listOfComments)

    //Comments Form
    let dishCommentForm = document.createElement("form")
    dishCommentForm.id = "commentForm"
    let dishCommentFormInput = document.createElement("input")
    dishCommentFormInput.name = "comment"
    let dishCommentFormButton = document.createElement("button")
    dishCommentFormButton.textContent = "Comment"

    dishCommentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
//PATCH Comments

      let arr = dish.comments
      arr.push(e.target.comment.value)
      commentObj = {
        comments: arr
      }
      
      fetch(`${baseUrl}/${dish.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentObj)
    })
    .then(res => res.json())
    .then(createComment(e.target.comment.value))

    })

    dishCommentForm.append(dishCommentFormInput, dishCommentFormButton)
    commentsDiv.append(listOfComments, dishCommentForm)

    dividerSubsection.append(dishLikesDiv, commentsDiv)
    
    //Card Hover
    divider.addEventListener(('mouseenter'),() => {
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

        let ingredientList = document.createElement("li")
        ingredientList.textContent = ingredient
        ingredients.append(ingredientList)

        let addToListButton = document.createElement("button")
        addToListButton.textContent = "+"

        addToListButton.addEventListener('click', () => {
          addToGroceryList(ingredient)
        })
        
        ingredientList.append(addToListButton)
      }
      
      divider.addEventListener(('mouseleave'), () => {
        divider.style = ' '
        img.hidden = false
        ingredients.hidden = true
        servingSize.hidden = true
        time.hidden = true
        ingredientsTitle.hidden = true
      })
      divider.append(time,servingSize,ingredientsTitle)
    })

    let thisIsABreak = document.createElement('div')
    thisIsABreak.className = "space"

    divider.append(dishName, img);
    mealList.append(divider, dividerSubsection);
    dividerSubsection.append(thisIsABreak)
  }
}

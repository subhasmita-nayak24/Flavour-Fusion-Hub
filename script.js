const input = document.querySelector(".input")
const searchBtn = document.querySelector(".searchBtn")
const recipeContainer = document.querySelector(".recipe-container")
const recipeContent = document.querySelector(".recipe-content")
const recipeClose = document.querySelector(".recipe-close")


//Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>"
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json()

    recipeContainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML = ` <img src="${meal.strMealThumb}">
               <h3>${meal.strMeal}</h3>
               <p><span>${meal.strArea}Dish</span></p>
               <p>Belongs to <span>${meal.strCategory}</span> Category</p>`

        const button = document.createElement('button')
        button.textContent = "View Recipe"
        recipeDiv.appendChild(button)

        // Adding EventListener to recipe btn
        button.addEventListener('click', (e) => {
            openRecipe(meal)
        })
        recipeContainer.appendChild(recipeDiv)

        // console.log(meal)
    });
} catch (error) {
        recipeContainer.innerHTML = "<h2>Error!</h2>"
}
}

// Function to fetchIngredients
const fetchIngredients = (meal) => {
    // console.log(meal);
    let ingredientsList = ""
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}
const openRecipe = (meal) => {
    recipeContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>

<div  class="instructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `

    recipeContent.parentElement.style.display = "block"
}

recipeClose.addEventListener('click',(e)=>{
    recipeContent.parentElement.style.display= "none"
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()   //page will not refersh automatically
    const searchInput = input.value.trim()
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`
        return
    }
    fetchRecipes(searchInput)
    // console.log('btn clicked')
});

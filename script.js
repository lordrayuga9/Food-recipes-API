const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const mealDetails = document.querySelector(".meal-details");
const searchresults = document.getElementById("title");
searchresults.style.display="none";
const recipeCloseBtn = document.getElementById("recipe-close-btn");


// Event Listeners

searchBtn.addEventListener("click", getMealList);
document.getElementById("search-input").addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        getMealList();
    }
})
recipeCloseBtn.addEventListener("click", toggleDisplay);


// get meal list that matches with the ingredients

async function getMealList(){
    let searchInputTxt = document.getElementById("search-input").value.trim();
    console.log(searchInputTxt);
    if(searchInputTxt.length>0){
    try{
    let x =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`,{
        method:"GET"
    })
     let data = await x.json();
     searchresults.style.display="block";
    // console.log(data)
    let html ="";   
    if(data.meals){
        data.meals.forEach(meal=>{
            html+=`
            <div class="meal-item" id = "${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="Food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <button class= "recipe-btn" onclick="getMealRecipe(${meal.idMeal})" >Get Recipe</button>
                </div>
            </div>`
        });
        mealList.classList.remove("notFound");
    }
    else{
        html = "Sorry We didn't find any meal..!!! "
        mealList.classList.add("notFound")
    }
        mealList.innerHTML = html;
    }
    catch(error){
    alert("Sorry We didn't find any meal..!!!");
    }
}
}

async function getMealRecipe(id){
        let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,{
        method:"GET"
        })
        let data = await x.json();
        console.log(data)
        mealDetails.style.display="block"
        
        
        mealDetailsContent.innerHTML=`
        <h2 class="recipe-title">${data.meals[0].strMeal}</h2>
        <p class="recipe-category">${data.meals[0].strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions</h3>
            <p>${data.meals[0].strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${data.meals[0].strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${data.meals[0].strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `
      
        // let x = await fetch("")
    
}

function toggleDisplay(){
    mealDetails.style.display="none";
}

/// <reference types="../@types/jquery" />
// ?=============>  GLOBAL  =============>
let rowData =document.getElementById("rowData");
let searchContainer =document.getElementById("searchContainer");
let btnSubmit;
let inputNameToushed = false;
let inputEmailToushed = false;
let inputPhoneToushed = false;
let inputAgeToushed = false;
let inputPasswordToushed = false;
let inputRepasswordToushed = false;
// *=============>  WHEN START  =============>
  closeSideNav();
$(".side-nav-menu .open-close-icon").click(()=>{
 

  if($('.side-nav-menu').css("left") == "0px"){
    
    closeSideNav();

  }else{
   
    openSideNav();
  }
  
})

$("document").ready(()=>{
  searchByName("").then(()=>{
    $(".loading-screen").fadeOut(500)
    $("body").css("overflow", "visible")
  })
})
// !=============>  FUNCTION  =============>

function closeSideNav(){
  let boxWidth = $('.side-nav-menu  .nav-tab').outerWidth()
  $('.side-nav-menu').animate({left:-boxWidth},500);
  $('.open-close-icon').removeClass('fa-x');
  $('.open-close-icon').addClass('fa-align-justify');
  $(".links li").animate({top:300},500);
}
function openSideNav(){
  $('.side-nav-menu').animate({left:0},500);
  $('.open-close-icon').removeClass('fa-align-justify');
  $('.open-close-icon').addClass('fa-x');
  for(let i=0 ; i < 5 ; i++){
    $(".links li").eq(i).animate({top:0},(i+5)*100);
  }
}


function displayMeals(arr){
  let cols = ``;
  for(let i=0 ; i < arr.length ; i++){
    cols +=`
       <div class="col-sm-12 col-md-6 col-lg-4">
                <div onclick="getMealDetailes('${arr[i].idMeal}')" class=" meal position-relative rounded-4 overflow-hidden">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer d-flex align-items-center">
                    <h3 class="text-black p-2">${arr[i].strMeal}</h3>
                </div>
                
                </div>
            </div>
    `
  }

  rowData.innerHTML = cols;
}




// ?=============> START CATEGORIES =============>
 async function getCategories(){
  rowData.innerHTML = ""
  $(".inner-loadin-screen").fadeIn(300)
  searchContainer.innerHTML = "";
    let categories  = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await categories.json();
    console.log(response.categories);
    displayCategories(response.categories)
    $(".inner-loadin-screen").fadeOut(300)

  }
  function displayCategories(arr){
    let cols = ``;
  for(let i=0 ; i < arr.length ; i++){
    cols +=`
       <div class="col-sm-12 col-md-6 col-lg-4">
                <div onclick="getCategoryMeal('${arr[i].strCategory}')"  class="meal position-relative rounded-4 overflow-hidden cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer text-center text-black">
                    <h3 class="p-2">${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split(' ').slice(0,25).join(' ')}</p>
                </div>
                
                </div>
            </div>
    `
  }
  rowData.innerHTML = cols;
  }
// ?=============> END CATEGORIES =============>

// ?=============> START AREA =============>

 async function getArea(){
  rowData.innerHTML = ""
  $(".inner-loadin-screen").fadeIn(300)
  searchContainer.innerHTML = "";
    let Area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let response = await Area.json();
    console.log(response.meals);
    displayArea(response.meals)
    $(".inner-loadin-screen").fadeOut(300)

  }
  function displayArea(arr){
    let cols = ``;
  for(let i=0 ; i < arr.length ; i++){
    cols +=`
       <div class="col-sm-12 col-md-6 col-lg-4">
                <div onclick="getAreaMeal('${arr[i].strArea}')" class="rounded-4 cursor-pointer">
                
                  <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3 class="p-2">${arr[i].strArea}</h3>
                
                </div>
            </div>
    `
  }
  rowData.innerHTML = cols;
  }
  // ?=============> END AREA =============>

  // ?=============> START INGREDIENTS =============>
 async function getIngredients(){
  rowData.innerHTML=""
  $(".inner-loadin-screen").fadeIn(300)
  searchContainer.innerHTML = "";
    let Ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let response = await Ingredients.json();
    console.log(response.meals.slice(0,100));
    displayIngredients(response.meals.slice(0,20))
    $(".inner-loadin-screen").fadeOut(300)

  }
  function displayIngredients(arr){
    let cols = ``;
  for(let i=0 ; i < arr.length ; i++){
    cols +=`
       <div class="col-sm-12 col-md-6 col-lg-4">
                <div onclick="getIngredientMeal('${arr[i].strIngredient}')" class="rounded-4 text-center cursor-pointer">
                
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="p-2">${arr[i].strIngredient}</h3>
                       <p>${arr[i].strDescription.split(' ').slice(0,25).join(' ')}</p>
                </div>
            </div>
    `
  }
  rowData.innerHTML = cols;
  }
// ?=============> END INGREDIENTS =============>


// *=============> START CATEGORIES  Meals =============>
async function getCategoryMeal(category){
  rowData.innerHTML=""
  $(".inner-loadin-screen").fadeIn(300)
let categoryMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
let response = await categoryMeal.json();
console.log(response.meals);
displayMeals(response.meals.slice(0,20))
$(".inner-loadin-screen").fadeOut(300)

  }
// *=============> END CATEGORIES  Meals =============>

// *=============> START AREA  Meals =============>
async function getAreaMeal(area){
  rowData.innerHTML=""
  $(".inner-loadin-screen").fadeIn(300)
let areaMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
let response = await areaMeal.json();
console.log(response.meals);
displayMeals(response.meals.slice(0,20))
$(".inner-loadin-screen").fadeOut(300)
  }
// *=============> END AREA  Meals =============>

  
// *=============> START INGREDIENTS Meals =============>
async function getIngredientMeal(ingredient){
  rowData.innerHTML="" 
  $(".inner-loadin-screen").fadeIn(300)
let ingredientMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
let response = await ingredientMeal.json();
console.log(response.meals);
displayMeals(response.meals.slice(0,20))
$(".inner-loadin-screen").fadeOut(300)
  }
// *=============> END INGREDIENTS Meals =============>


// *=============> START MEAL DETAILES =============>
async function getMealDetailes(mealID){
  rowData.innerHTML=""
  $(".inner-loadin-screen").fadeIn(300)
  searchContainer.innerHTML = "";
  let detailes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let response = await detailes.json();
  // console.log(response.meals[0]);
  displayMealDetailes(response.meals[0]);
  $(".inner-loadin-screen").fadeOut(300)
}


function displayMealDetailes(meal){
  closeSideNav();
  let ingredients = ``
  for(let i=1 ; i<20 ; i++){
    if(meal[`strIngredient${i}`]){
      ingredients += `<li class="alert alert-info m-2 p-1 fs-6 fw-normal">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
  }
    }
    
  let tags = meal.strTags?.split(',');
  if(!tags) tags =[];
  let tagStr = ``;
  for(let i=0 ; i<tags.length ; i++){
    tagStr +=` <li class="alert alert-danger m-2 p-1 fs-6 fw-normal">${tags[i]}</li>`
  }

  let cartona = `
        <div class="col-sm-12 col-md-4">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bold">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bold">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :
                <ul class="list-unstyled d-flex flex-wrap g-3">
                  ${ingredients}
                </ul>
                </h3>
                <h3>Tags :
                <ul class="list-unstyled d-flex flex-wrap g-3">
                    ${ tagStr}
                </ul>
                </h3>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtub</a>
            </div>
  `

  rowData.innerHTML = cartona;

}  
// *=============> END MEAL DETAILES =============>
// *=============> START SEARCH =============>
 function showSearchInput(){
  searchContainer.innerHTML = `
                <div class="row search">
                    <div class="col-md-6">
                        <input type="text" oninput="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name" >
                    </div>
                    <div class="col-md-6">
                        <input type="text" oninput="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter" >
                    </div>
                </div>`;
           rowData.innerHTML = "";
              
 }
 async function searchByName(mealName){
   rowData.innerHTML=""
  $(".inner-loadin-screen").fadeIn(300)
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  let response = await meals.json();
  // console.log(response.meals);
  response.meals? displayMeals(response.meals) : displayMeals([]) ;
  $(".inner-loadin-screen").fadeOut(300) 
}
 async function searchByFLetter(mealLetter){
   rowData.innerHTML=""
  $(".inner-loadin-screen").fadeIn(300)
  mealLetter == ""? mealLetter = "a" : "";
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealLetter}`);
  let response = await meals.json();
  // console.log(response.meals);
  response.meals? displayMeals(response.meals) : displayMeals([]) ;
  $(".inner-loadin-screen").fadeOut(300) 
  
}
// *=============> END SEARCH =============>
 
// *=============> START CONTACT =============>  

function showContacts(){
  rowData.innerHTML = `
   <div class="contact min-vh-100  d-flex align-items-center justify-content-center">
            <div class="container input-width text-center">
                <div class="row g-4" id="data">
                    <div class="col-md-6">
                        <input id="inputName" type="text" oninput=" inputsValidation()" class="form-control"  placeholder="Enter Your Name" >
                        <ul class="alert alert-danger d-none p-0" id="nameAlert">
                            <li>Your Name Is Required</li>
                            <li>Minmum Length 2 and Maxmum 20</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <input id="inputEmail" type="email" oninput=" inputsValidation()" class="form-control"  placeholder="Enter Your Email" >
                        <ul class="alert alert-danger d-none p-0" id="emailAlert">
                            <li>Email Is Required</li>
                            <li>InValid Email Formate *example@gmail.com</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <input id="inputPhone" type="tel" oninput=" inputsValidation()" class="form-control"  placeholder="Enter Your Phone" >
                        <ul class="alert alert-danger d-none p-0" id="phoneAlert">
                            <li>Phone Is Required</li>
                            <li>Minimum eleven numbers</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <input id="inputAge" type="number" oninput=" inputsValidation()" class="form-control"  placeholder="Enter Your Age" >
                        <ul class="alert alert-danger d-none p-0" id="ageAlert">
                            <li>Age Is Required</li>
                            <li>Minimum 10 Maxmum 80</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <input id="inputPassword" type="password" oninput=" inputsValidation()" class="form-control"  placeholder="Enter Your Password" >
                        <ul class="alert alert-danger d-none p-0" id="passwordAlert">
                            <li>Password Is Required</li>
                            <li>Minimum eight characters, at least one letter and one number</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <input id="inputRepassword" type="password" oninput=" inputsValidation()" class="form-control"  placeholder="Enter Your Repassword" >
                       <ul class="alert alert-danger d-none p-0" id="repasswordAlert">
                        <li>Repassword Is Required</li>
                        <li>Repassword Should Equal Password</li>
                        </ul>
                    </div>
                    
                </div>
                <button disabled class="btn btn-outline-danger py-2 my-3" id="btnSubmit" >Submit</button>
            </div>
         </div>
  `
  btnSubmit = document.getElementById("btnSubmit");

  // *=============>  EVENTS  =============>
    document.getElementById("inputName").addEventListener("focus" , () =>{
      inputNameToushed = true
    });
    document.getElementById("inputEmail").addEventListener("focus" , () =>{
      inputEmailToushed = true
    });
    document.getElementById("inputPhone").addEventListener("focus" , () =>{
      inputPhoneToushed = true
    });
    document.getElementById("inputAge").addEventListener("focus" , () =>{
      inputAgeToushed = true
    });
    document.getElementById("inputPassword").addEventListener("focus" , () =>{
      inputPasswordToushed = true
    });
    document.getElementById("inputRepassword").addEventListener("focus" , () =>{
      inputRepasswordToushed = true
    });
  

  }

// *=============> EDN CONTACT =============> 

  function inputsValidation(){
    if(inputNameToushed){
    if(validationName()){
      document.getElementById("nameAlert").classList.replace('d-block','d-none');
        inputName.classList.add('is-valid')
        inputName.classList.remove('is-invalid')
    }else{
      document.getElementById("nameAlert").classList.replace('d-none','d-block');
        inputName.classList.add('is-invalid')
        inputName.classList.remove('is-valid')
    }}

    if(inputEmailToushed){
    if(validationEmail()){
      document.getElementById("emailAlert").classList.replace('d-block','d-none');
         inputEmail.classList.add('is-valid')
      inputEmail.classList.remove('is-invalid')
    }else{
      document.getElementById("emailAlert").classList.replace('d-none','d-block');
      inputEmail.classList.add('is-invalid')
      inputEmail.classList.remove('is-valid')
    }}

    if(inputPhoneToushed){
    if(validationPhone()){
      document.getElementById("phoneAlert").classList.replace('d-block','d-none');
       inputPhone.classList.add('is-valid')
      inputPhone.classList.remove('is-invalid')
    }else{
      document.getElementById("phoneAlert").classList.replace('d-none','d-block');
      inputPhone.classList.add('is-invalid')
      inputPhone.classList.remove('is-valid')
    }}

    if(inputAgeToushed){
    if(validationAge()){
      document.getElementById("ageAlert").classList.replace('d-block','d-none');
          inputAge.classList.add('is-valid')
          inputAge.classList.remove('is-invalid')
    }else{
      document.getElementById("ageAlert").classList.replace('d-none','d-block');
          inputAge.classList.add('is-invalid')
          inputAge.classList.remove('is-valid')
    }}

    if(inputPasswordToushed){
    if(validationPassword()){
      document.getElementById("passwordAlert").classList.replace('d-block','d-none');
          inputPassword.classList.add('is-valid')
          inputPassword.classList.remove('is-invalid')
    }else{
      document.getElementById("passwordAlert").classList.replace('d-none','d-block');
          inputPassword.classList.add('is-invalid')
          inputPassword.classList.remove('is-valid')
    }}

    if(inputRepasswordToushed){
    if(validationRepassword()){
      document.getElementById("repasswordAlert").classList.replace('d-block','d-none');
          inputRepassword.classList.add('is-valid')
          inputRepassword.classList.remove('is-invalid')
    }else{
      document.getElementById("repasswordAlert").classList.replace('d-none','d-block');
          inputRepassword.classList.add('is-invalid')
          inputRepassword.classList.remove('is-valid')
    }}

    if(validationName() && validationEmail() &&
    validationPhone() &&
    validationAge() &&
    validationPassword() &&
    validationRepassword()){
      btnSubmit.removeAttribute("disabled");
  
    }else{
      btnSubmit.setAttribute("disabled",true);

    }

  } 

  function validationName(){
    const regexStyle = 
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
   let inputName = document.getElementById("inputName");
    return(regexStyle.test(inputName.value))
}
function validationEmail(){
   const regexStyle =

  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  
  let inputEmail = document.getElementById("inputEmail");
  return(regexStyle.test(inputEmail.value)) // data ok
}
function validationPhone(){
   const regexStyle = /^\+?[0-9]\d{1,20}$/;
   let inputPhone = document.getElementById("inputPhone");
  return(regexStyle.test(inputPhone.value))  // data ok
}

function validationAge(){
  const regexStyle =
        /^([1-7][0-9]|80)$/
        let inputAge = document.getElementById("inputAge");
        return(regexStyle.test(inputAge.value)) // data ok
}

function validationPassword(){
   const regexStyle =
         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
         let inputPassword = document.getElementById("inputPassword");
         return(regexStyle.test(inputPassword.value)) // data ok
}
function validationRepassword(){
  let inputRepassword = document.getElementById("inputRepassword");
  let inputPassword = document.getElementById("inputPassword");
  return(inputPassword.value == inputRepassword.value)  // data ok
}






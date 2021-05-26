// Utils function
const cleanContainer = (id) => {
    const $container = document.querySelector(id)
    $container.innerHTML = ''
}

// DOM functions
const $searchForm = document.querySelector('#search-form')
$searchForm.addEventListener('submit', async evt => {
    evt.preventDefault()

    const $searchTerm = document.querySelector('#search-term')
    const term = $searchTerm.value

    const meals = await getMealsBySearch(term)
    
    if (meals) {
        cleanContainer('#meals')

        meals.forEach(meal => addMeal(meal))
    }
})

const $mealPopupClose = document.querySelector('#meal-popup-close')
$mealPopupClose.addEventListener('click', () => {
    const $mealPopup = document.querySelector('#meal-popup')
    $mealPopup.classList.add('hidden')
})

// Localstorage handler
const fetchFavoriteMeals = async () => {
    const mealIds = getMealsLocalStorage()

    cleanContainer('#favorite-meals')

    for (let i = 0; i < mealIds.length; i++) {
        const meal = await getMealById(mealIds[i])

        addMealFav(meal)
    }
}

const getMealsLocalStorage = () => {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))

    return mealIds === null ? [] : mealIds
}

const addMealLocalStorage = (mealId) => {
    const mealIds = getMealsLocalStorage()

    if (!mealIds.includes(mealId)) {
        localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
    }
}

const removeMealLocalStorage = (mealId) => {
    const mealIds = getMealsLocalStorage()

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(mId => mId !== mealId)))
}

// Data handler functions
const getRandomMeal = async () => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')

    const data = await resp.json()
    const randomMeal = data.meals[0]

    addMeal(randomMeal, true)
}

const getMealById = async (id) => {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

    const data = await resp.json()
    const meal = data.meals ? data.meals[0] : undefined

    return meal
}

const getMealsBySearch = async (name) => {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)

    const data = await resp.json()

    const meal = data.meals ? data.meals : undefined

    return meal ? meal : undefined
}

// Views functions
const addMeal = (mealData, random = false) => {
    const $meals = document.querySelector('#meals')
    const $meal = document.createElement('div')

    $meal.innerHTML = `
        <div class="meal">
            <div class="meal-header">
                ${random ? `
                    <span class="random">
                        Random meal
                    </span>
                ` : `
                    <span class="random">
                        ${mealData.strMeal}
                    </span>
                `}
                <img
                    src="${mealData.strMealThumb}"
                    alt="${mealData.strMeal}"
                >
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="favorite-btn">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `
    const btn = $meal.querySelector('.meal-body .favorite-btn')

    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealLocalStorage(mealData.idMeal)
            btn.classList.remove('active')
        }
        else {
            addMealLocalStorage(mealData.idMeal)
            btn.classList.add('active')
        }

        fetchFavoriteMeals()
    })

    $meal.addEventListener('click', () => {
        showMealInfo(mealData)
    })

    $meals.appendChild($meal)
}

const addMealFav = (mealData) => {
    const $favMeals = document.querySelector('#favorite-meals')
    const $favMeal = document.createElement('li')

    $favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        >
        <span>${mealData.strMeal}</span>
        <button><i class="fas fa-times"></i></button>
    `

    const $btn = $favMeal.querySelector('button')
    $btn.addEventListener('click', () => {
        removeMealLocalStorage(mealData.idMeal)
        
        fetchFavoriteMeals()
    })

    $favMeal.addEventListener('click', () => {
        showMealInfo(mealData)
    })

    $favMeals.appendChild($favMeal)
}

const showMealInfo = (mealData) => {
    const $mealInfo = document.querySelector('#meal-info')
    const $popup = document.querySelector('#meal-popup')
    const $info = document.createElement('div')

    const ingredients = []

    for (let i = 1; i < 21; i++) {
        const ingredient = mealData[`strIngredient${i}`]
        const measure = mealData[`strMeasure${i}`]

        if (ingredient) {
            ingredients.push(`${measure} of ${ingredient}`)
        }
        else {
            break
        }
    }

    $info.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">

        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>

        <h3>Steps</h3>
        <p>${mealData.strInstructions}</p>
    `
    cleanContainer('#meal-info')

    $mealInfo.appendChild($info)

    $popup.classList.remove('hidden')
}

// Main
document.addEventListener('DOMContentLoaded', () => {
    fetchFavoriteMeals()
    getRandomMeal()
})

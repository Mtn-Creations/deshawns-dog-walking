import { getCities, getPets, getWalkerCities, getWalkers } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()
const cities = getCities()
const walkerCities = getWalkerCities()

// Function whose responsibility is to find the walker assigned to a pet
const findPetWalker = (pet, allWalkers) => {
    let petWalker = null

    for (const walker of allWalkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}

// Function to find cities assigned to individual walker
const findWalkerCities = (walker, cities, walkerCities) => {
    const _walkerCityNames = []

    for ( const walkerCity of walkerCities) {
        if (walker.id === walkerCity.walkerId) {
            for ( const city of cities.filter(city => city.id === walkerCity.cityId) ) {
                _walkerCityNames.push(city.name)
            }
        }
    }

    return _walkerCityNames
}


export const Assignments = () => {
    let assignmentHTML = ""
    assignmentHTML = "<ul>"

    for (const currentPet of pets) {
        const currentPetWalker = findPetWalker(currentPet, walkers)
        const currentPetWalkerCities = findWalkerCities(currentPetWalker, cities, walkerCities)
        assignmentHTML += `
            <li>
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${currentPetWalkerCities.join(' and ')}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}

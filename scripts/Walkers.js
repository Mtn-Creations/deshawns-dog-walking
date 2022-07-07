import { getWalkers, getWalkerCities, getCities } from "./database.js"

const walkers = getWalkers()

document.addEventListener(
    "click",
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    window.alert(`${walker.name} services ${walkerCityNames(walkerCities(walker))}`)  
                }
            }

        }
        
    }
)


const walkerCities = (walker) => {

    return getWalkerCities().filter( city => city.walkerId === walker.id)

}


const walkerCityNames = (citiesByWalker) => {

    const filteredCityNames = []

    for ( const filteredCity of citiesByWalker ) {
        for ( const city of getCities()) {
            if (city.id === filteredCity.cityId) {
                filteredCityNames.push(city.name)
            }
        }
    }


    return filteredCityNames.join(', ')

}

export const Walkers = () => {

    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML

}


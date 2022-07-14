import { getPets, getWalkers } from "./database.js"

const pets = getPets()
const petWalkers = getWalkers()


document.addEventListener(
    "click",
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("pet")) {
            const [,petId] = itemClicked.id.split("--")

            for (const pet of pets) {
                if (pet.id === parseInt(petId)) {
                    window.alert(`${pet.name} is being walked by ${findPetWalker(pet.walkerId, petWalkers).name}`)  
                }
            }

        }
        
    }
)


function findPetWalker(_walkerId, _petWalkers) {
    for (const walker of _petWalkers) {
        if (_walkerId === walker.id) return walker
    }
}


export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        petHTML += `<li id=pet--${pet.id}>${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}


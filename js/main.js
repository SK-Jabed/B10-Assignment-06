
let currentPets = []; // Global variable to store current pets


const showLoader = () => {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden"); // Show the loader
};

const hideLoader = () => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden"); // Hide the loader
};



// Fetch, Load and Show Catagories

// Create Load Catagories 
const loadCatagories = () => {
    
    // Fetch the Data
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        .then(response => response.json())
        .then(data => displayCatagories(data.categories))
        .catch((error => console.log(error)))
}

// const loadAllPets = () => {   
//     fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
//         .then(response => response.json())
//         .then(data => displayAllPets(data.pets))
//         .catch((error => console.log(error)))
// }


// Fetch all pets initially
// const loadAllPets = () => {
//     fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
//         .then(response => response.json())
//         .then(data => {
//             currentPets = data.pets; // Store the fetched pets
//             displayAllPets(currentPets);
//         })
//         .catch((error => console.log(error)))
// };



const loadAllPets = () => {
    // Show loader before fetching data
    showLoader();

    // Fetch the Data
    setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        .then(response => response.json())
        .then(data => {
            // After fetching data, hide the loader and display pets
            hideLoader();
            currentPets = data.pets; // Hide the loader after data is fetched
            displayAllPets(currentPets); // Display pets after hiding the loader
        })
        .catch((error => {
            hideLoader(); // Ensure loader is hidden even on error
            console.log(error);
        }));

    }, 2000);
};



// const loadCategoryPets = (category) => {
//     // Fetch the Data
//     fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
//         .then(response => response.json())
//         .then(data => {
//             // Remove Active Classes from Other Buttons
//             removeActiveClass();
//             // Active The Selected ID Button
//             const activeButton = document.getElementById(`btn-${category}`);
//             activeButton.classList.add("active");

//             displayAllPets(data.data);           
//         })
//         .catch((error => console.log(error)))
// }


// Fetch pets by category and store them
const loadCategoryPets = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(response => response.json())
        .then(data => {
            currentPets = data.data; // Store the pets of the selected category
            removeActiveClass();
            const activeButton = document.getElementById(`btn-${category}`);
            activeButton.classList.add("active");

            displayAllPets(currentPets);
        })
        .catch((error => console.log(error)))
};


// const loadCategoryPets = (category) => {
//     showLoader();
    
//     setTimeout(() => {
//         fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
//             .then(response => response.json())
//             .then(data => {
//                 currentPets = data.data; // Store the pets of the selected category
//                 removeActiveClass();
//                 const activeButton = document.getElementById(`btn-${category}`);
//                 activeButton.classList.add("active");

//                 hideLoader(); // Hide the loader after fetching the pets
//                 displayAllPets(currentPets); // Display pets after hiding the loader
//             })
//             .catch((error => {
//                 hideLoader(); // Ensure the loader is hidden even on error
//                 console.log(error);
//             }));
//     }, 4000); // 2-second delay
// }



// const loadCategoryPets = (category) => {
//     showLoader(); // Show loader

//     setTimeout(() => {
//         fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
//             .then(response => response.json())
//             .then(data => {
//                  // Store the pets of the selected category
//                 removeActiveClass();
//                 const activeButton = document.getElementById(`btn-${category}`);
//                 activeButton.classList.add("active");

//                 hideLoader();
//                 currentPets = data.data; // Hide the loader after fetching the pets
//                 displayAllPets(currentPets); // Display pets after hiding the loader
//             })
//             .catch((error => {
//                 hideLoader(); // Ensure the loader is hidden even on error
//                 console.log(error);
//             }));
//     }, 2000); // You can adjust this delay if needed
// };



const loadDetails = (petId) => {
    // console.log(petId);
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(response => response.json())
        .then(data => displayDetails(data.petData))
        .catch((error => console.log(error)))
}


// Function to sort pets by price in descending order
const sortPetsByPrice = () => {
    // Sort the currentPets array by price (assuming price is numeric)
    currentPets.sort((a, b) => b.price - a.price);
    
    // Redisplay the sorted pets
    displayAllPets(currentPets);
};



// const sortPetsByPrice = () => {
//     showLoader();
    
//     setTimeout(() => {
//         currentPets.sort((a, b) => b.price - a.price); // Sort by price in descending order
//         hideLoader(); // Hide the loader
//         displayAllPets(currentPets); // Display the sorted pets
//     }, 2000); // 2-second delay
// }


// const sortPetsByPrice = () => {
//     showLoader(); // Show loader

//     setTimeout(() => {
//         currentPets.sort((a, b) => b.price - a.price); // Sort by price in descending order
//         hideLoader(); // Hide the loader
//         displayAllPets(currentPets); // Display the sorted pets
//     }, 2000); // Adjust delay if necessary
// };



const displayDetails = (petDetails) => {
    // console.log(petDetails);
    const detailsContainer = document.getElementById("modal-content");
    document.getElementById("detailsModal").showModal();

    detailsContainer.innerHTML = `
    <div class="bg-white rounded-lg overflow-auto grid grid-cols-3">
            <img class="rounded-lg w-full col-span-3" src="${petDetails.image}" alt="Pet Image">
            <div class="mt-4 col-span-3">
                <h2 class="text-xl font-semibold mb-2">${petDetails.pet_name}</h2>
                <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/bulldog.png" alt="bulldog">Breed: ${petDetails.breed}</p>
                
                <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/cotton/20/gender.png" alt="gender">Gender: ${petDetails.gender}</p>
                
                <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="25" height="25" src="https://img.icons8.com/external-outline-wichaiwi/25/external-vaccination-reopening-country-outline-wichaiwi.png" alt="external-vaccination-reopening-country-outline-wichaiwi">Vaccinated status: ${petDetails.vaccinated_status}</p>
                <div class="">
                <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/ios/20/birth-date.png" alt="birth-date">Birth: ${petDetails.date_of_birth}</p>
                <p class="flex gap-1 font-normal text-[#131313B3] mb-4"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/average-2.png" alt="average-2">Price: ${petDetails.price}</p>
                </div>
                <hr>              
                <h2 class="font-bold mt-2">Details Information</h2>
                <p class="flex gap-1 font-normal text-[#131313B3] mt-2">${petDetails.pet_details}</p>

            </div>
        </div>
    `
}



const displayAdoptModal = (petAdopt, petId) => {
    const adoptContainer = document.getElementById("adopt-modal-content");
    
    // Show the adoption modal
    document.getElementById("adoptModal").showModal();

    // Display countdown modal content
    adoptContainer.innerHTML = `
    <div id="adopt-popup" class="bg-white rounded-lg flex flex-col justify-center items-center gap-2">
        <img width="48" height="48" src="https://img.icons8.com/emoji/48/confetti-ball.png" alt="confetti-ball">
        <h2 class="text-4xl font-black">Congratulation</h2>
        <p>Adoption Process is Start For your Pet</p>         
        <h2 id="countdownText" class="text-6xl font-black">3</h2>
    </div>
    `;

    let countdown = 3;

    // Get the button clicked using petId
    const adoptButton = document.getElementById(`${petId}`);

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
        countdown -= 1;
        const countdownText = document.getElementById('countdownText');
        countdownText.textContent = `${countdown}`;

        // If countdown reaches 0, clear the interval
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            // Close the modal after countdown
            document.getElementById("adoptModal").close();

            // Change the button text to "Adopted" and disable it
            adoptButton.innerText = "Adopted";
            adoptButton.disabled = true; // Disable the button
            adoptButton.classList.add("adopted-button"); // Optionally, add a class for styling
        }
    }, 1000);

    // Automatically close the modal after 3 seconds (as a fallback)
    setTimeout(() => {
        document.getElementById("adoptModal").close();
    }, 3000);
}




const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("catagories-btn");
    // console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
}



const displayAllPets = (pets) => {


    const petsCardContainer = document.getElementById("pets-cards-container");
    petsCardContainer.innerHTML = "";


    if (pets.length === 0) {
        petsCardContainer.classList.remove("grid")
        petsCardContainer.innerHTML =`
        <div class="text-center p-8 border-2">
        <div class="flex justify-center">
            <img class="rounded-xl w-20 py-8" src="images/error.webp" alt="Shoes">
        </div>
        <h2 class="font-black text-4xl mb-4">No Information available</h2>
        <p>Currently, there is no information available in the Bird category. We are working to update our listings and provide you with the latest details. Please check back soon for new additions and updates!</p>
        </div>
        `;
        return;
    }
    else {
        petsCardContainer.classList.add("grid");
    }

    pets.forEach((pet) => {
        // console.log(pet);
        const card = document.createElement("div");
        card.classList = "card card-compact p-3 border-2 border-solid border-gray-300";
        card.innerHTML = `
        <figure>
            <img class="rounded-xl object-cover w-full h-full" src=${pet.image} alt="Image of a pet" />
        </figure>
        <div class="">
            <div class="mt-4">
              <h2 class="text-xl font-bold mb-2">${pet.pet_name}</h2>
              <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/bulldog.png" alt="bulldog">Breed: ${pet?.breed ? pet?.breed : "Breed is N/A"}</p>
              <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/ios/20/birth-date.png" alt="birth-date">Birth: ${pet?.date_of_birth ? pet?.date_of_birth : "Birth is N/A"}</p>
              <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="20" height="20" src="https://img.icons8.com/cotton/20/gender.png" alt="gender">Gender: ${pet?.gender ? pet?.gender : "Gender is N/A"}</p>
              <p class="flex gap-1 font-normal text-[#131313B3] mb-1"><img width="24" height="24" src="https://img.icons8.com/ios-glyphs/24/average-2.png" alt="average-2">Price : ${pet?.price ? pet?.price : "Price is N/A"}</p>
  
              <div class="grid grid-cols-3 gap-2 pt-3 border-t-2">
                  <button onclick="displayLikedPetImage('${pet.image}')" id="like-btn" class="btn px-0"><img width="25" height="25" src="https://img.icons8.com/material-outlined/25/facebook-like.png" alt="facebook-like"></button>
                  <button onclick="displayAdoptModal('petAdopt', ${pet.petId})" id="${pet.petId}" class="btn adopt-btn px-0 text-[#0E7A81]">Adopt</button>
                  <button onclick="loadDetails(${pet.petId})" id="details-btn" class="btn px-0 text-[#0E7A81]">Details</button>
              </div>
          </div>
        </div>
        `;
        petsCardContainer.append(card);
    });
};


const displayLikedPetImage = (url) => {
    const likedPetContainer = document.getElementById("liked-pet-container");
    const div = document.createElement("div");
    // div.classList.add("")
    div.innerHTML = `
     <img class="rounded-lg overflow-hidden h-full w-full" src=${url} alt="">
    `;
    likedPetContainer.appendChild(div);
}


// Create Display Catagories
const displayCatagories = (categories) => {
    const categoryContainer = document.getElementById("categories-btn");
    categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "flex lg:justify-between lg:items-center mb-8 gap-2 md:gap-4";
    buttonContainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="catagories-btn py-4 h-20 border-2 border-grey-300 font-extrabold text-xl hover:border-2 hover:border-secondaryColor hover:bg-userBorderColor w-full flex items-center justify-center gap-2 lg:px-16"><img class="object-cover h-full" src="${item.category_icon}" alt="">${item.category}</button>
    `;
    // Add Button to Container
    categoryContainer.append(buttonContainer);
    });

    // Create a Button 
};



loadCatagories();
loadAllPets();
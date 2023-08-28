const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')

    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden'); 
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // *display only first 12 phones if isShowAll is not true
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }


    for (const phone of phones) {
        // console.log(phone);
        // **1. Crate a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl px-2 py-4`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Phones" /></figure>
            <div class="card-body">
                <h2 class="font-bold text-xl text-gray-900 text-center">${phone.phone_name}</h2>
                <p class="text-center text-gray-500">There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="font-bold text-xl text-gray-900 text-center">$999</h2>
                <div class="card-actions justify-center">
                    <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneCard);
    }
    // ? Hide loading spinner
    toggleLoadingSpinner(false);
}

// *handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// *handle search recap button
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField2 = document.getElementById('search-field2');
//     const searchText2 = searchField2.value;
//     loadPhone(searchText2);
// }

// loading spinner section
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// *Handle show All button
const handleShowAll = () =>{
    handleSearch(true);
}


// Show Details Handler for each phone card
const showDetailsHandler = async (id) =>{
    // console.log(id);
    // load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}


// Show details 
const showPhoneDetails = (phone) =>{
    // show the modal
    show_details_modal.showModal();
    
    console.log(phone);

    const phoneDetails = document.getElementById('show-detail-container');
    phoneDetails.innerHTML = `
        <img class="w-1/2 mx-auto p-4 mb-3" src="${phone.image}" alt="" />
        <h3 id="phone-name" class="font-bold text-2xl text-left">${phone?.name}</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><span class="font-bold text-teal-600">Storage: </span> ${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold text-teal-600">Display Size: </span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold text-teal-600">Chipset: </span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold text-teal-600">Memory: </span> ${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold text-teal-600">Slug: </span> ${phone?.slug}</p>
        <p><span class="font-bold text-teal-600">Release data: </span> ${phone?.releaseDate}</p>
        <p><span class="font-bold text-teal-600">Brand: </span> ${phone?.brand}</p>
        <p><span class="font-bold text-teal-600">GPS: </span> ${phone?.others?.GPS}</p>
    `;
}

loadPhone();
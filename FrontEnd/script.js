let filterMethod = 0;

async function fetchCategories() {
    await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then(categoriesDisplay)
}    
function categoriesDisplay(data) {
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.innerHTML += data
    .map((category) => {
        return `
        <button class="btn-Sort" id="${category.id}">${category.name}</button>
        `
    })
    .join('')
}


async function fetchWorks() {
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then(projectsDisplay)
    .then(filterEvent)
    }    
function filterEvent() {
    const btnSort = document.querySelectorAll('.btn-Sort');
    btnSort.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            fetchWorks()
            filterMethod = parseInt(e.target.id);
            projectsDisplay()
        });
    });
}
function projectsDisplay(data) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = data
    .filter((work) => {
        if (filterMethod === 0) {
            return work
        } else {
            return work.category.id == filterMethod
        }
    })
    .map((work) => {
        return `
        <figure>
        <img src=${work.imageUrl} alt=${work.title} crossorigin="anonymous">
        <figcaption>${work.title}</figcaption>
        </figure>
        `
    })
    .join('')
}




fetchCategories();
fetchWorks();










// // if (btnSort.id !== filterMethod) {
    // //     btn.classList -= " active";
    // //     console.log(btnSort.id)
    // // } else if ((btnSort.id == filterMethod)) {
        //     btn.classList += " active";
        // // }
        // // btn.classList.remove(" active"); Enlever .active sur les autres boutons
        // worksDisplay();
        // if (filterMethod == 0) {
        //     return work
        // } else if (filterMethod == 1) {
        //     return work.category.id == 1
        // } else if (filterMethod == 2) {
        //     return work.category.id == 2
        // } else if (filterMethod == 3) {
        //     return work.category.id == 3;
        // }
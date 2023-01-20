let galleryData = [];
let filteredGalleryData = []

async function fetchCategories() {
    await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    for (let i = 0; i < data.length; i++) {
        const button = document.createElement("button");
        button.innerHTML = data[i].name
        button.setAttribute("id", data[i].id)
        button.classList.add("btn-Sort")
        const filterContainer = document.querySelector('.filter-container');
    	filterContainer.appendChild(button);
        }
    })
}    

async function fetchWorks() {
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => galleryData = data)
    .then((data) => projectsDisplay(data))
    .then(filterEvent)
    }  
function projectsDisplay(data) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.setAttribute("crossorigin", "anonymous");
        imageElement.setAttribute("src", data[i].imageUrl);
        imageElement.setAttribute("alt", data[i].title);
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = data[i].title;
        figure.appendChild(imageElement);
        figure.appendChild(titreElement);
        gallery.appendChild(figure)
    }
}

function filterEvent() {
    const btnSort = document.querySelectorAll('.btn-Sort');
    btnSort.forEach((btn) => {
        btn.addEventListener('click', (e) => {
        const filterMethod = parseInt(e.target.id);
        const filteredGalleryData = galleryData.filter(
          (work) => work.category.id === filterMethod
        );
        if (filterMethod == 0) {
          projectsDisplay(galleryData);
        } else {
          projectsDisplay(filteredGalleryData);
        }
      });
    })
  }

fetchCategories();
fetchWorks();
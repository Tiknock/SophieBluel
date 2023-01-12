let modal = null;
let item;
let works = []

async function getWorks() {
    await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => works = data)
    .then(page.vue1())
    console.log(works)
}
getWorks()
const openModal = function (e) {
    // openVue2();
    // console.log("openModal");
    console.log(works);
    e.preventDefault();
    // console.log(modal); // Note que #modal3 est modal donc ne ferme pas sinon tout est fermé (#vue1 et  #vue2)
    const target = document.querySelector(e.target.getAttribute('href'));
    // console.log(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', "true")
    modal = target
    // console.log(modal);
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    getWorks()
}

const utils = {
    pageContent: function(title, content, btn) {
        modal.querySelector("h1").innerHTML = title;
        modal.querySelector(".content").innerHTML = content;
        modal.querySelector(".btn-container").innerHTML = btn;
    }
}

const page = {
    vue1: function() {
        // getWorks()
        console.log(works);
        modal.querySelector(".content").className += " modal-gallery";
        modal.querySelector(".btn-container").className += " modal-gallery-btn";
        let mapArray = works
        .map((work) => 
         `
            <figure draggable="true" data-draggable="item">
            <img class="modal-gallery-img" src=${work.imageUrl} alt=${work.title} crossorigin="anonymous" class="modal-img">
            <div class="icons">
            <i class="fa-solid fa-up-down-left-right"></i>
            <i class="fa-solid fa-trash-can"></i>
            </div>
            <a href="" class="edit-item">éditer</a>
            </figure>
        `
            )
        .join("");       
        utils.pageContent(
            "Galerie photo",
            mapArray,
            `<a href="#vue2" class="js-modal" id="add-btn">Ajouter une photo</a> 
            <a href="#" id="delete-gallery">Supprimer la galerie</a>`
        );
        // utils.handleEventArrow();
        // utils.deleteItem();
        // reboot.addEventListener('click', () => utils.reboot());
        modal.getElementbyId("add-btn").addEventListener('click', () => this.vue2());
    },
    vue2: function() {
        utils.pageContent(
            "Ajout photo",
            `<div class="pic-add">
                <i class="fa-thin fa-image"></i>
                <button>+ Ajouter photo</button>
                <p>jpg, png: 4mo max</p>
            </div>
            <form id="add-form" action="#" method="post">
                <label for="title">Titre</label>
                <input type="text" name="title" id="title">
                <label for="category">Catégorie</label>
                <select name="category" id="category">
                    <option value="">--Choisir la catégorie--</option>
                    <option value="1">Objets</option>
                    <option value="2">Appartements</option>
                    <option value="3">Hôtels & restaurants</option>
                </select>
                <span class="line"></span>
                <input id="add-picture-btn" type="submit" value="Valider"><br>
            </form>`,
                null
        )
    },
    // finish: function() {
    //     utils.pageContent(
    //         "C'est terminé !",
    //         "<button id='start'>Recommencer</button>",
    //         "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fa fa-times-circle'></i></button>"
    //     );
    //     reboot.addEventListener('click', () => utils.reboot());
    //     start.addEventListener('click', () => this.routine());
    // },
}

const closeModal = function (e) {
    console.log("closeModal");
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    console.log("stopPropagation");
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})
// const previousModal = function(e) {

// }
// document.querySelector(".js-modal-previous").addEventListener("click", (e) => previousModal)





// Galerie drag&drop 

// document.addEventListener('dragstart', (e) => {
//     item = e.target.parentNode;
// })
// document.addEventListener('dragover', (e) => {
//     e.preventDefault();
// })
// document.addEventListener('drop', (e) => {
//     if(e.target.getAttribute("data-draggable") == "target") {
//         e.preventDefault();
//         e.target.appendChild(item)
//     }
// })

document.addEventListener('click', (e) => {
    console.log(e.target);
})
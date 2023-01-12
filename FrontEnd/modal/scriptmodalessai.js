const worksURL = "http://localhost:5678/api/works";
const bearer = `Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"`

let modal = null;
let item;
let works = []

async function getWorks() {
    await fetch(worksURL)
    .then((res) => res.json())
    .then((data) => works = data)
    .then(page.vue1())
    // console.log(works)
}
getWorks()
const openModal = function (e) {
    // openVue2();
    // console.log("openModal");
    // console.log(works);
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
    },
    // deleteItem: function() {
    //     document.querySelectorAll('.deleteBtn').forEach((btn) => {
    //         btn.addEventListener('click', (e) => {
    //             // const newArr = exerciceArray.filter((exo) => 
    //             //     exo.pic != e.target.dataset.pic
    //             // );
    //             // exerciceArray = newArr;
    //             // page.vue1();
    //         });
    //     });
    // },
    // store: function() {
    //     localStorage.exercices = JSON.stringify(exerciceArray);
    // }
}

const page = {
    vue1: function() {
        // getWorks()
        // console.log(works);

        modal.querySelector(".js-modal-previous").style.display = "none";
        modal.querySelector(".btn-container").className += (" modal-gallery-btn");
        modal.querySelector(".content").className += " modal-gallery";
        modal.querySelector(".content").classList.remove("vue2");
        let mapArray = works
        .map((work) => 
        `
        <figure draggable="true" data-draggable="item">
            <img class="modal-gallery-img" src=${work.imageUrl} alt=${work.title} crossorigin="anonymous" class="modal-img">
            <div class="icons">
            <i class="fa-solid fa-up-down-left-right"></i>
            <i class="fa-solid fa-trash-can deleteBtn" id="${work.id}"></i>
            </div>
            <a href="" class="edit-item">éditer</a>
            </figure>
            `
            )
        .join("");       
        utils.pageContent(
            "Galerie photo",
            mapArray,
            `<button class="js-modal" id="add-btn">Ajouter une photo</button> 
            <a href="#" id="delete-gallery">Supprimer la galerie</a>`
            );
            // utils.handleEventArrow();
            // utils.deleteItem();
            // reboot.addEventListener('click', () => utils.reboot());
            clickTrash()
            modal.querySelector("#add-btn").addEventListener('click', () => this.vue2());
        },
        vue2: function() {
        modal.querySelector(".js-modal-previous").style.display = null;
        modal.querySelector(".content").classList.remove("modal-gallery");
        modal.querySelector(".btn-container").classList.remove("modal-gallery-btn");
        modal.querySelector(".content").className += " vue2";
        utils.pageContent(
            "Ajout photo",
            `
            <input type="file" id="file" accept="image/*" hidden>
            <div class="img-area" data-img="">
                <i class="fa-regular fa-image"></i>
                </label>
                <input type="file" style="visibility:hidden" id="file" name="avatar" accept="image/png, image/jpeg" required>
                <button class="select-image">+ Ajouter photo</button>
                <p>jpg, png: 4mo max</p>
            </div>
            <form id="add-form" action="#" method="post">
                <label for="title">Titre</label>
                <input type="text" name="title" id="title" required>
                <label for="category">Catégorie</label>
                <select name="category" id="category" required>
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
 
        addPicture()
        modal.querySelector(".js-modal-previous").addEventListener('click', () => this.vue1())
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
    // console.log("closeModal");
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
    // console.log("stopPropagation");
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


// DELETE 
function clickTrash() {
    modal.querySelectorAll('.deleteBtn')
    .forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    let id = e.target.id;
                    deleteWork()
                    console.log(bearer);
                    function deleteWork() {
                        fetch(worksURL+"/"+id, {
                        method: "DELETE",
                        headers: {
                            'Authorization': bearer,
                            'Content-type': 'application/json'
                        },
                        body: null,
                        })
                        .then((res) => res.json())
                        .then((data) => confirm("Désirez-vous vraiment supprimer ce projet ?"));
                    }
                })
            })
    }


// ADD WORK
    // ADD PICTURE

    function addPicture() {
        const selectImage = document.querySelector(".select-image")
        const inputFile = document.querySelector("#file")
        const imgArea = document.querySelector('.img-area')
        
    selectImage.addEventListener('click', () => {
        inputFile.click();
    })

        inputFile.addEventListener('change', function () {
            const image = this.files[0]
            console.log(image);
            const reader = new FileReader()
            reader.onload = function () {
                console.log("yes");
                const imgUrl = reader.result;
                let img = document.createElement('img');
                img.src = imgUrl;
                console.log(img);
                console.log(reader);
                imgArea.appendChild(img)
                imgArea.className += ' active'
                imgArea.dataset.img = image.name
                img.className += ' img-add'
                console.log("finito");
            }
            reader.readAsDataURL(image)
        })
    }

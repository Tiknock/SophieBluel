const worksURL = "http://localhost:5678/api/works";
const token = localStorage.getItem("token");
let modal = null;
let works = []

import { fetchWorks, projectsDisplay } from './script.js'

const editBtnDisplay = () => {
const jsModal = document.querySelectorAll('.js-modal')
    if (token) {
        jsModal.forEach((btn) => { btn.style.visibility = "visible"; })
        document.querySelector("#banner").style.display = null
        document.querySelector("#login").style.display = "none"
        document.querySelector("#logout").style.display = null
        document.querySelector("header").style.margin = "100px auto"
        document.querySelector("#logout").addEventListener('click', (e) => {
            localStorage.removeItem('token');
            location.href = "index.html";
        })
    }
    else {
        document.querySelector("#login").style.display = null
        document.querySelector("#logout").style.display = "none"
        jsModal.forEach((btn) => { btn.style.visibility = "hidden"; })
        document.querySelector("#banner").style.display = "none"
        document.querySelector("header").style.margin = "50px auto"
    }
}
editBtnDisplay()

function getWorks() {
    fetch(worksURL)
        .then((res) => res.json())
        .then((data) => works = data)
}
getWorks()

const openModal = function (e) {
    e.preventDefault();
    const modal3 = document.querySelector('#modal3')
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    if (modal == modal3) {
        page.vue1()
    }
}

// Modale avec fonctionnalités et vues
// ---Fonctionnalités
const utils = {
    pageContent(title, content, btn) {
        modal.querySelector(".titlemodal").innerHTML = title;
        modal.querySelector(".content").innerHTML = content;
        modal.querySelector(".btn-container").innerHTML = btn;
    },
    deleteWork() {
        modal.querySelectorAll('.deleteBtn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                let workToDeleteId = e.target.id.slice(4);
                if (confirm("Désirez-vous vraiment supprimer ce projet ?") == true) {
                    fetch(worksURL + "/" + workToDeleteId, {
                        method: "DELETE",
                        headers: {
                            'Authorization': "Bearer " + token,
                            'Content-type': 'application/json'
                        },
                    })
                        .then(function (data) {
                            fetch(worksURL)
                                .then((res) => res.json())
                                .then(function (data2) {
                                    modal.querySelector(".js-modal-previous").style.display = "none";
                                    modal.querySelector(".btn-container").className += (" modal-gallery-btn");
                                    modal.querySelector(".content").className += " modal-gallery";
                                    modal.querySelector(".content").classList.remove("vue2");
                                    let mapArray = data2
                                        .map((work) =>
                                            `
                                <figure id="fig-${work.id}">
                                    <img class="modal-gallery-img" src=${work.imageUrl} alt=${work.title} crossorigin="anonymous" class="modal-img">
                                    <div class="icons">
                                        <button class="moveBtn"><i class="fa-solid fa-up-down-left-right"></i></button>
                                        <button type="button" class="deleteBtn"><i class="fa-solid fa-trash-can" id="dlt-${work.id}"></i></button>
                                    </div>
                                    <a class="edit-item" id="edit-${work.id}">éditer</a>
                                </figure>
                                    `
                                        )
                                        .join("");
                                    utils.pageContent(
                                        "Galerie photo",
                                        mapArray,
                                        `<button class="js-modal" id="add-btn">Ajouter une photo</button> 
                                    <a href="" id="delete-gallery">Supprimer la galerie</a>`
                                    );

                                    utils.deleteWork();
                                    utils.deleteAllWorks();
                                    modal.querySelectorAll(".edit-item").forEach(btn => {
                                        btn.addEventListener('click', (e) => {
                                            let workInd = e.target.id.slice(5);
                                            this.vue3(workInd);
                                        })
                                    })
                                    modal.querySelector("#add-btn").addEventListener('click', () => page.vue2());
                                })
                        })
                        .then(function (data) {
                            fetchWorks()
                            projectsDisplay()
                        })
                        .catch((err) => console.log(err));
                } else {
                    return
                }
            })
        })
    },
    deleteAllWorks() {
        modal.querySelector("#delete-gallery").addEventListener('click', (e) => {
            e.preventDefault()
            if (confirm("Désirez-vous vraiment supprimer tous les projets ?") == true) {
                fetch(worksURL)
                    .then((res) => res.json())
                    .then(function (data3) {
                        for (let i = 0; i < data3.length; i++) {
                            fetch(worksURL + "/" + data3[i].id, {
                                method: "DELETE",
                                headers: {
                                    'Authorization': "Bearer " + token,
                                    'Content-type': 'application/json'
                                },
                            })
                            .then(function (data) {
                                fetch(worksURL)
                                    .then((res) => res.json())
                                    .then(function (data2) {
                                        console.log(data)
                                        modal.querySelector(".js-modal-previous").style.display = "none";
                                        modal.querySelector(".btn-container").className += (" modal-gallery-btn");
                                        modal.querySelector(".content").className += " modal-gallery";
                                        modal.querySelector(".content").classList.remove("vue2");
                                        let mapArray = data2
                                        .map((work) =>
                                        `
                                        <figure id="fig-${work.id}">
                                            <img class="modal-gallery-img" src=${work.imageUrl} alt=${work.title} crossorigin="anonymous" class="modal-img">
                                        <div class="icons">
                                            <button class="moveBtn"><i class="fa-solid fa-up-down-left-right"></i></button>
                                            <button type="button" class="deleteBtn"><i class="fa-solid fa-trash-can" id="dlt-${work.id}"></i></button>
                                        </div>
                                        <a class="edit-item" id="edit-${work.id}">éditer</a>
                                        </figure>
                                        `
                                        )
                                        .join("");
                                        utils.pageContent(
                                        "Galerie photo",
                                        mapArray,
                                        `<button class="js-modal" id="add-btn">Ajouter une photo</button> 
                                        <a href="" id="delete-gallery">Supprimer la galerie</a>`
                                        );
                                        
                                        utils.deleteWork()
                                        modal.querySelectorAll(".edit-item").forEach(btn => {
                                            btn.addEventListener('click', (e) => {
                                                let workInd = e.target.id.slice(5);
                                                this.vue3(workInd);
                                            })
                                        })
                                        modal.querySelector("#delete-gallery").addEventListener('click', (e) => deleteAllWorks())
                                        modal.querySelector("#add-btn").addEventListener('click', () => page.vue2());
                                    })
                            })
                        }
                    })
                    .then(function (data) {
                        fetchWorks()
                        projectsDisplay()
                    })
                    .catch((err) => console.log(err));
            } else {
                return
            }
            console.log(token);

        })
    },
    addPicture() {
        const selectImage = document.querySelector(".select-image")
        const inputFile = document.querySelector("#file")
        const imgArea = document.querySelector('.img-area')

        selectImage.addEventListener('click', (e) => {
            e.preventDefault()
            inputFile.click();
        })

        inputFile.addEventListener('change', function () {
            const image = this.files[0]
            const reader = new FileReader()
            reader.onload = function () {
                const imgUrl = reader.result;
                let img = document.createElement('img');
                img.src = imgUrl;
                imgArea.appendChild(img)
                document.querySelector(".select-image").style.display = "none"
                document.querySelector(".img-area p").style.display = "none"
                document.querySelector(".fa-image").style.display = "none"
                imgArea.className += ' active'
                imgArea.className += ' after'
                imgArea.dataset.img = image.name
                img.setAttribute("id", "add-img")
            }
            reader.readAsDataURL(image)
        })
    },
    verifyForm() {
        const verifImg = modal.querySelector("#file")
        const verifTitle = modal.querySelector('#add-title')
        const select = modal.querySelector('#add-category')
        let verifOk = false
        modal.querySelector('#add-form').addEventListener('input', (e) => {
            verifOk = false
            if (select.selectedIndex < 1) {
                modal.querySelector("#add-picture-btn").classList.remove("verified")
                document.getElementById("erreur").innerHTML = "Veuillez ajouter une catégorie."
                verifOk = false
            }
            if (!verifTitle.value) {
                modal.querySelector("#add-picture-btn").classList.remove("verified")
                document.getElementById("erreur").innerHTML = "Veuillez ajouter un titre."
                verifOk = false
            }
            if (verifImg.value == "") {
                document.getElementById("erreur").innerHTML = "Veuillez ajouter une photo."
                modal.querySelector("#add-picture-btn").classList.remove("verified")
                verifOk = false
            } else if (verifImg.value !== "" && verifTitle.value && select.selectedIndex >= 1) {
                document.getElementById("erreur").innerHTML = "";
                modal.querySelector("#add-picture-btn").classList.add("verified")
                modal.querySelector("#add-picture-btn").classList.add("btn-effect")
                verifOk = true
            }
        })
        modal.querySelector('#add-form').addEventListener('submit', (e) => {
            e.preventDefault();
            if (verifOk == true) {
                utils.addWork()
                modal.querySelector("#add-picture-btn").classList.remove("verified")
                verifOk = false
            } else {
                alert("Veuillez vérifier les champs requis.")
            }
        })
    },
    fetchCategories() {
        fetch("http://localhost:5678/api/categories")
            .then((res) => res.json())
            .then((data) => {
                const categorySelect = modal.querySelector(".category")
                categorySelect.innerHTML += data
                    .map((category) => {
                        return `
            <option value="${category.id}">${category.name}</option>
            `
                    })
                    .join('')
            })
    },
    addWork() {
        const file = document.querySelector("#file");
        let image = file.files[0];
        let title = document.getElementById("add-title").value;
        let category = document.getElementById("add-category").value;
        category = parseInt(category)
        let formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('category', category);
        fetch(worksURL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: formData
        })
            .then(function (response) {
                alert("Votre projet a bien été ajouté !")
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                document.querySelector("#add-form").reset();
                const imgArea = document.querySelector('.img-area')
                const img = document.querySelector('#add-img')
                img.remove()
                document.querySelector(".select-image").style.display = null
                document.querySelector(".img-area p").style.display = null
                document.querySelector(".fa-image").style.display = null
                imgArea.dataset.img = ""
                imgArea.className -= ' active'
                imgArea.className -= ' after'
                imgArea.className += " img-area"
            })
            .then(function (data) {
                getWorks()
                page.vue1
                fetchWorks()
                projectsDisplay()
            })
    }
}

// ---Vues
const page = {
    vue1: function () {
        modal.querySelector(".js-modal-previous").style.display = "none";
        modal.querySelector(".btn-container").className += (" modal-gallery-btn");
        modal.querySelector(".content").className += " modal-gallery";
        modal.querySelector(".content").classList.remove("vue2");
        let mapArray = works
            .map((work) =>
                `
        <figure id="fig-${work.id}">
            <img class="modal-gallery-img" src=${work.imageUrl} alt=${work.title} crossorigin="anonymous" class="modal-img">
            <div class="icons">
                <button class="moveBtn"><i class="fa-solid fa-up-down-left-right"></i></button>
                <button type="button" class="deleteBtn"><i class="fa-solid fa-trash-can" id="dlt-${work.id}"></i></button>
            </div>
            <a class="edit-item" id="edit-${work.id}">éditer</a>
        </figure>
            `
            )
            .join("");
        utils.pageContent(
            "Galerie photo",
            mapArray,
            `<button class="js-modal btn-effect" id="add-btn">Ajouter une photo</button> 
            <a href="#" id="delete-gallery">Supprimer la galerie</a>`
        );

        utils.deleteWork();
        utils.deleteAllWorks();
        modal.querySelectorAll(".edit-item").forEach(btn => {
            btn.addEventListener('click', (e) => {
                let workInd = e.target.id.slice(5);
                this.vue3(workInd);
            })
        })
        modal.querySelector("#add-btn").addEventListener('click', () => this.vue2());
    },
    vue2: function () {
        modal.querySelector(".js-modal-previous").style.display = null;
        modal.querySelector(".content").classList.remove("modal-gallery");
        modal.querySelector(".btn-container").classList.remove("modal-gallery-btn");
        modal.querySelector(".content").className += " vue2";
        utils.pageContent(
            "Ajout photo",
            `
            <form id="add-form">
                <div class="img-area" data-img="">
                    <i class="fa-regular fa-image"></i>
                    <input type="file" style="display:none" id="file" name="file" accept="image/png, image/jpeg">
                    <a href="" class="select-image">+ Ajouter photo</a>
                    <p>jpg, png: 4mo max</p>
                </div>
                <label for="add-title">Titre</label>
                <input type="text" name="title" id="add-title">
                <label for="add-category">Catégorie</label>
                <select class="category" name="category" id="add-category">
                    <option value="">--Choisir la catégorie--</option>
                </select>
                <span class="line"></span>
                <button type="submit" id="add-picture-btn">Valider</button>
            </form>
            <p style="color:red" id="erreur"></p>`,
            null
        )
        utils.fetchCategories()
        utils.addPicture()
        utils.verifyForm()

        modal.querySelector(".js-modal-previous").addEventListener('click', () => {
            this.vue1()
        })
    },
    vue3: function (workInd) {
        modal.querySelector(".js-modal-previous").style.display = null;
        modal.querySelector(".content").classList.remove("modal-gallery");
        modal.querySelector(".btn-container").classList.remove("modal-gallery-btn");
        modal.querySelector(".content").className += " vue2";



        let thisWork = works
            .filter((work) => {
                if (work.id == workInd) {
                    utils.fetchCategories()
                    return work
                }
            })
            .map((work) =>
                `
        <form id="edit-form">
            <div class="img-area after" data-img="">
                <img class="modal-gallery-img" src=${work.imageUrl} alt="${work.title}" crossorigin="anonymous" class="modal-img">
            </div>
            <label for="edit-title">Titre</label>
            <input type="text" name="title" id="edit-title" value="${work.title}">
            <label for="edit-category">Catégorie</label>
            <select class="category" name="category" id="edit-category">
                <option value="">--Choisir la catégorie--</option>
            </select>
            <span class="line"></span>
            <button class="btn-effect verified" type="submit" id="edit-picture-btn">Valider</button>
            </form>`
            )

        utils.pageContent(
            "Editer photo",
            thisWork,
            null
        )

        modal.querySelector(".js-modal-previous").addEventListener('click', () => this.vue1())
    },
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    window.setTimeout(function () {
        modal.style.display = "none";
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})
const worksURL = "http://localhost:5678/api/works";
const token = localStorage.getItem("token");
const jsModal = document.querySelectorAll('.js-modal')
const modal3 = document.querySelector('#modal3')
let modal = null;
let item;
let works = []

const editBtnDisplay = () => {
    if (token) {
        jsModal.forEach((btn) => {btn.style.visibility = "visible";})
    }
    else {
        jsModal.forEach((btn) => {btn.style.visibility = "hidden";})
    }
}
editBtnDisplay()


async function getWorks() {
    await fetch(worksURL)
    .then((res) => res.json())
    .then((data) => works = data)
}
getWorks()

async function getIndWorks(id) {
    await fetch(worksURL + "/" + id)
    .then((res) => res.json())
    .then((data) => work = data)
}


const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', "true")
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    if (modal == modal3) {
        page.vue1()
        // getWorks()
    }
    // getWorks()
}

// Modale avec fonctionnalités et vues
// ---Fonctionnalités
const utils = {
    pageContent(title, content, btn) {
        modal.querySelector("h1").innerHTML = title;
        modal.querySelector(".content").innerHTML = content;
        modal.querySelector(".btn-container").innerHTML = btn;
    },
    deleteWorks() {
        modal.querySelectorAll('.deleteBtn').forEach((btn) => {btn.addEventListener('click', (e) => {
            // Rafraichissement de la page que je ne comprends pas
            e.preventDefault()
            let id = e.target.id;
            if (confirm("Désirez-vous vraiment supprimer ce projet ?") == true) {
                fetch(worksURL+"/"+id, {
                    method: "DELETE",
                    headers: {
                        'Authorization': "Bearer " + token,
                        'Content-type': 'application/json'
                    },
                    body: null,
                })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
            } else {
                return
            }
            console.log(token);
            })
        }
    )},
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
            console.log(image);
            const reader = new FileReader()
            reader.onload = function () {
                const imgUrl = reader.result;
                let img = document.createElement('img');
                img.src = imgUrl;
                console.log(img);
                console.log(reader);
                imgArea.appendChild(img)
                document.querySelector(".select-image").style.display = "none"
                document.querySelector(".img-area p").style.display = "none"
                document.querySelector(".fa-image").style.display = "none"
                imgArea.className += ' active'
                imgArea.className += ' after'
                imgArea.dataset.img = image.name
                img.className += ' img-add'
                img.setAttribute("id","add-img")
            }
            reader.readAsDataURL(image)
        })
    },
    fetchCategories() {
        fetch("http://localhost:5678/api/categories")
        .then((res) => res.json())
        .then((data)=> {
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
                // 'Content-type': 'multipart/form-data'
            },
            body: formData
        })
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        }, function (rejectionReason) { // 3
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
            .then(function (bodyText) {
                console.log('Received the following instead of valid JSON:', bodyText); // 6
            });
        });
    }
}

// ---Vues
const page = {
    vue1: function() {
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
                <button class="moveBtn"><i class="fa-solid fa-up-down-left-right"></i></button>
                <button type="button" class="deleteBtn"><i class="fa-solid fa-trash-can" id="${work.id}"></i></button>
            </div>
            <a class="edit-item" id="${work.id}">éditer</a>
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
            
            utils.deleteWorks()
            console.log("fin vue1");
            document.addEventListener("click", (e) => console.log(e))
            modal.querySelectorAll(".edit-item").forEach(btn => {btn.addEventListener('click', (e) => {
                let workInd = e.target.id;
                this.vue3(workInd);
            })})
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
            </form>`,
                null
        )
        utils.fetchCategories()

        const verifImg = modal.querySelector('#add-img')
        const verifTitle = modal.querySelector('#add-title').value
        const select = modal.querySelector('#add-category')
        const verifCategory = select.options[select.selectedIndex].value
        
        utils.addPicture()
        modal.querySelector('#add-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // if (verifImg && verifTitle !== "" && verifCategory !== "") {
                utils.addWork()
            // } else if (!verifImg) {
            //     alert("Veuillez ajouter une image.")
            //     return false
            // } else if (verifTitle == "") {
            //     alert("Veuillez ajouter un titre.")
            //     return false
            // } else if (verifCategory == ""){
            //     alert("Veuillez indiquer une catégorie.")
            //     return false
            // }
        })
        modal.querySelector(".js-modal-previous").addEventListener('click', () => this.vue1())
    },
        vue3: function(workInd) {
            console.log(workInd);
            
        modal.querySelector(".js-modal-previous").style.display = null;
        modal.querySelector(".content").classList.remove("modal-gallery");
        modal.querySelector(".btn-container").classList.remove("modal-gallery-btn");
        modal.querySelector(".content").className += " vue2";
            

        let thisWork = works
        .filter((work) => {
            if (work.id == workInd) {
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
            <button type="submit" id="edit-picture-btn">Valider</button>
        </form>`)
        // getIndWorks(id) 


        utils.pageContent(
            "Editer photo",
            thisWork,
            null
        )
        
        utils.fetchCategories()
        // modal.querySelector('#add-picture-btn').addEventListener('click', (e) => editWork())
        modal.querySelector(".js-modal-previous").addEventListener('click', () => this.vue1())
    },
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
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})


document.addEventListener('click', (e) => {
    console.log(e.target);
})
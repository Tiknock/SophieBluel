const worksURL = "http://localhost:5678/api/works";
const token = localStorage.getItem("token");
const jsModal = document.querySelectorAll('.js-modal')
console.log(token)
let modal = null;
let item;
let works = []

const editBtnDisplay = () => {
    if (token) {
        console.log(jsModal);
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
    .then(page.vue1())
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
    getWorks()
}

// Modale avec fonctionnalités et vues
// ---Fonctionnalités
const utils = {
    pageContent: function(title, content, btn) {
        modal.querySelector("h1").innerHTML = title;
        modal.querySelector(".content").innerHTML = content;
        modal.querySelector(".btn-container").innerHTML = btn;
    },
    deleteWorks(id) {
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
    },
    addPicture() {
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
                img.setAttribute("id","add-img")
                console.log("finito");
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
            <button type="submit" class="deleteBtn"><i class="fa-solid fa-trash-can" id="${work.id}"></i></button>
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
            // utils.handleEventArrow();
            console.log("fin vue1");
            document.addEventListener("click", (e) => console.log(e))
            modal.querySelectorAll(".edit-item").forEach(btn => {btn.addEventListener('click', (e) => {
                let workInd = e.target.id;
                this.vue3(workInd);
            })})
            modal.querySelectorAll('.deleteBtn').forEach((btn) => {btn.addEventListener('click', (e) => {e.preventDefault(); let id = e.target.id; utils.deleteWorks(id)})})
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
                <div class="img-area" data-img="">
                    <i class="fa-regular fa-image"></i>
                    <input type="file" style="visibility:hidden" id="file" name="file" accept="image/png, image/jpeg" required>
                    <button class="select-image">+ Ajouter photo</button>
                    <p>jpg, png: 4mo max</p>
                </div>
                <label for="add-title">Titre</label>
                <input type="text" name="title" id="add-title" required>
                <label for="add-category">Catégorie</label>
                <select class="category" name="category" id="add-category" required>
                    <option value="">--Choisir la catégorie--</option>
                </select>
                <span class="line"></span>
                <button id="add-picture-btn">Valider</button>`,
                null
        )
        
        utils.fetchCategories()
        utils.addPicture()
        modal.querySelector('#add-picture-btn').addEventListener('click', (e) => addWork())
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
        // .filter((work) => {

        // })
        .map((work) => 
        `
        <input type="file" id="file" accept="image/*" hidden>
        <form id="edit-form" action="#" method="post">
            <div class="img-area" data-img="">
                <img class="modal-gallery-img" src=${work.imageUrl} alt="${work.title}" crossorigin="anonymous" class="modal-img">
            </div>
            <label for="edit-title">Titre</label>
            <input type="text" name="title" id="edit-title" value="${work.title}" required>
            <label for="edit-category">Catégorie</label>
            <select class="category" name="category" id="edit-category" required>
                <option value="">--Choisir la catégorie--</option>
            </select>
            <span class="line"></span>
            <input id="edit-picture-btn" type="submit" value="Valider"><br>
        </form>`)
        // getIndWorks(id) 


        utils.pageContent(
            "Editer photo",
            thisWork,
            null
        )
        
        fetchCategories()
        // modal.querySelector('#add-picture-btn').addEventListener('click', (e) => addworky())
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

// ADD WORK
    function addWork() {
        convertToBinary()
        function convertToBinary() {
            const getBase64StringFromDataURL = (dataURL) => dataURL.replace('data:', '').replace(/^.+,/, '');
            const image = document.querySelector('#add-img');
        console.log(image)
            const toDataURL = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                const dataURL = canvas.toDataURL();
                console.log(dataURL);
                const base64 = getBase64StringFromDataURL(dataURL);
                console.log(base64);
                postWork(base64)
            }
            if (image.complete) toDataURL(image);
            else image.onload = toDataURL;
        }
        async function postWork(base64) {
            addworky(base64)
            function getWorkSub(base64) {
                let image = base64
                let title = document.getElementById("add-title").value;
                let category = document.getElementById("add-category").value;
                category = parseInt(category)
                let formData = new FormData();
                formData.append('image', image);
                formData.append('title', title);
                formData.append('category', category);
                console.log(typeof(category));
                // console.log(workSub)
                return formData;
            }   

            function addworky() {
                let formData = getWorkSub(base64);
                console.log([...formData]);
                console.log(JSON.stringify(formData));
                fetch(worksURL, {
                method: "POST",
                headers: {
                    // 'Accept': 'application/json',
                    'Authorization': "Bearer " + token,
                    // 'Content-type': 'multipart/form-data'
                },
                body: JSON.stringify(formData)
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
    }


    document.addEventListener('click', (e) => {
        console.log(e.target);
    })
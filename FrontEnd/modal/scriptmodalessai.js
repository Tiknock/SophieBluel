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

const utils = {
    pageContent: function(title, content, btn) {
        modal.querySelector("h1").innerHTML = title;
        modal.querySelector(".content").innerHTML = content;
        modal.querySelector(".btn-container").innerHTML = btn;
    },
    deleteWorks: function clickTrash() {
        modal.querySelectorAll('.deleteBtn')
        .forEach((btn) => {
            btn.addEventListener('click', (e) => {
            let id = e.target.id;
            if (confirm("Désirez-vous vraiment supprimer ce projet ?") == true) {
                deleteWork()
              } else {
                return
              }
            console.log(token);
                function deleteWork() {
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
                }
            })
        })
    }
}

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
            <i class="fa-solid fa-up-down-left-right"></i>
            <i class="fa-solid fa-trash-can deleteBtn" id="${work.id}"></i>
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
            <form id="add-form" method="post">
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
                <input id="add-picture-btn" type="submit" value="Valider"><br>
            </form>`,
                null
        )
        
        fetchCategories()
        addPicture()
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

//CATEGORY
async function fetchCategories() {
    await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then(categoriesDisplay)
}    
function categoriesDisplay(data) {
    const categorySelect = modal.querySelector(".category")
    categorySelect.innerHTML += data
    .map((category) => {
        return `
        <option value="${category.id}">${category.name}</option>
        `
    })
    .join('')
}


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
                img.setAttribute("id","add-img")
                console.log("finito");
            }
            reader.readAsDataURL(image)
        })
    }

    

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
                const workSub = {
                    image: image,
                    title: title,
                    category: category
                }
                console.log(workSub)
                return workSub;
            }   
            function addworky() {
                let workSub = getWorkSub(base64);
                fetch(worksURL, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + token,
                    'Content-type': 'multipart/form-data'
                },
                body: JSON.stringify(workSub)
                })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
            }
        }
    }


    document.addEventListener('click', (e) => {
        console.log(e.target);
    })





// AVEC FORMDATA

             // console.log(base64);
            // // let image = document.querySelector("#add-img").src;
            // let title = document.getElementById("add-title").value;
            // let category = document.getElementById("add-category").value;
            // category = parseInt(category)
            // let formData = new FormData();
            // formData.append('image', base64);
            // formData.append('title', title);
            // formData.append('category', category);
            // console.log(formData);
            //     fetch(worksURL, {
            //     method: "POST",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Authorization': "Bearer " + token,
            //         'Content-type': 'multipart/form-data'
            //     },
            //     body: formData
            //     })
            //     .then((res) => console.log(res))
            //     .then((res) => res.json())
            //     .then((data) => console.log(data))
            //     .catch((err) => console.log(err));
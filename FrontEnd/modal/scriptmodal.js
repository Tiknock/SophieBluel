const vue1 = document.getElementById('vue1')
const vue2 = document.getElementById('vue2')
const modal3 = document.getElementById('modal3')
let modal = null;
let item;

const openVue1 = function () {
    modal = "modal3"

    modal3.style.display = null;
    modal3.removeAttribute('aria-hidden')
    modal3.setAttribute('aria-modal', "true")

    vue1.style.display = null;
    vue1.removeAttribute('aria-hidden')
    vue1.setAttribute('aria-modal', "true")
    
    if (vue2.style.display = "none") {
        modal3.addEventListener('click', closeModal)
        modal3.querySelector('.js-modal-close').addEventListener('click', closeModal)
        document.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    }
}
const openVue2 = function () {
    vue1.style.display = "none";
    vue1.setAttribute('aria-hidden', "true")
    vue1.removeAttribute('aria-modal')

    vue2.style.display = null;
    vue2.removeAttribute('aria-hidden')
    vue2.setAttribute('aria-modal', "true")


    vue2.addEventListener('click', closeModal)
    vue2.querySelector('.js-modal-close').addEventListener('click', closeModal)
    document.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modal = "vue2"
}

const closeModal = function (e) {
    console.log("close :" + modal);
    e.preventDefault();
    modal3.style.display = "none";
    modal3.setAttribute('aria-hidden', 'true')
    modal3.removeAttribute('aria-modal')
    document.removeEventListener('click', closeModal)
    document.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    document.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
}

const stopPropagation = function (e) {
    console.log("propa :" + e.target );
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', (e) => {
        if (e.target.getAttribute('href') == "#modal3"){
            openVue1()
        }
        else if (e.target.getAttribute('href') == "#vue2") {
            openVue2()
        }
    })
})
const previousModal = function(e) {
    openVue1()
}
document.querySelector(".js-modal-previous").addEventListener("click", (e) => previousModal)








const modalGallery = document.querySelector('.modal-gallery');

async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => works = data)
        // console.log(works);
    }

async function worksDisplay() {
    await getWorks();
    modalGallery.innerHTML = works
        .map((work) => {
            return `
            <figure draggable="true" data-draggable="item">
                <img src=${work.imageUrl} alt=${work.title} crossorigin="anonymous" class="modal-img">
                <div class="icons">
                <i class="fa-solid fa-up-down-left-right"></i>
                <i class="fa-solid fa-trash-can"></i>
                </div>
                <a href="" class="edit-item">éditer</a>
            </figure>
            `
        })
        .join('')
}
worksDisplay()


document.addEventListener('dragstart', (e) => {
    item = e.target.parentNode;
})
document.addEventListener('dragover', (e) => {
    e.preventDefault();
})
document.addEventListener('drop', (e) => {
    if(e.target.getAttribute("data-draggable") == "target") {
    e.preventDefault();
    e.target.appendChild(item)
    }
})


// const utils = {
//     pageContent: function(title, content, btn) {
//         document.querySelector("h1").innerHTML = title;
//         main.innerHTML = content;
//         document.querySelector(".btn-container").innerHTML = btn;
//     },
// }


// const page = {
//     lobby: function() {
        
//         let mapArray = exerciceArray
//         .map((exo) => 
//             `
//             <li>
//                 <div class='card-header'>
//                     <input type='number' id=${exo.pic} min='1' max='10' value=${exo.min}>
//                     <span>min</span>
//                 </div>
//                 <img src='./img/${exo.pic}.png' />
//                 <i class='fas fa-arrow-alt-circle-left arrow' data-pic=${exo.pic}></i>
//                 <i class='fas fa-times-circle deleteBtn' data-pic=${exo.pic}></i>
//             </li>
//             `
//             )
//         .join("");       
//         utils.pageContent(
//             "Paramétrage <i id='reboot' class ='fas fa-undo'></i>", 
//             "<ul>" + mapArray + "/ul", 
//             "<button id='start'>Commencer<i class='far fa-play-circle'></i></button>"
//         );
//         utils.handleEventMinutes();
//         utils.handleEventArrow();
//         utils.deleteItem();
//         reboot.addEventListener('click', () => utils.reboot());
//         start.addEventListener('click', () => this.routine());
//     },
//     routine: function() {
//         const exercice = new Exercice();

//         utils.pageContent(
//             "Routine",
//             exercice.updateCountdown(),
//             null
//         )
//     },
//     finish: function() {
//         utils.pageContent(
//             "C'est terminé !",
//             "<button id='start'>Recommencer</button>",
//             "<button id='reboot' class='btn-reboot'>Réinitialiser <i class='fa fa-times-circle'></i></button>"
//         );
//         reboot.addEventListener('click', () => utils.reboot());
//         start.addEventListener('click', () => this.routine());
//     },
// }

// page.lobby()
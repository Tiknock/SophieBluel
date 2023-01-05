let modal = null;
let item;

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
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true')
    target.removeAttribute('aria-modal')
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


const modalGallery = document.querySelector('.modal-gallery');

async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => works = data)
        console.log(works);
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
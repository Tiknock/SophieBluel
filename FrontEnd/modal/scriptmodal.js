const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', "true")
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
            <figure>
                <img src=${work.imageUrl} alt=${work.title} crossorigin="anonymous">
                <p>éditer</p>
            </figure>
            `
        })
        .join('')
}
worksDisplay()

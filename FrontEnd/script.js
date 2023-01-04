const gallery = document.querySelector('.gallery');
const btnSort = document.querySelectorAll('.btn-Sort');
let filterMethod = 0;


async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => works = data)
        console.log(works);
    }

async function worksDisplay() {
    await getWorks();
    gallery.innerHTML = works
        .filter((work) => {
            if (filterMethod == 0) {
                return work
            } else if (filterMethod == 1) {
                return work.category.id == 1
            } else if (filterMethod == 2) {
                return work.category.id == 2
            } else if (filterMethod == 3) {
                return work.category.id == 3;
            }
        })
        .map((work) => {
            return `
            <figure>
                <img src=${work.imageUrl} alt=${work.title} crossorigin="anonymous">
				<figcaption>${work.title}</figcaption>
            </figure>
            `
        })
        .join('')
}
worksDisplay()

btnSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        filterMethod = e.target.id;
        // if (btnSort.id !== filterMethod) {
        //     btn.classList -= " active";
        //     console.log(btnSort.id)
        // } else if ((btnSort.id == filterMethod)) {
            btn.classList += " active";
        // }
        // btn.classList.remove(" active"); Enlever .active sur les autres boutons
        worksDisplay();
    });
});

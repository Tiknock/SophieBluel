const gallery = document.querySelector('.gallery')

async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => works = data)
        console.log(works);
    }

async function worksDisplay() {
    await getWorks();
    gallery.innerHTML = works
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

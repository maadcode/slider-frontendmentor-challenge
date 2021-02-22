function getData() {
    const slider = document.querySelector('.slider')
    const fragment = document.createDocumentFragment()

    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', 'data.json', true )
    xhttp.send()
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            data.forEach((item) => {
                const slide = document.createElement('div')
                slide.classList.add('slide')
                slide.innerHTML = `
                    <div class="img-container">
                        <img src=${item.image} alt=${item.name} class="profile">
                    </div>
                    <div class="text-container">
                        <blockquote class="comment">" ${item.comment} "</blockquote>
                        <div class="data-author">
                            <span class="name">${item.name}</span>
                            <span class="position">${item.position}</span>
                        </div> 
                    </div>
                `
                fragment.appendChild(slide)
            })
            slider.appendChild(fragment)
            sliderDisplay()
        }
    }
}

function sliderDisplay() {
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slides = document.querySelectorAll('.slide');
    
    let index = 0;
    
    const displaySlide = (index) => {
        slides.forEach((slide) => {
            slide.style.display = 'none';
        });
        slides[index].style.display = 'flex';
    };
    
    const nextSlide = () => {
        index++;
        if (index > slides.length - 1) {
            index = 0;
        }
        displaySlide(index);
    };
    
    const prevSlide = () => {
        index--;
        if (index < 0) {
            index = slides.length - 1;
        }
        displaySlide(index);
    };
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    displaySlide(index);
}

getData()
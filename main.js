let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let lightsaber = document.querySelector('#lightsaber');
let collapse = document.querySelector(`#collapse`);
let check = false;



window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    
    if(scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');
        navbar.style.height= '70px';
        links.forEach((link)=>{
            link.style.color = 'var(--black)';
        });
    }else{
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-yellow');
        collapse.classList.add('bg-black');
        collapse.classList.remove('bg-yellow');
        navbar.style.height= '140px';
        links.forEach((link)=>{
            link.style.color = 'var(--yellow)';
        });
    }
});


lightsaber.addEventListener('click', ()=>{
    if(check == false){
        lightsaber.style.transform = `rotate(-90deg)`
        check = true;
    }else{
        lightsaber.style.transform = `rotate(0deg)` 
        check = false;
    }
});


// Chiamate Asincrone:
// setInterval(): crea un ciclo infinito
// clearInterval():
// setTimeout():

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

let confirm = true;

function createInterval(n, element, time){
    let counter = 0;
    
    let interval = setInterval(()=>{
        if(counter < n){
            counter++
            element.innerHTML = counter;
        }else{
            console.log('Adesso mi fermo');
            clearInterval(interval)
        }
    }, time);
    
    setTimeout(()=>{
        confirm = true;
    }, 8000);
}





// IntersectionObserver.

let observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm){
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);  
            confirm = false; 
        } 
    });
    
});

observer.observe(firstNumber);

let reviews = [
    {
        "id":1,
        "name": "Giulia",
        "rank": 3,
        "description" : "Mi piace Anna Pepe"
    },
    {
        "id": 2,
        "name": "Gabriele",
        "rank": 5,
        "description" : "Sito fantastico"
    },
    {
        "id": 3,
        "name": "Arianna",
        "rank": 4,
        "description" : "Wow che bello Star Wars"
    },
    {
        "id": 4,
        "name": "Lorenzo",
        "rank": 2,
        "description" : "Preferivo il Fubbe"
    },
]

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((recensione)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="card-review">
                <p class="lead text-center">${recensione.description}</p>
                <p class="h4 text-center">${recensione.name}</p>
                <div class="d-flex justify-content-center star">
                
                </div>
              </div>
              `;
              swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');

// <i class="fa-solid fa-star"></i>

stars.forEach((star, index)=>{
     for(let i = 1; i <= reviews[index].rank; i++){
         let icon = document.createElement('i');
         icon.classList.add('fa-solid', 'fa-star');
         star.appendChild(icon);
     }

     let difference = 5 - reviews[index].rank;

     for(let i = 1; i <= difference; i++){
         let icon = document.createElement('i');
         icon.classList.add('fa-regular', 'fa-star');
         star.appendChild(icon);
     }
});


// Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    loop: true,
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 2000,
    },
    
});
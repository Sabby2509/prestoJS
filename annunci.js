

fetch('./annunci.json').then((response)=> response.json()).then((data)=>{
    data.sort((a, b) => a.price - b.price);


    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');


     
    
    
    
    function radioCreate(){
        let categories = data.map((annuncio)=> annuncio.category );
        
        //    let uniqueCategories = [];
        
        //    categories.forEach((category)=>{
            //     if( !uniqueCategories.includes(category) ){
        //         uniqueCategories.push(category)
        //     }
        //    });
        
        
        let uniqueCategories = Array.from(new Set(categories));
        
        uniqueCategories.forEach((category)=>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
           <input class="form-check-input" type="radio" name="categories" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
           `;
           radioWrapper.appendChild(div);
        });
        
        
    }
    
    radioCreate();
    
    function truncateWord(string){
       if(string.lenght > 15){
           return string.split('')[0] + '...';
       }else{
        return string;
       }
    }
    
    function showCards(array){
        cardWrapper.innerHTML = '';
        array.forEach( (annuncio, i)=> {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
            <img src="https://picsum.photos/${300 + i}" alt="Immagine Casuale" class="img-fluid img-card">
            <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
            <p class="h4">${annuncio.category}</p>
            <p class="lead">${annuncio.price}€</p>
            `;
            cardWrapper.appendChild(div);
        });
    }
    
    showCards(data);


    function filterByCategory(categoria){
        if(categoria != 'All'){
            let filtered = data.filter((annuncio)=>annuncio.category == categoria);
            showCards(filtered);

        }else{
            showCards(data);
        }
        
    }

    
    let radioButtons = document.querySelectorAll('.form-check-input');

    radioButtons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            filterByCategory(button.id);
        }) 
    });

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

 
    function setPriceInput(){
        let prices = data.map((annuncio)=> +annuncio.price);
        prices.sort((a, b)=>a - b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }

    setPriceInput();

    function filterByPrice(){
        let filtered = data.filter((annuncio)=> +annuncio.price <= priceInput.value);
        showCards(filtered);
        
    }

    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value
        filterByPrice();
    });

    let wordInput = document.querySelector('#wordInput');
    function filterByWord(parola){
        let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(parola.toLowerCase()));
        showCards(filtered);
        
    }

    wordInput.addEventListener('input', ()=>{
        filterByWord(wordInput.value);
    })

});




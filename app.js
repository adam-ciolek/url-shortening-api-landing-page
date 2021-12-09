
const btn = document.querySelector('.btn-submit');
const linkShorten = document.querySelector('.shorten-link');
const error = document.querySelector('.error');
const inputShortLink = document.querySelector('.input') 

btn.addEventListener('click', () => {
    const input = document.querySelector('.input').value;
    
    const url = `https://api.shrtco.de/v2/shorten?url=${input}`
    
    fetch(url)
        .then(response => response.json())
        .then(data => show(data , input))
      
})
    
const show = (data , input) => {

    if(input === '') {
        error.innerHTML = 'Please add the link'
        error.style.color= 'red'
        inputShortLink.style.border = '3px solid red'
        inputShortLink.classList.add('is')
        return
    }

    const div = document.createElement('div');
    
    div.innerHTML = 
    `
        <div class="display-f justify-space-between bg-white a mb-2">
            <div>
                <p class="font-lg">${input}</p>
            </div>
            <div class="display-f align-item-center">
                <p class="font-lg text-primary mr-4 link" id="${data.result.code}">${data.result.full_short_link}</p>
                <button class="b" onclick="copyLink(this.getAttribute('data-target'))" data-target ="${data.result.code}">Copy</button>
            </div>
        </div>
    `
    linkShorten.appendChild(div)  

    error.innerHTML = ''
    inputShortLink.style.border = ''
    inputShortLink.classList.remove('is')
}

// Copy link

const copyLink = target => {

   var copy = document.getElementById(target);

    const btn = document.querySelector('.b')

   navigator.clipboard.writeText(copy.innerHTML);
    
    if(target === copy.id) {
        btn.innerHTML = 'Copied';
        btn.style.backgroundColor = 'hsl(255, 11%, 22%)';
    }

}
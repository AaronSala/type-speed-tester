const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quotes= document.querySelector('.quote-display');
const quoteInput = document.querySelector('.quote-input')
const timer = document.querySelector('.timer')

quoteInput.addEventListener('input', ()=>{
  const ArrayQuote= quotes.querySelectorAll('span') 
  const arrayValue= quoteInput.value.split('')

  let correct=true
  ArrayQuote.forEach((characterSpan, index)=>{
    const character=arrayValue[index]
    if(character == null){
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct=false
    }
    else if(character === characterSpan.innerText){
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
        
    }
    else{
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct=false
    }
  })
  if(correct) renderNewQuote()
})

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(res =>res.json())
    .then(data=>data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote()
    
    quotes.innerHTML=''
    quote.split('').forEach(character => {
        const characterSpan=document.createElement('span')
        //characterSpan.classList.add('correct')
        characterSpan.innerText = character
        quotes.appendChild(characterSpan)
    });
    quoteInput.value=null
    startTimer()
}
let startTime
function startTimer(){
    timer.innerText=0
    startTime=new Date()
    setInterval(() =>{
     timer.innerText= getTimerTime()
    }, 1000)
}
function getTimerTime (){
    return Math.floor((new Date()-startTime)/1000)
}

renderNewQuote()


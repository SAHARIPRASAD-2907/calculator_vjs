//Get Quotes from API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
//show New Quote
// const newQuote=()=>{
//     const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)]
//     console.log(quote);
// }

//Loading spinner shower
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }

//Remove Loading spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }


const newQuote=()=>{
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    // Check if Author field is blank and replace it with "Unknown"
    if(!quote.author){
        authorText.textContent = "Unknown";
    }
    else{
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length>50){
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
    
}

async function getQuotes(){
    loading()
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        
    }catch(error){
        
        //Catch Error Here
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.innerText}`;
    console.log(twitterUrl);
    window.open(twitterUrl, '_blank');
  }
  
  // Event Listeners
  newQuoteBtn.addEventListener('click',newQuote);
  twitterBtn.addEventListener('click',tweetQuote );
  
  // On Load
  //loading()
  getQuotes()

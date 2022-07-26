const api="https://api.quotable.io/random";

const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("name")
const button = document.getElementById("new-quote");
const tweetQuote =document.getElementById("tweet-quote");
const speechBtn=document.getElementById("speech-btn");
const copyBtn = document.querySelector(".copy");
const synth = speechSynthesis;


//function for new quote
function getQuote(){
  button.classList.add("loading");
    button.innerHTML = "Loading Quote...";
 fetch(api).then((res) => res.json())
    .then((data) => {
      quoteText.innerHTML = `"${data.content}"`;
      quoteAuthor.innerHTML = `- ${data.author}`;
      console.log(data);
 button.classList.remove("loading");
    button.innerHTML = "New Quote";
    }).catch(function(){
    console.log("The request generated an error.")
  });
}


//function for tweeting quote
function tweetQuoteText(){
 let tweet = encodeURI(`http://twitter.com/intent/tweet?text=${quoteText.innerHTML}-${quoteAuthor.innerHTML}`);
 window.open(tweet,'_blank');
}


//function for speech button
speechBtn.addEventListener("click", ()=>{
    if(!button.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${quoteAuthor.innerHTML}`);
       synth.speak(utterance);
         setInterval(()=>{
           return !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});
//function to copy text to clipboard
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerHTML);
});

button.addEventListener("click", getQuote);
tweetQuote.addEventListener("click",tweetQuoteText);
import playList from './playList.js';


function showTime() {
    document.querySelector('.time').textContent = new Date().toLocaleTimeString()
    setTimeout(showTime, 1000)
    showDate()
    showGreeting()
}

showTime()

function showDate() {
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    document.querySelector('.date').textContent = new Date().toLocaleDateString('en-US', options)
    setTimeout(showTime, 1000)
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 4 && hours < 12){
        return 'Morning';
    }else if (hours >= 12 && hours < 16){
        return 'Day';
    }else if (hours >= 16 && hours < 24){
        return 'Evening';
    }else {
        return 'Night';
    }
    
}


function showGreeting() {
    document.querySelector('.greeting').textContent = `Good ${getTimeOfDay()}`
}



function setLocalStorage() {
    localStorage.setItem('name', document.querySelector('.name').value);
    localStorage.setItem('city', document.querySelector('.city').value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
        document.querySelector('.name').value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        document.querySelector('.city').value = localStorage.getItem('city');
    }
  }
  window.addEventListener('load', getLocalStorage)


function getRandomNum() {
    return Math.round(Math.random() * (20 - 1) + 1);
}

let bgNum = String(getRandomNum())


function getSlideNext() {
   bgNum = String(Number(bgNum) +1)
   if (bgNum > 20) bgNum = '1';
   setTimeout(setBg, 0)
   return bgNum
}

function getSlidePrev() {
    bgNum = String(Number(bgNum) - 1)
    if (bgNum < 1) bgNum = '20';
    setTimeout(setBg, 0)
    return bgNum
 }

function setBg() {
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum.padStart(2, '0')}.jpg`.toLowerCase()
    img.addEventListener('load', function()
        { document.querySelector('.body').style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum.padStart(2, '0')}.jpg')`.toLowerCase()}
      )
}

setBg()

document.querySelector('.slide-next').addEventListener('click', getSlideNext)
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev)

let url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city')}&lang=en&appid=26d90d9c99931f13414cf4047fb53663&units=metric`;

async function getWeather() {
    const res = await fetch(url);
    const data = await res.json();
    document.querySelector('.weather-icon').className = 'weather-icon owf';
  
    document.querySelector('.weather-icon').classList.add(`owf-${data.weather[0].id}`);
    document.querySelector('.temperature').textContent = `${data.main.temp}°C`;
    document.querySelector('.weather-description').textContent = data.weather[0].description;
    document.querySelector('.wind').textContent = 'Wind speed: ' + data.wind.speed + ' m/s'
    document.querySelector('.humidity').textContent ='Humidity: ' +  data.main.humidity + '%'
  }

  getWeather()

document.querySelector('.city').addEventListener('change', function(){
    url = `https://api.openweathermap.org/data/2.5/weather?q=${document.querySelector('.city').value}&lang=en&appid=26d90d9c99931f13414cf4047fb53663&units=metric`;
    getWeather()
})

async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let randomNum = getRandomNum() - 1
    document.querySelector('.author').textContent = data[randomNum].author
    document.querySelector('.quote').textContent = data[randomNum].text
  }
  getQuotes();

document.querySelector('.change-quote').addEventListener('click', function(){
    setTimeout(getQuotes, 0)
} 
)

const audio = document.querySelector('audio')

let playNum = 0

function playAudio() {
    audio.currentTime = 0;
    audio.src = playList[playNum].src;
    audio.play()
}
  function pauseAudio() {
    audio.pause();
}

let acc = 0

document.querySelector('.play').addEventListener('click', function(){
    document.querySelector('.play').classList.toggle('pause')
    if(acc === 0){
        playAudio()
    }else if (acc ===1){
        pauseAudio()
    }
    acc++
    if(acc > 1){
        acc = 0
    }
})


function playNext() {
    playNum += 1
    if (playNum > 3){
        playNum = 0
    }
    playAudio()
}
function playPrev() {
    playNum -= 1
    if (playNum <0){
        playNum = 3
    }
    playAudio()
}

document.querySelector('.play-prev').addEventListener('click', function(){

    playPrev()
})
document.querySelector('.play-next').addEventListener('click', function(){
    playNext()
})

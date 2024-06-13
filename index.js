const myTitle = document.getElementById("myTitle");
const timerDisplay = document.getElementById("timer");
const result = document.getElementById("attempts");
const myInput = document.getElementById("myInput");
const audioIcon = document.getElementById("audio");
let randomNumber;
let playing = false;
let attempts = 0;
let timerClock;
let time;
let themeMusic = new Audio('./Themes/Bayonetta.mp3');
let audioPlaying = true;
themeMusic.play();
themeMusic.loop = "true";
themeMusic.volume = 0.75;
//function to play audio onrepeat
function audio() {
    audioPlaying = audioPlaying ? false : true;
    audioPlaying ? themeMusic.play() : themeMusic.pause();
    audioPlaying ? audioIcon.textContent = "🔉" : audioIcon.textContent = "🔇" ;
}
function newGame() {
    if (timerClock) { clearInterval(timerClock) };
    timerDisplay.textContent = ``;
    timerDisplay.style.removeProperty("color");
    result.textContent = ``;
    result.style.removeProperty("color");
    myInput.style.boxShadow = "1px 1px gray";


    time = +(window.prompt("Enter duration in seconds:"))
    if (time < 0 || isNaN(time)) {
        window.alert("Hahaha Smart pants, Next time add a VALID NUMBER");
    }
    if (time >= 0) {
        //whenever the user choose to start a new game the titles and timer are reseted 
        playing = true;
        attempts = 0;
        randomNumber = Math.floor(Math.random() * 100) + 1;

        //made a timer to make the game a bit challenging        
        timerClock = setInterval(() => {
            if (!playing) { clearInterval(timerClock); }
            else {
                //enabling the game to take input from the user
                myTitle.textContent = "Hurry Up";
                myInput.removeAttribute("disabled");
                if (time == 0) {
                    timerDisplay.textContent = `${time}`;
                    timerDisplay.textContent = `Game Over`;
                    myInput.setAttribute("disabled", "true");
                    result.style.color = "Hsl(345, 93%, 59%)";
                    result.textContent = `Time is Up the number was ${randomNumber}`;
                    clearInterval(timerClock);
                }
                else if (time <= 5) {
                    timerDisplay.style.color = "Hsl(345, 93%, 59%)";
                    timerDisplay.textContent = `${time--}`;
                }
                else {
                    timerDisplay.style.color = "hsl(0, 0%, 100%)";
                    timerDisplay.textContent = `${time--}`;
                }
            }
        }
            , 1000);
    }
}
//event listener the uses the 'enter' as an enput instead of using the button "apply"
document.addEventListener("keypress", (e) => { if (e.key == "Enter") { submit() } });

//validating the entries
function submit() {
    if (playing) {
        if (myInput.value == randomNumber) {
            playing = false;
            timerDisplay.style.color = "hsl(42.5deg 93.3% 59.02%)";
            timerDisplay.textContent = `HORRRAYYY!! 🎊🎊✨✨🎉`
            result.style.color = "hsl(42.5deg 93.3% 59.02%)";
            result.textContent = `Correct!! The answer was ${randomNumber} indeed \nit took you ${attempts} attempts`;
            myInput.style.boxShadow = "2px 2px hsl(42.5deg 93.3% 59.02%)";
        }
        else if (myInput.value > randomNumber) {
            attempts++;
            result.style.color = "Hsl(345, 93%, 59%)";
            result.textContent = `Number ${myInput.value} is too HIGH amigo, try again`;
            myInput.style.boxShadow = "2px 2px Hsl(345, 93%, 59%)";
            myInput.focus();
        }
        else {
            attempts++;
            result.style.color = "hsl(226, 93%, 59%)";
            result.textContent = `Number ${myInput.value} is too LOW amigo, Continue Gussing`;
            myInput.style.boxShadow = "2px 2px hsl(226, 93%, 59%)";
            myInput.focus();
        }
    } else { window.alert("you haven't started the game yet, silly") }
}
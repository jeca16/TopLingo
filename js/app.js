'use strict'

const fundo = document.getElementById('fundo')
const DiaNoite = document.getElementById('MudarImagem')

let mudar = false

const mudartema = function () {
    if (mudar == false) {
        mudar = true
        DiaNoite.src = './img/lua.png'
        fundo.style.backgroundColor = ' rgb(37, 37, 37)'
    } else {
        mudar = false
        DiaNoite.src = './img/sol.png'
        fundo.style.backgroundColor = 'rgb(255, 255, 255)'
    }
}


DiaNoite.addEventListener('click', mudartema)

// voice in //

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "pt-BR";
recognition.interimResults = false;


const diagnostico = document.getElementById('textareaFrom')

document.getElementById('micro').onclick = () => {
    recognition.start()
}

recognition.onresult = (event) =>{
    diagnostico.textContent = event.results[0][0].transcript
}

recognition.onspeechend = () => {
    recognition.stop()
}

recognition.onnomatch = (event) =>{
    diagnostico.textContent = 'desculpe, não entendi o que quis dizer, tente novamente'
}

// voice out //

const synth = window.speechSynthesis;
const inputTxt = document.getElementById('textareaTo');
const inputForm = document.querySelector("form")

inputForm.onsubmit = (event) => {
    event.preventDefault();

    const utterThis = new SpeechSynthesisUtterance(inputTxt.value)
    synth.speak(utterThis)
}  

utterThis.onpause = (event) => {
    const char = event.utterance.text.charAt(event.charIndex)
    console.log(
        `Speech paused at character ${event.charIndex} of "${event.utterance.text}", which is "${char}".`,
      )
}



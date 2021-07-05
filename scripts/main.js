Notification.requestPermission();

const contador = document.querySelector('#contador')
const modoTexto = document.querySelector('#modoTexto')
const qtdpomodoro = document.querySelector('#qtdpomodoro')

const btnIniciar = document.querySelector('#btnIniciar')
const btnParar = document.querySelector('#btnParar')

btnIniciar.addEventListener('click', () => {
    alterarContador()
    if (player === 'Iniciar') {
        btnIniciar.innerText = 'Pausar'
        player = 'Pausar'
    } else {
        btnIniciar.innerText = 'Iniciar'
        player = 'Iniciar'
    }

})

btnParar.addEventListener('click', () => {
    alterarContador(true)
})

let tempoTotal = 1500  
let tempoAtual = 1500
let tempoIntervalo = 300

let contadorRodando = false
let modo = 'Trabalhar'
let player = 'Iniciar'
let pomodoros = 0

let novoTempoAtual = 0
let inputTempoAtual = document.querySelector('#inputTempoAtual')

const minuteToSeconds = (mins) => {
    return mins * 60
  }

inputTempoAtual.addEventListener('input', () => {
    novoTempoAtual = Number(inputTempoAtual.value) * 60
})



const alterarContador = (reset) => {
    if (reset) {
        resetarContador()
    } else {
        if (contadorRodando === true) {
            clearInterval(contadorValor)
            contadorRodando = false
        } else {
            contadorRodando = true
            
            if (modo === 'Trabalhar' && novoTempoAtual != 0) {
                tempoAtual = novoTempoAtual
                tempoTotal = novoTempoAtual
                console.log(novoTempoAtual)
            } 
            
            contadorValor = setInterval(() => {
                alternarModo()
            }, 1000)
        }
    }
}

const mostrarTempoAtual = () => {
    const segundosRestantes = tempoAtual
    let resultado = ''
    const segundos = segundosRestantes % 60
    const minutos = parseInt(segundosRestantes / 60) % 60
    let horas = parseInt(segundosRestantes / 3600)

    function adicionaZeros(time) {
        return time < 10 ? `0${time}` : time
    }
    if (horas > 0) resultado += `${hours}:`

    resultado += `${adicionaZeros(minutos)}:${adicionaZeros(segundos)}`

    contador.innerText = resultado.toString()
}

const resetarContador = () => {
    clearInterval(contadorValor)
    contadorRodando = false

    btnIniciar.innerText = 'Iniciar'
    player = 'Iniciar'

    modoTexto.innerText = 'Trabalhar'
    modo = 'Trabalhar'

    qtdpomodoro.innerText = ''
    pomodoros = 0

    tempoAtual = tempoTotal
    mostrarTempoAtual()

    //Alerta na Aplicação
    var audio = new Audio("song/alerta.mp3");
    audio.play();
}

const pararContador = () => {
    clearInterval(contadorValor)
    contadorRodando = false
    tempoAtual = tempoTotal

    btnIniciar.innerText = 'Iniciar'
    player = 'Iniciar'

    mostrarTempoAtual()

    //Alerta na Aplicação
    var audio = new Audio("song/alerta.mp3");
    audio.play();
    //Notificação na Plataforma
    notificar('Seu timer acabou!', 'icon/icontomate.png', 'Pomodoro Timer')
}

const alternarModo = () => {
    if (tempoAtual > 0) {
        tempoAtual--
    } else if (tempoAtual === 0) {
        pararContador()

        if (modo === 'Trabalhar') {
            modoTexto.innerText = 'Intervalo'
            modo = 'Intervalo'
            qtdpomodoro.innerText = 'Promodoros: ' + ++pomodoros

            if (pomodoros == 4) {
                var res = confirm("Alterar tempo de intervalo para 10 minutos? ")
                res === true ? tempoIntervalo = 600 : tempoIntervalo = 300
            }
            tempoAtual = tempoIntervalo
        } else {
            tempoAtual = tempoTotal
            modoTexto.innerText = 'Trabalhar'
            modo = 'Trabalhar'
        }
    }
    mostrarTempoAtual()
}

mostrarTempoAtual()

function notificar(corpo, icone, titulo) {
    var opcoes = {
        body: corpo,
        icon: icone
    }
    var n = new Notification(titulo, opcoes);
}



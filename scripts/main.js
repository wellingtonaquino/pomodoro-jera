Notification.requestPermission();

const contador = document.querySelector('#contador')
const modoTexto = document.querySelector('#modoTexto')

const btnIniciar = document.querySelector('#btnIniciar')
const btnPausar = document.querySelector('#btnPausar')
const btnParar = document.querySelector('#btnParar')

btnIniciar.addEventListener('click', () => {
    alterarContador()
})

btnPausar.addEventListener('click', () => {
    alterarContador()
})

btnParar.addEventListener('click', () => {
    alterarContador(true)
})

let tempoTotal = 10
let tempoAtual = 10
let tempoIntervalo = 5

let contadorRodando = false
let modo = 'Trabalhar'

const alterarContador = (reset) => {
    if (reset) {
        pararContador()
    } else {
        if (contadorRodando === true) {
            clearInterval(contadorValor)
            contadorRodando = false
        } else {
            contadorRodando = true
            contadorValor = setInterval(() => {
                alternarModo()
                //mostrarTempoAtual()
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

const pararContador = () => {
    clearInterval(contadorValor)
    contadorRodando = false
    tempoAtual = tempoTotal
    mostrarTempoAtual()
    //Alerta na Aplicação
    var audio = new Audio("song/alerta.mp3");
    audio.play();
    //Notificação na Plataforma
    notificar('Seu timer acabou!','icon/icontomate.png','Pomodoro Timer')
}

const alternarModo = () => {
    if (tempoAtual > 0){
        tempoAtual--
    } else if (tempoAtual === 0){
        pararContador()
        if(modo === 'Trabalhar'){
            tempoAtual = tempoIntervalo
            modoTexto.innerText = 'Intervalo'
            modo = 'Intervalo'
        }else{
            tempoAtual = tempoTotal
            modoTexto.innerText = 'Trabalhar'
            modo = 'Trabalhar'
        }
    }
    mostrarTempoAtual()
}

mostrarTempoAtual()

function notificar(corpo,icone,titulo) {
    var opcoes = {
        body: corpo,
        icon: icone
    }
    var n = new Notification(titulo,opcoes);
  }



const contador = document.querySelector('#contador')
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
    alterarContadorr(true)
})

let tempoTotal = 1500
let tempoAtual = 1500
let tempoIntervalo = 300

let contadorRodando = false

const alterarContador = (reset) => {
    if(reset){
        pararContador()
    }else{
        if (contadorRodando === true){
            clearInterval(contadorValor)
            contadorRodando = false
        }else{
            contadorRodando = true
            contadorValor = setInterval(() => {
                tempoAtual--
            }, 1000)
        }
    }
}

const mostrarTempoAtual = () => {
    const segundosRestantes =  tempoAtual
    let resultado = ''
    const segundos = segundosRestantes % 60
    const minutos = parseInt(segundosRestantes / 60) % 60
    let horas = parseInt(segundosRestantes / 3600)

    function adicionaZeros(time){
        return time < 10 ? '0$(time)' : time
    }
    if(horas > 0 ) resultado += '$(hours):'
    resultado += '${adicionaZeros(minutos)}:${adicionaZeros(segundos)}'
    contador.innerText = resultado.toString()
}

const pararContador = () => {
    clearInterval(contadorValor)
    contadorRodando = false
    tempoAtual = tempoTotal
    mostrarTempoAtual()
}
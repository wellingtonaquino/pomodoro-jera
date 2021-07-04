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
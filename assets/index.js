const buscador = document.getElementById('buscador');
const text = document.querySelector('.text');
const iframes = document.querySelectorAll('iframe');

const anchoInputs = [
    document.getElementById('width1'),
    document.getElementById('width2'),
    document.getElementById('width3'),
    document.getElementById('width4'),
    document.getElementById('width5'),
    document.getElementById('width6')
];

const altoInputs = [
    document.getElementById('height1'),
    document.getElementById('height2'),
    document.getElementById('height3'),
    document.getElementById('height4'),
    document.getElementById('height5'),
    document.getElementById('height6')
];


const defaultAncho = [240, 320, 480, 768, 1024, 1200];
const defaultAlto = [320, 480, 640, 1024, 768, 800];

const ajustarTamañoIframe = () => {
    for (let i = 0; i < iframes.length; i++) {
        const ancho = anchoInputs[i].value || defaultAncho[i];
        const alto = altoInputs[i].value || defaultAlto[i];

        iframes[i].style.width = ancho + "px";
        iframes[i].style.height = alto + "px";

        localStorage.setItem("anchoIframe" + (i + 1), ancho);
        localStorage.setItem("altoIframe" + (i + 1), alto);
    }
};

const buscarPagina = () => {
    const url = text.value;
    const isLocalUrl = url.startsWith("http://127.0.0.1") || url.startsWith("http://localhost");

    if (url || isLocalUrl) {
        iframes.forEach(iframe => {
            iframe.src = url;
        });
    } else {
        window.open(url, '_blank');
    }
};


anchoInputs.forEach((input, i) => {
    input.addEventListener('blur', ajustarTamañoIframe);
});

altoInputs.forEach((input, i) => {
    input.addEventListener('blur', ajustarTamañoIframe);
});

buscador.addEventListener('click', buscarPagina);

window.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < iframes.length; i++) {
        const anchoGuardado = localStorage.getItem("anchoIframe" + (i + 1)) || defaultAncho[i];
        const altoGuardado = localStorage.getItem("altoIframe" + (i + 1)) || defaultAlto[i];

        anchoInputs[i].value = anchoGuardado;
        altoInputs[i].value = altoGuardado;

        iframes[i].style.width = anchoGuardado + "px";
        iframes[i].style.height = altoGuardado + "px";
    }
});

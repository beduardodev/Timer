const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkgitHub = document.querySelector('#link-gitHub');
let versaoEletron = document.querySelector('#versao-electron');

window.onload = function () {
    versaoEletron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
})

linkgitHub.addEventListener('click', function () {
    shell.openExternal("https://github.com/beduardodev");
})





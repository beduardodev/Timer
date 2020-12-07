const { ipcRenderer } = require('sobre.js');

let linkSobre = document.querySelector('#link-sobre');

linkSobre.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-sobre');
});
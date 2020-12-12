const { ipcMain } = require('electron');
const data = require('./data');

module.exports = {
    templateInicial: null,

    gerarTrayTemplate(win) {
        let template = [{
                'label': 'Cursos'
            },
            {
                type: 'separator'
            }
        ];
        let cursos = data.pegaNomeDosCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso);
                }
            }
            template.push(menuItem);
        })
        this.templateInicial = template;

        return template;
    },
    adicionaCursoNoTray(curso, ) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        })

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app) {
        let templateMenu = [{
            label: 'Sobre',
            submenu: [{
                label: 'Sobre o Timer',
                click: () => {
                    ipcMain.emit('abrir-janela-sobre');
                }
            }]
        }];

        if (process.platform == 'darwin') { //caso seja MAC OS
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    { label: 'Wubba lubba dub dub!' }
                ]
            })
        }
        return templateMenu;
    }
}
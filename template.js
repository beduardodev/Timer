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
    adicionaCursoNoTray(curso, win) {
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
                label: 'View',
                submenu: [{
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    }
                ]
            },
            {
                label: 'Window',
                submenu: [{
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'About',
                submenu: [{
                    label: 'About this Timer',
                    accelerator: 'CmdOrControl+I',
                    click: () => {
                        ipcMain.emit('abrir-janela-sobre');
                    }
                }]
            }
        ];

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
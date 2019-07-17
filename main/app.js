const electron = require('electron');
const {app,BrowserWindow,Menu} = electron;

let window,popupWindow; 

function createWindow() {
    // reassign  the Global window 
    window = new BrowserWindow({
        show : false , 
        webPreferences : {
            nodeIntegration : true
        }
    })

    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

    // and load the index.html of the app.
    window.loadFile(`${__dirname}/mainW.html`)


    /* app is ready good to show the window but we want to make window show with Document 
        not to show window and after document loaded show it no no to prevent this */

    window.once('ready-to-show',()=>{
        window.show();
    })


    // Emitted when the window is closed.
    window.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null
    })


    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
          createWindow()
        }
      })
      
 
    const appMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(appMenu);




}

function popupWindowFn() {
    popupWindow = new BrowserWindow({
        width : 300 ,
        height : 300,
        title : 'Add New Course'
    });
}

app.on('ready' , createWindow);


const menuTemplate = [
    {
        label : 'file',
        submenu : [
            {
                label : 'Add Course',
                accelerator : 'N',
                click() {
                    popupWindowFn();
                }
            },
            {
                label : "Quit",
                accelerator : (()=>{
                    return (process.platform === 'darwin') ? "COMMAND+Q" : "CTRL+Q"
                })(),
                click() {
                    app.quit();
                }
            }
        ]
    }
]


if(process.platform === 'darwin ') {
    menuTemplate.unshift({}) ; // take the argument and pass it first and shift the rest of menuTemplate
}
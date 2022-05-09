 class realone  implements proxySubject {

constructor(){}

    auth(username: string , password:string): any  {
      
  const path = require('path');
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
 resizable :true , 
  transparent: true, 
     frame: false, 
    height: 1920,
    width: 1080 , 
 webPreferences: {
  nodeIntegration: true , 
contextIsolation: false , 
webviewTag:true,
   enableRemoteModule: true,
    } ,
 
  });

win.loadFile(path.join(__dirname, '../main-window/mainwindow.html'));
win.webContents.openDevTools();

      
      
    }
    
}
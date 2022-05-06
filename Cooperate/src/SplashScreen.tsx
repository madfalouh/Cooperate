class SplashScreen {
constructor() {
setTimeout( ()=>{
this.createBrowserWindow() ;
close(); 
}, 1000);
}
  createBrowserWindow() {
  const path = require('path');
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
 resizable :true , 
  transparent: true, 
     frame: false, 
    
    height: 480,
    width: 768 , 
 webPreferences: {
      nodeIntegration: true , 
      webSecurity: false
    } ,
 
  });

win.loadFile(path.join(__dirname, 'login-register/login.html'));
//win.webContents.openDevTools();
}
}
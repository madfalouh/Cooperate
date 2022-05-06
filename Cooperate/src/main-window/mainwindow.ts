const {remote} = require('electron');

class mainwindow {
    constructor() {        
    }

 
 minimize():void {
      const thiswindow = remote.getCurrentWindow();
      console.log(thiswindow);
      
    thiswindow.minimize();
}
 
 maximize():void {
     var window = remote.getCurrentWindow()
     console.log(window.getSize()[0]);
    
    if( window.getSize()[0]===1920){
    window.unmaximize()
  }else{
window.maximize();
}
}
 
 close():void {
     var window = remote.getCurrentWindow();
    window.close();
}

}
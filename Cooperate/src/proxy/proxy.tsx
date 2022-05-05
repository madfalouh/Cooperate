

class proxy implements proxySubject  {


lk:realone = new realone()

constructor() {


}




  login(username:string){
 
  
  

     if(username==="reda@gmail.com"){
     this.lk.login(username)
     return true ; 
}else {
return false  ; 
}    


    }
 
}
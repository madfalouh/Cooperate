const  axios =require("axios");



class proxy implements proxySubject  {

lk:realone = new realone()

constructor() {
}





async  auth(username:string , password:string ):Promise<Boolean>  {
  let p:Boolean =true; 
  const data = {
            email:username ,
            password: password
        };
console.log(data);

 await axios({
          method: 'post',
          url: 'http://localhost:3000/api/login',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          data: data
        }).then((response) => {
         console.log(response);
          sessionStorage.setItem('__TOKEN__', response.data);
         
        }).catch((error) => {
            p=false ; 
            console.error('There was an error!', error);
        });

return p ;
  }

  }


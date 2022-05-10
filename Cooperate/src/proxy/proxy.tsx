const  axios =require("axios");



class proxy implements proxySubject  {

lk:realone = new realone()

constructor() {
}

async  auth(username:string , password:string ):Promise<any> {

  
  const data = {
            email:username ,
            password: password
        };
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
          const jwt = require("jsonwebtoken");
           localStorage.setItem('__TOKEN__', response.data) ;
           console.log(localStorage.getItem('__TOKEN__'));
           
          const decoded_token=jwt.verify(response.data, 'tokenkey');
          console.log(decoded_token);
          localStorage.setItem('decoded_token', JSON.stringify(decoded_token))           
          this.lk.auth(data.email , data.password)  
          
        }).catch((error) => {
            console.error('There was an error!', error);
        });
      const jwt = require("jsonwebtoken");
const decoded_token=jwt.verify(localStorage.getItem('__TOKEN__'), 'tokenkey');
console.log(localStorage.getItem('__TOKEN__'));


    }


  }






 

  

  


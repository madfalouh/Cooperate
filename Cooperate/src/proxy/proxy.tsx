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
          this.lk.auth(data.email , data.password)  
          close()   
        }).catch((error) => {
            console.error('There was an error!', error);
        });
  }

  }


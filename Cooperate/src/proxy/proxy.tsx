const  axios =require("axios");



class proxy implements proxySubject  {

lk:realone = new realone()

constructor() {
}





async  auth(username:string):Promise<any>  {




  try {
    // 👇️ const data: GetUsersResponse
    const data = await axios.get(
      'https://localhost:3000/api/',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log(JSON.stringify(data));

    // 👇️ "response status is: 200"
   
  } catch (error) {
     if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
 
return true ;
 
  
  
  }
 
 
 
  }




class Activity {
decoded_token : any
response:any
    constructor(decoded_token : any) {
 console.log(decoded_token);
        this.decoded_token=decoded_token ;
    }
 fetchActivities = async () => {
const data ={
id : this.decoded_token.user_id 
}
  
   
    console.log(localStorage.getItem('__TOKEN__'));

    
    await axios({
      method: 'post',
      url: `http://localhost:3000/api/activities/myactivity`,
      headers: {
       'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('__TOKEN__')
      },
       data:data,
    }).then((response) => {
      response.data=this.response
    }).catch((error) => {
      console.error('There was an error!', error);
    });
  }

addactivities () {
console.log(this.response);



} 




}
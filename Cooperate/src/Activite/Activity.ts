class Activity {
decoded_token : any
    constructor(decoded_token : any) {
    this.decoded_token=decoded_token
    }
 fetchActivities  = async () => {
const data ={
id : this.decoded_token.user_id 
}
console.log(data);

    await axios({
      method: 'post',
      url: `http://localhost:3000/api/activities/myactivity`,
      headers: {
       'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('__TOKEN__')
      },
       data:data,
    }).then(  (response) => {
       console.log(response.data);
       
       localStorage.setItem('activities', JSON.stringify(response.data))                 
     }).catch((error) => {
      console.error('There was an error!', error)
    });



 await axios({
      
        method: 'get',
        url: `http://localhost:3000/api/messages/user/`+ JSON.parse( localStorage.getItem('decoded_token')).user_id,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem('__TOKEN__')
        },
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error('There was an error!', error);
      });


  }


}
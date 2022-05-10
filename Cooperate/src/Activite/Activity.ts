class Activity {
decoded_token : any
    constructor(decoded_token : any) {
    this.decoded_token=decoded_token
    }
 fetchActivities  = async () => {
const data ={
id : this.decoded_token.user_id 
}
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
       localStorage.setItem('activities', JSON.stringify(response.data))                 
     }).catch((error) => {
      console.error('There was an error!', error)
    });
  }
}
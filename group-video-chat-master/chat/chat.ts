class chat {
   decoded_token : any
    constructor(decoded_token : any) {
    this.decoded_token=decoded_token

    }
 fetchUsermessage  = async () => {
 await axios({
      
        method: 'get',
        url: `http://localhost:3000/api/messages/user/`+ JSON.parse( localStorage.getItem('decoded_token')).user_id,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem('__TOKEN__')
        },
      }).then((response) => {
        const users = [];
        const messages = [];
            response.data.forEach((message) => {

          messages.push(message);
             localStorage.setItem('messages',JSON.stringify(messages))
          if (message.receiver.id !== this.decoded_token.user_id && !users.some(user => user.id === message.receiver.id)) {
            users.push(message.receiver);
          }
          if (message.sender.id !== this.decoded_token.user_id && !users.some(user => user.id === message.sender.id)) {
            users.push(message.sender);
          }
        });
       // console.log(users);
        localStorage.setItem('displayusers',JSON.stringify(users))
      }).catch((error) => {
        console.error('There was an error!', error);
      });
  }


fetchUserGroupsMessages  = async () => {
var result=[] ; 
for(var i of JSON.parse( localStorage.getItem('usergroups')) ){
 await axios({
      
        method: 'get',
        url: `http://localhost:3000/api/messages/group/`+i.id,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem('__TOKEN__')
        },
      }).then((response) => {
console.log(response);

           result.push(response.data)
           
      }).catch((error) => {
        console.error('There was an error!', error);
      });
  }

localStorage.setItem('groupmessages', JSON.stringify(result) ) 

console.log( JSON.parse( localStorage.getItem('groupmessages')));

 }

 fetchUserGroupes = async () => {
 await axios({
        method: 'get',
        url: `http://localhost:3000/api/groups/user/`+ JSON.parse( localStorage.getItem('decoded_token')).user_id,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +localStorage.getItem('__TOKEN__')
        },
      }).then((response) => {           
           localStorage.setItem('usergroups', JSON.stringify( response.data) ) 
           console.log(  JSON.parse( localStorage.getItem('usergroups')))  ;

      }).catch((error) => {
        console.error('There was an error!', error);
      });
  }


}
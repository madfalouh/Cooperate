interface proxySubject {
 auth(username: string , password:string ) : Promise<Boolean> ;  
}
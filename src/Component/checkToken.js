    import decode from 'jwt-decode'
    export const checkExpiry=(access, refresh)=>{
            if(refresh< new Date().getTime()/1000 )
            {
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('accessToken')
                return false
            }
            else{
                if(access< new Date().getTime()/1000)
                {
                    console.log('expiry')
                    var myHeaders= new Headers()
                    myHeaders.append("Content-type","application/json")
                    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('accessToken')}`);

                    fetch("http://localhost:9090/refresh",
                    {method:"POST", body:JSON.stringify({'token':`${localStorage.getItem('refreshToken')}`})})
                    .then((r)=>{return r.json()})
                    .then((d)=>{
                        console.log(d)
                        localStorage.removeItem('accessToken')
                        // localStorage.removeItem('refreshToken')
                        localStorage.setItem('accessToken' , d.token)
                        // localStorage.setItem('refreshToken' , d.refresh.token)
                    }
                        )
                    return true
                }else{
                return true
                }
            }
            

    }

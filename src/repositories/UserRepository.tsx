
class UserRepository {

    authKey:string = "AUTH_KEY"

    isLoggedIn() : boolean {
        let token:string | null = window.sessionStorage.getItem(this.authKey)
        return !token
    }

    getToken() : string {
        let token = window.sessionStorage.getItem(this.authKey)
        return token || ""
    }

    logout() {
        window.sessionStorage.setItem(this.authKey, "");
    }

    login(email: string, password: string, callback : ((status:boolean) => void)) {
        let body = {
            email:email,
            password:password
        }
        let url = process.env.REACT_APP_REST_API_LOCATION + "/login"
        fetch(url,{
            method:'post',
            headers: {'Content-Type': 'application/json', },
            body:JSON.stringify(body)
        })
            .then(res => res.json())
            .then((data) => {
                window.sessionStorage.setItem(this.authKey, data.token);
                callback(true)
            })
            .catch((error) => {
                callback(false)
            })
    }
}

export default UserRepository
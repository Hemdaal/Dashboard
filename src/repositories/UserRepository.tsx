
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
        let url = process.env.API_URL + "/login"
        fetch(url)
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
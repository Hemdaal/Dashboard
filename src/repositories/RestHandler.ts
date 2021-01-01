import axios from "axios";

export class RestHandler {


    static async callGraphQL(query: string, variables: string): Promise<any> {
        const token = localStorage.getItem('token');
        let headers = {};
        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`
            }
        }

        const body: GQLBody = {
            operationName: "",
            query: query,
            variables: variables

        };

        return new Promise<any>((resolve, reject) => {
            axios.post('/graphql', body, {
                headers: headers
            }).then((response) => {
                if (response.status === 200) {
                    if (response.data) {
                        resolve(response.data)
                    } else {
                        reject('Unable to fetch information')
                    }
                } else {
                    reject(response.statusText)
                }
            }).catch(error => reject(error))
        });
    }
}

interface GQLBody {
    operationName: string,
    variables: any,
    query: string
}

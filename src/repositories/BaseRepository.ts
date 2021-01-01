import {GraphQLClient} from "graphql-request/dist";
import {RequestDocument} from "graphql-request/dist/types";

export class BaseRepository {

    private url = 'http://localhost:8080/graphql';
    private graphQLClient = new GraphQLClient(this.url, {});

    async call<T>(queryOrMutation: RequestDocument, variables: any): Promise<T> {
        const token = localStorage.getItem('token');
        if(token) {
            this.graphQLClient.setHeader('Authorization', token)
        } else {
            this.graphQLClient.setHeaders([])
        }

        return new Promise<T>((resolve, reject) => {
            this.graphQLClient.request<T>(queryOrMutation, variables).then((data) => {
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        });
    }

    private static getToken(): string {
        const token = localStorage.getItem('token');
        if (token) {
            return 'Bearer ' + token
        }

        return ''
    }
}

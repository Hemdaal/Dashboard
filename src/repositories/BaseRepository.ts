import {GraphQLClient} from "graphql-request/dist";
import {RequestDocument} from "graphql-request/dist/types";

export class BaseRepository {

    private url = 'http://localhost:8080/graphql';
    private graphQLClient = new GraphQLClient(this.url, {
        headers: {
            authorization: BaseRepository.getToken(),
        },
    });

    async call<T>(queryOrMutation: RequestDocument, variables: any): Promise<T> {
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

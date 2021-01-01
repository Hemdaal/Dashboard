import {RestHandler} from "./RestHandler";


export class BaseRepository {

    async call(queryOrMutation: string, variables: any): Promise<any> {
        return RestHandler.callGraphQL(queryOrMutation, variables)
    }
}

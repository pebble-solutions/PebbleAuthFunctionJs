import { PebbleAuthToken } from "@pebble-solutions/pebble-auth-client";
import { AuthorizationInterface } from "../interface/AuthorizationInterface";
import { PebbleTokenData } from "../types/PebbleTokenData";
import { fetchAuthToken } from "../functions/fetchAuthTokenFunction";
import { AuthorizationOptions } from "../types/AuthorizationOptions";

/**
 * Class representing a Pebble authorization.
 */
export class PebbleAuthorization extends PebbleAuthToken implements AuthorizationInterface {

    private options: AuthorizationOptions;

    /**
     * Creates an instance of PebbleAuthorization.
     * @param token The PebbleTokenData token.
     * @param options The authorization options.
     */
    constructor(token: PebbleTokenData, options: AuthorizationOptions) {
        super(token);
        this.options = options;
    }

     /**
     * Fetches a new authentication token based on the expiration of the current one.
     * @returns A promise resolved with the authorization token.
     */
    async getToken(): Promise<string> {
        if (this.exp >= (new Date().getTime() / 1000)) {
            const authResponse = await fetchAuthToken(this.options);
            Object.assign(this, authResponse.resp);
        }
        return this.token;
    }
}

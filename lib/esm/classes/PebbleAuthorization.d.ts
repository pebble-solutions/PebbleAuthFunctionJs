import { PebbleAuthToken } from "@pebble-solutions/pebble-auth-client";
import { AuthorizationInterface } from "../interface/AuthorizationInterface";
import { PebbleTokenData } from "../types/PebbleTokenData";
import { AuthorizationOptions } from "../types/AuthorizationOptions";
/**
 * Class representing a Pebble authorization.
 */
export declare class PebbleAuthorization extends PebbleAuthToken implements AuthorizationInterface {
    private options;
    /**
     * Creates an instance of PebbleAuthorization.
     * @param token The PebbleTokenData token.
     * @param options The authorization options.
     */
    constructor(token: PebbleTokenData, options: AuthorizationOptions);
    /**
    * Fetches a new authentication token based on the expiration of the current one.
    * @returns A promise resolved with the authorization token.
    */
    getToken(): Promise<string>;
}

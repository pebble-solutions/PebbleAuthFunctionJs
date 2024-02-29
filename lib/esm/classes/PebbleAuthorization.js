var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PebbleAuthToken } from "@pebble-solutions/pebble-auth-client";
import { fetchAuthToken } from "../functions/fetchAuthTokenFunction";
/**
 * Class representing a Pebble authorization.
 */
export class PebbleAuthorization extends PebbleAuthToken {
    /**
     * Creates an instance of PebbleAuthorization.
     * @param token The PebbleTokenData token.
     * @param options The authorization options.
     */
    constructor(token, options) {
        super(token);
        this.options = options;
    }
    /**
    * Fetches a new authentication token based on the expiration of the current one.
    * @returns A promise resolved with the authorization token.
    */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.exp >= (new Date().getTime() / 1000)) {
                const authResponse = yield fetchAuthToken(this.options);
                Object.assign(this, authResponse.resp);
            }
            return this.token;
        });
    }
}

import type { AuthResponse } from '../types/AuthResponse';
import { AuthorizationOptions } from "../types/AuthorizationOptions";
/**
 * Pebble authentication function.
 * It returns information related to the authorization token and Firebase authentication data.
 *
 * @throws DisconnectedError
 * @throws PebbleServerError
 */
declare function fetchAuthToken(options: AuthorizationOptions): Promise<AuthResponse>;
export { fetchAuthToken };

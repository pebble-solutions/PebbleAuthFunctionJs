import { PebbleAuthToken } from "@pebble-solutions/pebble-auth-client";
import type { User } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
/**
 * Perform Firebase authentication using an email/password combination.
 *
 * @param {string} email
 * @param {string} password
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<User>}
 */
declare const signInWithFirebase: (email: string, password: string, appFirebase?: FirebaseApp | null) => Promise<User | Error>;
declare let webClientId: string;
/**
 * Initialize the authServe URL and webClientId.
 *
 * @param {object} options
 * - authServer string  : Optional initialization, default value
 * - webClientId string : Optional initialization, default value
 */
declare const initializeAuthServer: (options: {
    authServer?: string;
    webClientId?: string;
}) => void;
/**
 * Perform Google authentication using the Google Sign-In service.
 *
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<User>}
 *
 * @throws {GoogleSignInCancelledError}
 * @throws {GoogleInProgressError}
 * @throws {GooglePlayServicesNotAvailaibableError}
 * @throws {GoogleSignInError}
 * @throws {Error}
 */
declare const signInWithGoogle: (appFirebase?: FirebaseApp | null) => Promise<User | Error>;
/**
 * Retrieve licenses from the server using a GET request.
 *
 * @param {object} options
 * - app                string    Only licenses affected to the provided application value will be returned.
 * - include_disabled   integer   If true, licenses that are not currently active for the user are returned. Example: expired licenses.
 * - tenant_id          string    If exists, return only licenses that match with the provided tenant_id value.
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} Return http error from the authorization server
 */
declare const getLicences: (options: {
    app?: string;
    include_disabled?: number;
    tenant_id?: string;
}, appFirebase?: FirebaseApp | null) => Promise<Array<any> | Error>;
/**
 * Perform Pebble authentication using the server API.
 *
 * @param {object} options
 * - app          string  mandatory   Authenticate user to the provided application. One token is served for one application.
 * - tenant_id    string              Tenant that will consume resources. This property is mandatory if multiple tenants are returned by license request.
 *
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<PebbleAuthToken>}
 *
 * @throws {Error} If the authentication request fails.
 */
declare const pebbleAuthentification: (options: {
    app: string;
    tenant_id?: string;
}, appFirebase?: FirebaseApp | null) => Promise<{
    pebbleAuthToken: PebbleAuthToken;
    user: User | null;
} | Error>;
export { signInWithFirebase, initializeAuthServer, signInWithGoogle, getLicences, pebbleAuthentification };

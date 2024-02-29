import type { User } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { AuthClientOptions } from "./types/AuthClientOptions";
import { PebbleAuthorization } from "./classes/PebbleAuthorization";
/**
 * Authenticate the user using Firebase Authentication with an email/password combination.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {?FirebaseApp} appFirebase - The Firebase application instance to use for authentication. Optional.
 *
 * @returns {Promise<User>}  A promise that resolves with the authenticated user or rejects if authentication fails.
 *
 * @throws {FirebaseAuthenticationError}  Error indicating a failure during authentication with Firebase.
 *
 * @example
 * // Example usage:
 * // Call the function in your code
 *  await signInWithFirebase('test@pebble.bzh', '1234');
 */
declare const signInWithFirebase: (email: string, password: string, appFirebase?: FirebaseApp | null) => Promise<User>;
declare let authServer: string;
/**
 * Initialize the authServe URL.
 *
 * @param {object} options
 * - authServer string  : Optional initialization, default value
 */
declare const initializeAuthServer: (options: {
    authServer?: string;
}) => void;
/**
 * Authenticate the user with their Google account using Firebase Authentication.
 * This function redirects the user to the Google login page.
 *
 * @param {?FirebaseApp} appFirebase - The Firebase application instance to use for authentication. Optional.
 *
 * @returns {Promise<User>} - A promise that resolves with the authenticated user or rejects if authentication fails.
 *
 * @throws {GoogleAuthenticationError}    Error indicating a failure during authentication with Google.
 * @throws {UserDoesNotExistError}        Error indicating that no user was found after the login.
 *
 * @example
 * // Example usage:
 * await signInWithGoogle();
 */
declare const signInWithGoogle: (appFirebase?: FirebaseApp | null) => Promise<User>;
/**
 * Log in the user with their Microsoft account using Firebase Authentication.
 * This function redirects the user to the Microsoft login page.
 *
 * @param {?FirebaseApp} appFirebase - The Firebase application to use for authentication. Optional.
 *
 * @returns {Promise<User>} - A promise that resolves with the logged-in user or rejects if authentication fails.
 *
 * @throws {MicrosoftAuthenticationError} - Error indicating a failure during authentication with Microsoft.
 * @throws {UserDoesNotExistError} - Error indicating that no user was found after the login.
 *
 * @example
 * // Calling the function in code
 * await signInWithMicrosoft()
 */
declare const signInWithMicrosoft: (appFirebase?: FirebaseApp | null) => Promise<User>;
/**
 * Retrieve licenses from the server using a GET request.
 *
 * @param {object} options
 * - app                string    Only licenses affected to the provided application value will be returned.
 * - include_disabled   integer   If true, licenses that are not currently active for the user are returned. Example: expired licenses.
 * - tenant_id          string    If exists, return only licenses that match with the provided tenant_id value.
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<Array<any>>}   An array of licenses retrieved from the server.
 *
 * @throws {LicenseRetrievalError}            Thrown when an error occurs during license retrieval from the server.
 * @throws {UnexpectedLicenseResponseError}   Thrown when an unexpected response is received from the server during license retrieval.
 * @throws {UnexpectedApiResponseError}       Thrown when an unexpected error occurs during license retrieval.
 */
declare const getLicences: (options: {
    app?: string;
    include_disabled?: number;
    tenant_id?: string;
}, appFirebase?: FirebaseApp | null) => Promise<Array<any>>;
/**
 * Perform Pebble authentication using the server API.
 *
 * @param {AuthClientOptions} options
 * - app          string  mandatory   Authenticate user to the provided application. One token is served for one application.
 * - tenant_id    string              Tenant that will consume resources. This property is mandatory if multiple tenants are returned by license request.
 *
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<PebbleAuthorization>}
 *
 */
declare const pebbleAuthentification: (options: AuthClientOptions, appFirebase?: FirebaseApp | null) => Promise<PebbleAuthorization>;
declare const signOutFunction: (appFirebase?: FirebaseApp | null) => Promise<void>;
export { signInWithFirebase, initializeAuthServer, signInWithGoogle, signInWithMicrosoft, getLicences, pebbleAuthentification, signOutFunction };

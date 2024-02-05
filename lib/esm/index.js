import PebbleAuthToken from "@pebble-solutions/pebble-auth-client";
import { GoogleInProgressError, GooglePlayServicesNotAvailaibableError, GoogleSignInCancelledError, GoogleSignInError } from "./errors.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
/**
 * Perform Firebase authentication using an email/password combination.
 *
 * @param {string} email
 * @param {string} password
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<User>}
 */
const signInWithFirebase = async (email, password, appFirebase) => {
    try {
        const userCredential = await signInWithEmailAndPassword(getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined), email, password);
        const data = userCredential.user;
        return data;
    }
    catch (error) {
        return error;
    }
};
let authServe = 'https://pebbleauthserver-xbnqmf3wfa-ew.a.run.app/';
let webClientId = '906119417386-8vilphgoe5hgjtol859ef2sgodjrlpuq.apps.googleusercontent.com';
/**
 * Initialize the authServe URL and webClientId.
 *
 * @param {object} options
 * - authServer string  : Optional initialization, default value
 * - webClientId string : Optional initialization, default value
 */
const initializeAuthServer = (options) => {
    if (options.authServer)
        authServe = options.authServer;
    if (options.webClientId)
        webClientId = options.webClientId;
};
GoogleSignin.configure({ webClientId });
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
const signInWithGoogle = async (appFirebase) => {
    try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined), googleCredential);
        const data = userCredential.user;
        return data;
    }
    catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                throw new GoogleSignInCancelledError(error);
            }
            else if (error.code === statusCodes.IN_PROGRESS) {
                throw new GoogleInProgressError(error);
            }
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                throw new GooglePlayServicesNotAvailaibableError(error);
            }
            else {
                throw new GoogleSignInError(error);
            }
        }
        else {
            throw new Error('Erreur non traité pendant la connexion (Google Sign-In)');
        }
    }
};
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
const getLicences = async (options, appFirebase) => {
    try {
        let url = `${authServe}/licences`;
        let i = 0;
        for (const key in options) {
            const sep = i > 0 ? '&' : '?';
            url += `${sep}${key}=${options[key]}`;
            i++;
        }
        const auth = getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
        const idToken = await auth.currentUser?.getIdToken();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        else {
            throw new Error('Unexpected server response when retrieving licenses');
        }
    }
    catch (error) {
        console.error('Error retrieving licenses:', error);
        return error;
    }
};
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
const pebbleAuthentification = async (options, appFirebase) => {
    try {
        const auth = getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
        const idToken = await auth.currentUser?.getIdToken();
        const response = await fetch(`${authServe}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(options),
        });
        const data = await response.json();
        const pebbleAuthToken = new PebbleAuthToken(data);
        const user = auth.currentUser;
        return { pebbleAuthToken, user };
    }
    catch (error) {
        throw new Error('Pebble authentication error: ' + error);
    }
};
export { signInWithFirebase, initializeAuthServer, signInWithGoogle, getLicences, pebbleAuthentification };

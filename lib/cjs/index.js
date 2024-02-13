"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pebbleAuthentification = exports.getLicences = exports.signInWithGoogle = exports.initializeAuthServer = exports.signInWithFirebase = void 0;
const pebble_auth_client_1 = require("@pebble-solutions/pebble-auth-client");
const errors_js_1 = require("./errors.js");
const auth_1 = require("firebase/auth");
const google_signin_1 = require("@react-native-google-signin/google-signin");
/**
 * Perform Firebase authentication using an email/password combination.
 *
 * @param {string} email
 * @param {string} password
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<User>}
 */
const signInWithFirebase = (email, password, appFirebase) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCredential = yield (0, auth_1.signInWithEmailAndPassword)((0, auth_1.getAuth)(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined), email, password);
        return userCredential.user;
    }
    catch (error) {
        return error;
    }
});
exports.signInWithFirebase = signInWithFirebase;
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
exports.initializeAuthServer = initializeAuthServer;
google_signin_1.GoogleSignin.configure({ webClientId });
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
const signInWithGoogle = (appFirebase) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield google_signin_1.GoogleSignin.hasPlayServices();
        const { idToken } = yield google_signin_1.GoogleSignin.signIn();
        const googleCredential = auth_1.GoogleAuthProvider.credential(idToken);
        const userCredential = yield (0, auth_1.signInWithCredential)((0, auth_1.getAuth)(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined), googleCredential);
        const data = userCredential.user;
        return data;
    }
    catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code) {
            if (error.code === google_signin_1.statusCodes.SIGN_IN_CANCELLED) {
                throw new errors_js_1.GoogleSignInCancelledError(error);
            }
            else if (error.code === google_signin_1.statusCodes.IN_PROGRESS) {
                throw new errors_js_1.GoogleInProgressError(error);
            }
            else if (error.code === google_signin_1.statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                throw new errors_js_1.GooglePlayServicesNotAvailaibableError(error);
            }
            else {
                throw new errors_js_1.GoogleSignInError(error);
            }
        }
        else {
            throw new Error('Erreur non traité pendant la connexion (Google Sign-In)');
        }
    }
});
exports.signInWithGoogle = signInWithGoogle;
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
const getLicences = (options, appFirebase) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let url = `${authServe}/licences`;
        let i = 0;
        for (const key in options) {
            const sep = i > 0 ? '&' : '?';
            url += `${sep}${key}=${options[key]}`;
            i++;
        }
        const auth = (0, auth_1.getAuth)(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
        const idToken = yield ((_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken());
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = yield response.json();
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
});
exports.getLicences = getLicences;
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
const pebbleAuthentification = (options, appFirebase) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const auth = (0, auth_1.getAuth)(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
        const idToken = yield ((_b = auth.currentUser) === null || _b === void 0 ? void 0 : _b.getIdToken());
        const response = yield fetch(`${authServe}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(options),
        });
        const data = yield response.json();
        const pebbleAuthToken = new pebble_auth_client_1.PebbleAuthToken(data);
        const user = auth.currentUser;
        return { pebbleAuthToken, user };
    }
    catch (error) {
        throw new Error('Pebble authentication error: ' + error);
    }
});
exports.pebbleAuthentification = pebbleAuthentification;

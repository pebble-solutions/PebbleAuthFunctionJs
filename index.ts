import type {User} from 'firebase/auth';
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, OAuthProvider, signOut} from "firebase/auth";
import type {FirebaseApp} from 'firebase/app';

import { AuthClientOptions } from "./types/AuthClientOptions";
import { PebbleAuthorization } from "./classes/PebbleAuthorization";
import {fetchAuthToken} from "./functions/fetchAuthTokenFunction.js";
import { FirebaseAuthenticationError, GoogleAuthenticationError, MicrosoftAuthenticationError, LicenseRetrievalError, UnexpectedLicenseResponseError, UnexpectedApiResponseError, UserDoesNotExistError, SignOutError } from './errors';

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
const signInWithFirebase = async (email: string, password: string, appFirebase?: FirebaseApp | null): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined), email, password);
    return userCredential.user;
  } catch (error) {
    throw new FirebaseAuthenticationError();
  }
};

let authServer = 'https://api.pebble.solutions/v5/authorize/';

/**
 * Initialize the authServe URL.
 *
 * @param {object} options
 * - authServer string  : Optional initialization, default value
 */
const initializeAuthServer = (options: { authServer?: string}): void => {
  if (options.authServer) authServer = options.authServer;
};

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
const signInWithGoogle = async (appFirebase?: FirebaseApp | null): Promise<User> => {
  try {
    const auth = getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    const userCredential = await getRedirectResult(auth);

    if (userCredential == null || userCredential.user == null) {
      throw new UserDoesNotExistError("No user found after the login.");
    } else {
      return userCredential.user;
    }
  } catch (error) {
    throw new GoogleAuthenticationError();
  }
};

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
const signInWithMicrosoft = async (appFirebase?: FirebaseApp | null): Promise<User> => {
  try { 
    const auth = getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
    const provider = new OAuthProvider('microsoft.com');
    await signInWithRedirect(auth, provider);
    const userCredential = await getRedirectResult(auth);

    if (userCredential == null || userCredential.user == null) {
      throw new UserDoesNotExistError("Aucun utilisateur trouvé après la connexion.");
    } else {
      return userCredential.user;
    }
  } catch (error) {
    throw new MicrosoftAuthenticationError();
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
 * @returns {Promise<Array<any>>}   An array of licenses retrieved from the server.
 * 
 * @throws {LicenseRetrievalError}            Thrown when an error occurs during license retrieval from the server.
 * @throws {UnexpectedLicenseResponseError}   Thrown when an unexpected response is received from the server during license retrieval.
 * @throws {UnexpectedApiResponseError}       Thrown when an unexpected error occurs during license retrieval.
 */
const getLicences = async (options: { app?: string; include_disabled?: number; tenant_id?: string }, appFirebase?: FirebaseApp | null): Promise<Array<any>> => {
  try {
      let url = `${authServer}/licences`;
      let i = 0;
      for (const key in options) {
        const sep = i > 0 ? '&' : '?';
        url += `${sep}${key}=${(options as any)[key]}`;
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
        throw new LicenseRetrievalError(response.status);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        return data;
      } else {
        throw new UnexpectedLicenseResponseError();
      }
  } catch (error) {
      throw new UnexpectedApiResponseError(error);
  }
};  

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
const pebbleAuthentification = async (options: AuthClientOptions, appFirebase?: FirebaseApp | null): Promise<PebbleAuthorization> => {
  let pebbleOptions = {
    appFirebase,
    authEndpoint : `${authServer}/auth`,
    options
  }

  const authResponse = await fetchAuthToken(pebbleOptions);

  const pebbleAuthorization = new PebbleAuthorization(authResponse.resp, pebbleOptions);

  return pebbleAuthorization;
};

const signOutFunction = async (appFirebase?: FirebaseApp | null) => {
  const auth = getAuth(appFirebase !== null && appFirebase !== undefined ? appFirebase : undefined);
  signOut(auth).then(() => {
  }).catch((error) => {
    throw new SignOutError(error.message);
  });
};

export {
  signInWithFirebase,
  initializeAuthServer,
  signInWithGoogle,
  signInWithMicrosoft,
  getLicences,
  pebbleAuthentification,
  signOutFunction
};
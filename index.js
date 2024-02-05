// PebbleAuthFunctions.js
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import FirebaseApp from "firebase/app";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import PebbleAuthToken from "@pebble-solutions/pebble-auth-client/lib/Models/PebbleAuthToken";
import { GoogleInProgressError, GooglePlayServicesNotAvailaibableError, GoogleSignInCancelledError, GoogleSignInError } from "./errors.js";

/**
 * Effectue une authentification Firebase en utilisant un couple utilisateur/mot de passe.
 *
 * @param {string} email
 * @param {string} password
 * @param {?FirebaseApp} app
 * 
 * @returns {Promise<User>}
 *
 * @example
 * // Appel de la fonction dans le code
 * await signInWithFirebase('test@pebble.bzh',test);
 */
const signInWithFirebase = async (email, password, app) => {
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(app), email, password);
    const data = userCredential.user;
    return data
  } catch (error) {
    return error
  }
};

let authServe = 'https://pebbleauthserver-xbnqmf3wfa-ew.a.run.app/';

let webClientId = '906119417386-8vilphgoe5hgjtol859ef2sgodjrlpuq.apps.googleusercontent.com';

/**
 * Effectue une initialisation de l'url authServe et du webClientId
 *
 * @param {object} options
 * - authServer string  : Initialisation facultative, valeur par defaut
 * - webClientId string : Initialisation facultative, valeur par defaut
 *
 */
const initializeAuthServer = (options) => {
  if (options.authServer) authServe = options.authServer;
  if (options.webClientId) webClientId = options.webClientId;
};

GoogleSignin.configure({webClientId});

/**
 * Effectue une connexion avec Google en utilisant le service Google Sign-In.
 * 
 * @param {?FirebaseApp} app
 *
 * @returns {Promise<User>} - Une promesse qui se résout après la connexion réussie ou qui est rejetée en cas d'échec.
 * 
 * @throws {GoogleSignInCancelledError}               
 * @throws {GoogleInProgressError}                    
 * @throws {GooglePlayServicesNotAvailaibableError}   
 * @throws {GoogleSignInError}                            
 * 
 * @example
 * // Appel de la fonction dans le code
 * await signInWithGoogle()
 */
const signInWithGoogle = async (app) => {
  try {
    await GoogleSignin.hasPlayServices();

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(getAuth(app), googleCredential);
    const data = userCredential.user;

    return data;
  } catch (error) {
    // Gère les erreurs spécifiques à Google Sign-In
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new GoogleSignInCancelledError(error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new GoogleInProgressError(error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new GooglePlayServicesNotAvailaibableError(error);
    } else {
      throw new GoogleSignInError(error);
    }
  }
};


/**
 * Récupère les licences depuis le serveur en utilisant une requête GET.
 * 
 * @param {object} options
 * - app                string    Only licences affected to the provided application value will be returned.
 * - include_disabled   integer   If true, licences that is not currently active for the user are returned. Example : expired licences.
 * - tenant_id          string    If exists, return only licences that match with the provided tenant_id value.
 * @param {?FirebaseApp} appFirebase
 * 
 * @returns {Promise<void>}
 * 
 * @throws {Error} Return http error from the authorization server
 *
 * @example
 * // Appel de la fonction dans le code
 * await getLicences();
 */
const getLicences = async (options, appFirebase) => {
  try {
    let url = `${authServe}/licences`;
    let i = 0;
    for (const key in options) {
      const sep = i > 0 ? '&' : '?';
      url += `${sep}${key}=${options[key]}`
      i++;
    }

    const auth = getAuth(appFirebase);
    const idToken = await auth.currentUser?.getIdToken();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      // Gérer les erreurs HTTP
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      // Gérer le cas où la réponse n'est pas un tableau
      throw new Error('Réponse inattendue du serveur lors de la récupération des licences');
    }
  } catch (error) {
    // Rejeter la promesse avec l'erreur pour une gestion plus propre des erreurs
    console.error('Erreur lors de la récupération des licences:', error);
    throw error;
  }
};


/**
 * Effectue une authentification Pebble en utilisant l'API serveur.
 *
 * @param {object} options
 * - app          string  mandatory   Authenticate user to the provided application. One token is served for one application.
 * - tenant_id    string              Tenant that will consume resources. This property is mandatory if multiple tenants are returned by licence request.
 * 
 * @param {?FirebaseApp} appFirebase
 *
 * @returns {Promise<PebbleAuthToken>}
 * 
 * @throws {Error} Si la requête d'authentification échoue.
 *
 * @example
 * // Appel de la fonction dans le code
 * await pebbleAuthentification(options, appFirebase);
 */
const pebbleAuthentification = async (options, appFirebase) => {
  try {
    const auth = getAuth(appFirebase);

    // const auth = getAuth(appFirebase instanceof FirebaseApp ? appFirebase : undefined);
    
    const idToken = await auth.currentUser?.getIdToken();
    const response = await fetch(
      `${authServe}/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(options),
      }
    );

    const data = await response.json();
    const pebbleAuthToken = new PebbleAuthToken(data);
    const user = auth.currentUser;

    return {pebbleAuthToken, user};
  } catch (error) {
    throw new Error('Erreur d\'authentification Pebble: ' + error);
  }
};

module.exports = {
  signInWithFirebase : signInWithFirebase,
  initializeAuthServer : initializeAuthServer,
  signInWithGoogle : signInWithGoogle,
  getLicences : getLicences,
  pebbleAuthentification : pebbleAuthentification
}

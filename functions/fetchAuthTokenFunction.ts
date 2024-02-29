import { getAuth } from 'firebase/auth';
import { DisconnectedError, PebbleServerError } from "../errors";
import type { AuthResponse } from '../types/AuthResponse';

import { AuthorizationOptions } from "../types/AuthorizationOptions";

/**
 * Pebble authentication function.
 * It returns information related to the authorization token and Firebase authentication data.
 * 
 * @throws DisconnectedError
 * @throws PebbleServerError 
 */
async function fetchAuthToken(options: AuthorizationOptions): Promise<AuthResponse> {
        
    const auth = getAuth(options.appFirebase !== null && options.appFirebase !== undefined ? options.appFirebase : undefined);
    if (!auth.currentUser) {
        throw DisconnectedError;
    }
    const idToken = await auth.currentUser.getIdToken();
    const response = await fetch(
        `${options.authEndpoint}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(options.options),
        }
    );
    if (!response.ok) {
        let error = await response.text();
        throw new PebbleServerError(error);
    }
    const resp = await response.json();

    return { auth, resp };
}

export { fetchAuthToken };

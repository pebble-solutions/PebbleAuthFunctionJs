"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignOutError = exports.PebbleServerError = exports.DisconnectedError = exports.UserDoesNotExistError = exports.UnexpectedApiResponseError = exports.UnexpectedLicenseResponseError = exports.LicenseRetrievalError = exports.MicrosoftAuthenticationError = exports.GoogleAuthenticationError = exports.FirebaseAuthenticationError = void 0;
/**
 * Erreur indiquant que l'authentification avec Firebase a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Firebase.
 */
class FirebaseAuthenticationError extends Error {
    constructor(message) {
        let error = 'Erreur lors de l\'authentification avec Firebase.';
        if (message)
            error += ' Message d\'erreur : ' + message;
        super(error);
        this.name = 'FirebaseAuthenticationError';
    }
}
exports.FirebaseAuthenticationError = FirebaseAuthenticationError;
/**
 * Erreur indiquant que l'authentification avec Google a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Google.
 */
class GoogleAuthenticationError extends Error {
    constructor(message) {
        let error = 'Erreur lors de l\'authentification avec Google.';
        if (message)
            error += ' Message d\'erreur : ' + message;
        super(error);
        this.name = 'GoogleAuthenticationError';
    }
}
exports.GoogleAuthenticationError = GoogleAuthenticationError;
/**
 * Erreur indiquant que l'authentification avec Microsoft a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Microsoft.
 */
class MicrosoftAuthenticationError extends Error {
    constructor(message) {
        let error = 'Erreur lors de l\'authentification avec Microsoft.';
        if (message)
            error += ' Message d\'erreur : ' + message;
        super(error);
        this.name = 'MicrosoftAuthenticationError';
    }
}
exports.MicrosoftAuthenticationError = MicrosoftAuthenticationError;
/**
 * Erreur indiquant que l'authentification a échoué lors de la récupération des licences.
 * Cette erreur peut survenir lorsqu'une erreur HTTP se produit lors de la récupération des licences depuis le serveur d'autorisation.
 */
class LicenseRetrievalError extends Error {
    constructor(statusCode) {
        super(`Erreur lors de la récupération des licences. Statut HTTP: ${statusCode}`);
        this.name = 'LicenseRetrievalError';
    }
}
exports.LicenseRetrievalError = LicenseRetrievalError;
/**
 * Erreur indiquant une réponse inattendue du serveur lors de la récupération des licences.
 * Cette erreur peut survenir lorsque la réponse du serveur ne correspond pas au format attendu lors de la récupération des licences.
 */
class UnexpectedLicenseResponseError extends Error {
    constructor() {
        super('Réponse inattendue du serveur lors de la récupération des licences.');
        this.name = 'UnexpectedLicenseResponseError';
    }
}
exports.UnexpectedLicenseResponseError = UnexpectedLicenseResponseError;
/**
 * Erreur indiquant une réponse inattendue du serveur lors de la récupération des licences au niveau de l'appel API.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'appel au serveur pour récupérer les licences.
 */
class UnexpectedApiResponseError extends Error {
    constructor(error) {
        super('Erreur lors de la récupération des licences depuis l\'API : ' + error.message);
        this.name = 'UnexpectedApiResponseError';
        this.parentError = error;
    }
}
exports.UnexpectedApiResponseError = UnexpectedApiResponseError;
/**
 * Error indicating that the user does not exist.
 * This error might occur when the returned user is null.
 */
class UserDoesNotExistError extends Error {
    constructor(error) {
        super('Erreur, l\'utilisateur n\'existe pas : ' + error.message);
        this.name = 'UserDoesNotExistError';
        this.parentError = error;
    }
}
exports.UserDoesNotExistError = UserDoesNotExistError;
/**
 * Error indicating that the user is not connected.
 * This error might occur when the user is not connected.
 */
class DisconnectedError extends Error {
    constructor(error) {
        super('Error, the user is not connected: ' + error.message);
        this.name = 'DisconnectedError';
        this.parentError = error;
    }
}
exports.DisconnectedError = DisconnectedError;
/**
 * Error indicating an error occurred when the Pebble server receives an error.
 * This error might occur when the Pebble server receives an error.
 */
class PebbleServerError extends Error {
    constructor(message) {
        let error = 'Error retrieving the token.';
        if (message)
            error += ' Returned message: ' + message;
        super(error);
        this.name = 'PebbleServerError';
    }
}
exports.PebbleServerError = PebbleServerError;
class SignOutError extends Error {
    constructor(message) {
        let error = 'Error during disconnection.';
        if (message)
            error += ' Returned message: ' + message;
        super(error);
        this.name = 'SignOutError';
    }
}
exports.SignOutError = SignOutError;

/**
 * Erreur indiquant que l'authentification avec Firebase a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Firebase.
 */
export class FirebaseAuthenticationError extends Error {
    constructor(message?: string) {
        let error = 'Erreur lors de l\'authentification avec Firebase.';
        if (message) error += ' Message d\'erreur : ' + message;
        super(error);
        this.name = 'FirebaseAuthenticationError';
    }
}

/**
 * Erreur indiquant que l'authentification avec Google a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Google.
 */
export class GoogleAuthenticationError extends Error {
    constructor(message?: string) {
        let error = 'Erreur lors de l\'authentification avec Google.';
        if (message) error += ' Message d\'erreur : ' + message;
        super(error);
        this.name = 'GoogleAuthenticationError';
    }
}

/**
 * Erreur indiquant que l'authentification avec Microsoft a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Microsoft.
 */
export class MicrosoftAuthenticationError extends Error {
    constructor(message?: string) {
        let error = 'Erreur lors de l\'authentification avec Microsoft.';
        if (message) error += ' Message d\'erreur : ' + message;
        super(error);
        this.name = 'MicrosoftAuthenticationError';
    }
}

/**
 * Erreur indiquant que l'authentification a échoué lors de la récupération des licences.
 * Cette erreur peut survenir lorsqu'une erreur HTTP se produit lors de la récupération des licences depuis le serveur d'autorisation.
 */
export class LicenseRetrievalError extends Error {
    constructor(statusCode: number) {
        super(`Erreur lors de la récupération des licences. Statut HTTP: ${statusCode}`);
        this.name = 'LicenseRetrievalError';
    }
}

/**
 * Erreur indiquant une réponse inattendue du serveur lors de la récupération des licences.
 * Cette erreur peut survenir lorsque la réponse du serveur ne correspond pas au format attendu lors de la récupération des licences.
 */
export class UnexpectedLicenseResponseError extends Error {
    constructor() {
        super('Réponse inattendue du serveur lors de la récupération des licences.');
        this.name = 'UnexpectedLicenseResponseError';
    }
}

/**
 * Erreur indiquant une réponse inattendue du serveur lors de la récupération des licences au niveau de l'appel API.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'appel au serveur pour récupérer les licences.
 */
export class UnexpectedApiResponseError extends Error {
    parentError: any;

    constructor(error: any) {
        super('Erreur lors de la récupération des licences depuis l\'API : ' + error.message);
        this.name = 'UnexpectedApiResponseError';
        this.parentError = error;
    }
}

/**
 * Error indicating that the user does not exist.
 * This error might occur when the returned user is null.
 */
export class UserDoesNotExistError extends Error {
    parentError: any;

    constructor(error: any) {
        super('Erreur, l\'utilisateur n\'existe pas : ' + error.message);
        this.name = 'UserDoesNotExistError';
        this.parentError = error;
    }
}

/**
 * Error indicating that the user is not connected.
 * This error might occur when the user is not connected.
 */
export class DisconnectedError extends Error {
    parentError: any;

    constructor(error: any) {
        super('Error, the user is not connected: ' + error.message);
        this.name = 'DisconnectedError'
        this.parentError = error;
    }
}

/**
 * Error indicating an error occurred when the Pebble server receives an error.
 * This error might occur when the Pebble server receives an error.
 */
export class PebbleServerError extends Error {

    constructor(message?:string) {
        let error = 'Error retrieving the token.';
        if (message) error+= ' Returned message: ' + message;  
        super(error);
        this.name = 'PebbleServerError'
    }
}

export class SignOutError extends Error {
    constructor(message?:string) {
        let error = 'Error during disconnection.';
        if (message) error+= ' Returned message: ' + message;  
        super(error);
        this.name = 'SignOutError'
    }
}
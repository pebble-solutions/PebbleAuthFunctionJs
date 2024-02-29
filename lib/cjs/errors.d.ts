/**
 * Erreur indiquant que l'authentification avec Firebase a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Firebase.
 */
export declare class FirebaseAuthenticationError extends Error {
    constructor(message?: string);
}
/**
 * Erreur indiquant que l'authentification avec Google a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Google.
 */
export declare class GoogleAuthenticationError extends Error {
    constructor(message?: string);
}
/**
 * Erreur indiquant que l'authentification avec Microsoft a échoué.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'authentification avec Microsoft.
 */
export declare class MicrosoftAuthenticationError extends Error {
    constructor(message?: string);
}
/**
 * Erreur indiquant que l'authentification a échoué lors de la récupération des licences.
 * Cette erreur peut survenir lorsqu'une erreur HTTP se produit lors de la récupération des licences depuis le serveur d'autorisation.
 */
export declare class LicenseRetrievalError extends Error {
    constructor(statusCode: number);
}
/**
 * Erreur indiquant une réponse inattendue du serveur lors de la récupération des licences.
 * Cette erreur peut survenir lorsque la réponse du serveur ne correspond pas au format attendu lors de la récupération des licences.
 */
export declare class UnexpectedLicenseResponseError extends Error {
    constructor();
}
/**
 * Erreur indiquant une réponse inattendue du serveur lors de la récupération des licences au niveau de l'appel API.
 * Cette erreur peut survenir lorsqu'une erreur se produit lors de l'appel au serveur pour récupérer les licences.
 */
export declare class UnexpectedApiResponseError extends Error {
    parentError: any;
    constructor(error: any);
}
/**
 * Error indicating that the user does not exist.
 * This error might occur when the returned user is null.
 */
export declare class UserDoesNotExistError extends Error {
    parentError: any;
    constructor(error: any);
}
/**
 * Error indicating that the user is not connected.
 * This error might occur when the user is not connected.
 */
export declare class DisconnectedError extends Error {
    parentError: any;
    constructor(error: any);
}
/**
 * Error indicating an error occurred when the Pebble server receives an error.
 * This error might occur when the Pebble server receives an error.
 */
export declare class PebbleServerError extends Error {
    constructor(message?: string);
}
export declare class SignOutError extends Error {
    constructor(message?: string);
}

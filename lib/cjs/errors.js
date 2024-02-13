"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSignInError = exports.GooglePlayServicesNotAvailaibableError = exports.GoogleInProgressError = exports.GoogleSignInCancelledError = void 0;
class GoogleSignInCancelledError extends Error {
    constructor(error) {
        super('La connexion avec Google a été annulée.');
        this.name = 'GoogleSignInCancelledError';
        this.parentError = error;
    }
}
exports.GoogleSignInCancelledError = GoogleSignInCancelledError;
class GoogleInProgressError extends Error {
    constructor(error) {
        super('Une autre opération de connexion est déjà en cours.');
        this.name = 'GoogleInProgressError';
        this.parentError = error;
    }
}
exports.GoogleInProgressError = GoogleInProgressError;
class GooglePlayServicesNotAvailaibableError extends Error {
    constructor(error) {
        super('Les services Google Play ne sont pas disponibles.');
        this.name = 'GooglePlayServicesNorAvailaibableError';
        this.parentError = error;
    }
}
exports.GooglePlayServicesNotAvailaibableError = GooglePlayServicesNotAvailaibableError;
class GoogleSignInError extends Error {
    constructor(error) {
        super('Erreur lors de la connexion avec Google: ' + error.message);
        this.name = 'GoogleSignInError';
        this.parentError = error;
    }
}
exports.GoogleSignInError = GoogleSignInError;

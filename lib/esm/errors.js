export class GoogleSignInCancelledError extends Error {
    parentError;
    constructor(error) {
        super('La connexion avec Google a été annulée.');
        this.name = 'GoogleSignInCancelledError';
        this.parentError = error;
    }
}
export class GoogleInProgressError extends Error {
    parentError;
    constructor(error) {
        super('Une autre opération de connexion est déjà en cours.');
        this.name = 'GoogleInProgressError';
        this.parentError = error;
    }
}
export class GooglePlayServicesNotAvailaibableError extends Error {
    parentError;
    constructor(error) {
        super('Les services Google Play ne sont pas disponibles.');
        this.name = 'GooglePlayServicesNorAvailaibableError';
        this.parentError = error;
    }
}
export class GoogleSignInError extends Error {
    parentError;
    constructor(error) {
        super('Erreur lors de la connexion avec Google: ' + error.message);
        this.name = 'GoogleSignInError';
        this.parentError = error;
    }
}

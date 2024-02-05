export class GoogleSignInCancelledError extends Error {
    parentError: any;

    constructor(error: any) {
        super('La connexion avec Google a été annulée.');
        this.name = 'GoogleSignInCancelledError';
        this.parentError = error;
    }
}

export class GoogleInProgressError extends Error {
    parentError: any;

    constructor(error: any) {
        super('Une autre opération de connexion est déjà en cours.');
        this.name = 'GoogleInProgressError';
        this.parentError = error;
    }
}

export class GooglePlayServicesNotAvailaibableError extends Error {
    parentError: any;

    constructor(error: any) {
        super('Les services Google Play ne sont pas disponibles.');
        this.name = 'GooglePlayServicesNorAvailaibableError';
        this.parentError = error;
    }
}

export class GoogleSignInError extends Error {
    parentError: any;

    constructor(error: any) {
        super('Erreur lors de la connexion avec Google: ' + error.message);
        this.name = 'GoogleSignInError';
        this.parentError = error;
    }
}

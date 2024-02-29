export interface AuthorizationInterface {
    /**
     * Get token method should return a valid token from storage or from an authorization process. If the stored token
     * has expired, it should get a new one from the authorization process.
     */
    getToken(): Promise<string>;
}

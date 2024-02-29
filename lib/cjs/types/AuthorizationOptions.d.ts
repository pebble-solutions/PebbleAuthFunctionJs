import { FirebaseApp } from "firebase/app";
import { AuthClientOptions } from "./AuthClientOptions";
export type AuthorizationOptions = {
    appFirebase?: FirebaseApp | null;
    authEndpoint: string;
    options: AuthClientOptions;
};

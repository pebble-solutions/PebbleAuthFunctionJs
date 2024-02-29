import { PebbleTokenData } from "@pebble-solutions/pebble-auth-client/lib/Types";
import { Auth } from "firebase/auth";

export type AuthResponse = {
    auth: Auth;
    resp: PebbleTokenData;
};
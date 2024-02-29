"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAuthToken = void 0;
const auth_1 = require("firebase/auth");
const errors_1 = require("../errors");
/**
 * Pebble authentication function.
 * It returns information related to the authorization token and Firebase authentication data.
 *
 * @throws DisconnectedError
 * @throws PebbleServerError
 */
function fetchAuthToken(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = (0, auth_1.getAuth)(options.appFirebase !== null && options.appFirebase !== undefined ? options.appFirebase : undefined);
        if (!auth.currentUser) {
            throw errors_1.DisconnectedError;
        }
        const idToken = yield auth.currentUser.getIdToken();
        const response = yield fetch(`${options.authEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(options.options),
        });
        if (!response.ok) {
            let error = yield response.text();
            throw new errors_1.PebbleServerError(error);
        }
        const resp = yield response.json();
        return { auth, resp };
    });
}
exports.fetchAuthToken = fetchAuthToken;

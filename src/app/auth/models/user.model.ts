export class User {
    constructor(
        public email: string,
        public username: string,
        public roles: Array<string>,
        private _accessToken: string,
        private _isAccessTokenExpired: boolean
    ) { }

    get accessToken() {
        if (this._isAccessTokenExpired) {
            return null;
        }
        return this._accessToken;
    }
}
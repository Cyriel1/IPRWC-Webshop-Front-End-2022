export class AuthResponse {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public roles: Array<string>,
        public accessToken: string,
        public tokenType: string
    ) { }
}
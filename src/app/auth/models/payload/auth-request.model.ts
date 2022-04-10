export class AuthRequest {
    constructor(
        public email: string,
        public username: string,
        public password: string
    ) { }
}
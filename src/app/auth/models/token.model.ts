export class Token {
    constructor(
        public id:number,
        public email: string,
        public roles: Array<string>,
        public sub: string,
        public exp: number,
        public iat: number
    ) { }
}
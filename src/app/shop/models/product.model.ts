export class Product {
    constructor(
        public id: number,
        public price: number,
        public name: string,
        public description: string,
        public status: string,
        public image: string
    ) { }
}
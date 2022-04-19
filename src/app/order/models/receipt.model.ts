import { Profile } from "src/app/profile/models/profile.model";
import { Order } from "./order.model";

export class Receipt {
    constructor(
        public profile: Profile,
        public orders: Order[],
        public timestamp: string
    ) { }
}
import { Data } from '@angular/router';

export class Medicines{
    constructor(
        public id: number,
        public name: string,
        public medical_type: string,
        public buy_price: string,
        public sell_price: string,
        public batch_no: string,
        public shelf_no: number,
        public exp_date: Date,
        public mfg_date: Date,
        public description: string,
        public in_stock_total: number,
    ){}
}

export class Company{
    constructor(
        public id: number,
        public name: string,
        public license_no: string,
        public address: string,
        public contact_no: string,
        public email: string,
        public description: string,
        public bank_id: number //drop downn list
    ){}
}

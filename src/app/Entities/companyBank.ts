export class CompanyBank{
    constructor(
        public id: number,
        public bank_account_no: number,
        public ifsc_no: number,
        public company_id: number, // company drop down list showing list of companies
        public bank_name: string,
       
    ){}
}
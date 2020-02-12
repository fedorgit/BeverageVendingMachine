import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable()
export class TransactionService {

    private url = "/api/transaction";

    constructor(private http: HttpClient) {
    }

    getCurrentTransaction() {

        return this.http.get(this.url + '/get-current-transaction-summa');
    }

    addCoin(id: number) {

        return this.http.get(this.url + '/add-coin/' + id);
    }

    returnCoin() {

        return this.http.get(this.url + '/return-coin');
    }
    
}
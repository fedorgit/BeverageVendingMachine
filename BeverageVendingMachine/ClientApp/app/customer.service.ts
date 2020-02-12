import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Coin } from './coin';

@Injectable()
export class CustomerService {

    private url = "/api/customer";

    constructor(private http: HttpClient) {
    }

    // [domain]/api/customer/get-products
    getProducts() {
        return this.http.get(this.url + '/get-products');
    }


    // [domain]/api/customer/get-coins
    getCoins() {
        return this.http.get(this.url + '/get-coins');
    }

    // [domain]/url/api/customer/get-coin/{id}
    getCoin(id: number) {
        return this.http.get(this.url + '/get-coin/' + id);
    }

    // [domain]/url/api/customer/update-coin/{id}
    updateCoin(coin: Coin) {
        return this.http.put(this.url + '/update-coin/' + coin.id, coin);
    }

    // [domain]/url/api/customer/delete-coin/{id}
    deleteCoin(id: number) {
        return this.http.delete(this.url + '/delete-coin/' + id);
    }
    
    // [domain]/url/api/customer/get-current-summa-transaction
    getCurrentSummaTransaction() {
        return this.http.get(this.url + '/get-current-summa-transaction');
    }

    depositCoin(coin: Coin) {
        return this.http.get(this.url + '/deposit-coin/' + coin.id);
    }

    returnCoin() {
        return this.http.get(this.url + '/return-coin');
    }

    tradeProduct(product: Product) {
        return this.http.get(this.url + '/trade-product/' + product.id);
    }
}
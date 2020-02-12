import { Component, OnInit } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { CustomerService } from './customer.service';
import { Product } from './product';
import { Coin } from './coin';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: ['./home.component.css'],
    providers: [CustomerService]
})

export class HomeComponent implements OnInit {

    product: Product = new Product();
    products: Product[];
    coins: Coin[];

    summa: number = 0;

    constructor(
        private customerService: CustomerService,
        private notifierService: NotifierService
    ) { }

    ngOnInit() {
        this.loadProducts();
        this.loadCoins();
        this.loadCurrentTransaction();
    }

    loadProducts() {
        this.customerService.getProducts()
            .subscribe((response: Product[]) => this.products = response);
    }

    loadCoins() {
        this.customerService.getCoins()
            .subscribe((response: Coin[]) => this.coins = response);
    }

    loadCurrentTransaction() {

        this.customerService.getCurrentSummaTransaction()
            .subscribe((response: number) => this.summa = response)
    }


    tradeProduct(product: Product) {

        this.customerService.tradeProduct(product)
            .subscribe(
                (response: Product) => {

                    this.notifierService.notify('info', 'Вы получили ' + response.name);

                    this.loadProducts();

                    this.loadCurrentTransaction();
                },
                error => {

                    this.notifierService.notify('error', 'Невозможно получить заказ: ' + error.error);
                }
            );
    }

    depositCoin(coin: Coin) {

        this.customerService.depositCoin(coin)
            .subscribe(
                (response: Coin) => {

                    this.notifierService.notify('success', 'Внесена монета с номиналом ' + response.nominal);

                    this.loadCurrentTransaction();
                },
                error => {

                    this.notifierService.notify('error', 'Невозможно внести монету: ' + error.error);
                }
            );
    }

    returnCoin() {

        this.customerService.returnCoin()
            .subscribe(
                (response: Coin[]) => {

                    this.notifierService.notify('success', 'Вы получили сдачу:');

                    for (let coin of response) {

                        let money: string = coin.count == 1 ? ' монета' : ' монеты';

                        this.notifierService.notify('success', coin.count + money + ' с номиналом ' + coin.nominal);
                    }

                    this.loadCurrentTransaction();
                },
                error => {

                    this.notifierService.notify('error', 'Невозможно получить сдачу: ' + error.error);
                }
            );
    }

}
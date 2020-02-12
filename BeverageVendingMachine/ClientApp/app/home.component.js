var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { CustomerService } from './customer.service';
import { Product } from './product';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(customerService, notifierService) {
        this.customerService = customerService;
        this.notifierService = notifierService;
        this.product = new Product();
        this.summa = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadProducts();
        this.loadCoins();
        this.loadCurrentTransaction();
    };
    HomeComponent.prototype.loadProducts = function () {
        var _this = this;
        this.customerService.getProducts()
            .subscribe(function (response) { return _this.products = response; });
    };
    HomeComponent.prototype.loadCoins = function () {
        var _this = this;
        this.customerService.getCoins()
            .subscribe(function (response) { return _this.coins = response; });
    };
    HomeComponent.prototype.loadCurrentTransaction = function () {
        var _this = this;
        this.customerService.getCurrentSummaTransaction()
            .subscribe(function (response) { return _this.summa = response; });
    };
    HomeComponent.prototype.tradeProduct = function (product) {
        var _this = this;
        this.customerService.tradeProduct(product)
            .subscribe(function (response) {
            _this.notifierService.notify('info', 'Вы получили ' + response.name);
            _this.loadProducts();
            _this.loadCurrentTransaction();
        }, function (error) {
            _this.notifierService.notify('error', 'Невозможно получить заказ: ' + error.error);
        });
    };
    HomeComponent.prototype.depositCoin = function (coin) {
        var _this = this;
        this.customerService.depositCoin(coin)
            .subscribe(function (response) {
            _this.notifierService.notify('success', 'Внесена монета с номиналом ' + response.nominal);
            _this.loadCurrentTransaction();
        }, function (error) {
            _this.notifierService.notify('error', 'Невозможно внести монету: ' + error.error);
        });
    };
    HomeComponent.prototype.returnCoin = function () {
        var _this = this;
        this.customerService.returnCoin()
            .subscribe(function (response) {
            _this.notifierService.notify('success', 'Вы получили сдачу:');
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var coin = response_1[_i];
                var money = coin.count == 1 ? ' монета' : ' монеты';
                _this.notifierService.notify('success', coin.count + money + ' с номиналом ' + coin.nominal);
            }
            _this.loadCurrentTransaction();
        }, function (error) {
            _this.notifierService.notify('error', 'Невозможно получить сдачу: ' + error.error);
        });
    };
    HomeComponent = __decorate([
        Component({
            selector: 'home',
            templateUrl: './home.component.html',
            styles: ['./home.component.css'],
            providers: [CustomerService]
        }),
        __metadata("design:paramtypes", [CustomerService,
            NotifierService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map
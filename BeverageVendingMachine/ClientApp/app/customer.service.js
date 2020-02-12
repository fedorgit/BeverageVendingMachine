var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CustomerService = /** @class */ (function () {
    function CustomerService(http) {
        this.http = http;
        this.url = "/api/customer";
    }
    // [domain]/api/customer/get-products
    CustomerService.prototype.getProducts = function () {
        return this.http.get(this.url + '/get-products');
    };
    // [domain]/api/customer/get-coins
    CustomerService.prototype.getCoins = function () {
        return this.http.get(this.url + '/get-coins');
    };
    // [domain]/url/api/customer/get-coin/{id}
    CustomerService.prototype.getCoin = function (id) {
        return this.http.get(this.url + '/get-coin/' + id);
    };
    // [domain]/url/api/customer/update-coin/{id}
    CustomerService.prototype.updateCoin = function (coin) {
        return this.http.put(this.url + '/update-coin/' + coin.id, coin);
    };
    // [domain]/url/api/customer/delete-coin/{id}
    CustomerService.prototype.deleteCoin = function (id) {
        return this.http.delete(this.url + '/delete-coin/' + id);
    };
    // [domain]/url/api/customer/get-current-summa-transaction
    CustomerService.prototype.getCurrentSummaTransaction = function () {
        return this.http.get(this.url + '/get-current-summa-transaction');
    };
    CustomerService.prototype.depositCoin = function (coin) {
        return this.http.get(this.url + '/deposit-coin/' + coin.id);
    };
    CustomerService.prototype.returnCoin = function () {
        return this.http.get(this.url + '/return-coin');
    };
    CustomerService.prototype.tradeProduct = function (product) {
        return this.http.get(this.url + '/trade-product/' + product.id);
    };
    CustomerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], CustomerService);
    return CustomerService;
}());
export { CustomerService };
//# sourceMappingURL=customer.service.js.map
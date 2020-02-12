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
import { Product } from './product';
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.url = "/api/products";
    }
    ProductService.prototype.getProducts = function () {
        return this.http.get(this.url);
    };
    ProductService.prototype.createProduct = function () {
        //const fd = new FormData();
        // https://developer.mozilla.org/ru/docs/Web/API/FormData/append
        //fd.append('image', selectedFile, selectedFile.name);
        //this.http.post('./api/image-upload', fd)
        //    .subscribe(res => {
        //        console.log('res: ', res);
        //    });
        //product.imageFile = selectedFile.name;
        var product = new Product();
        return this.http.post(this.url, product);
    };
    ProductService.prototype.updateProduct = function (product) {
        return this.http.put(this.url + '/' + product.id, product);
    };
    ProductService.prototype.deleteProduct = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    ProductService.prototype.tradeProduct = function (product) {
        return this.http.get(this.url + '/trade-product/' + product.id);
    };
    ProductService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product.service.js.map
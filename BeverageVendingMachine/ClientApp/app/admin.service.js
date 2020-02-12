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
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';
var AdminService = /** @class */ (function () {
    function AdminService(http, route) {
        this.http = http;
        this.route = route;
        this.url = "/api/admin";
        this.secretKey = '';
    }
    AdminService.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.secretKey = params.get("secretKey");
        });
    };
    AdminService.prototype.getProducts = function () {
        return this.http.get(this.url + '/get-products');
    };
    AdminService.prototype.createProduct = function () {
        //const fd = new FormData();
        // https://developer.mozilla.org/ru/docs/Web/API/FormData/append
        //fd.append('image', selectedFile, selectedFile.name);
        //this.http.post('./api/image-upload', fd)
        //    .subscribe(res => {
        //        console.log('res: ', res);
        //    });
        //product.imageFile = selectedFile.name;
        var product = new Product();
        return this.http.post(this.url + '/create-product', product);
    };
    AdminService.prototype.updateProduct = function (product) {
        return this.http.put(this.url + '/update-product/' + product.id, product);
    };
    AdminService.prototype.deleteProduct = function (id) {
        return this.http.delete(this.url + '/delete-product/' + id);
    };
    AdminService.prototype.uploadImageForProduct = function (product, image) {
        var formData = new FormData();
        formData.append('Image', image, image.name);
        return this.http.post('./api/admin/upload-image-for-product/' + product.id, formData);
    };
    AdminService.prototype.exportProduct = function (product) {
        return this.http.get('./api/admin/export-product/' + product.id);
    };
    AdminService.prototype.exportProducts = function () {
        return this.http.get('./api/admin/export-products', { responseType: 'blob' });
    };
    AdminService.prototype.importProducts = function (importFile) {
        var formData = new FormData();
        formData.append('importFile', importFile, importFile.name);
        console.log(formData);
        return this.http.post('./api/admin/import-products', formData);
    };
    // [domain]/api/customer/get-coins
    AdminService.prototype.getCoins = function () {
        return this.http.get(this.url + '/get-coins');
    };
    // [domain]/url/api/customer/get-coin/{id}
    AdminService.prototype.getCoin = function (id) {
        return this.http.get(this.url + '/get-coin/' + id);
    };
    // [domain]/url/api/customer/update-coin/{id}
    AdminService.prototype.updateCoin = function (coin) {
        return this.http.put(this.url + '/update-coin/' + coin.id, coin);
    };
    // [domain]/url/api/customer/delete-coin/{id}
    AdminService.prototype.deleteCoin = function (id) {
        return this.http.delete(this.url + '/delete-coin/' + id);
    };
    AdminService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, ActivatedRoute])
    ], AdminService);
    return AdminService;
}());
export { AdminService };
//# sourceMappingURL=admin.service.js.map
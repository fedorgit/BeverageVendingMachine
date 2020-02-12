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
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from "angular-notifier";
import { AdminService } from './admin.service';
import { saveAs } from 'file-saver';
//import { dateFormat } from './dateformat';
var dateFormat = require('dateformat');
var AdminComponent = /** @class */ (function () {
    function AdminComponent(adminService, notifierService) {
        this.adminService = adminService;
        this.notifierService = notifierService;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.loadProducts();
        this.loadCoins();
    };
    // получаем данные через сервис
    AdminComponent.prototype.loadProducts = function () {
        var _this = this;
        this.adminService.getProducts()
            .subscribe(function (response) { return _this.products = response; });
    };
    AdminComponent.prototype.loadCoins = function () {
        var _this = this;
        this.adminService.getCoins()
            .subscribe(function (response) { return _this.coins = response; });
    };
    AdminComponent.prototype.delete = function (p) {
        var _this = this;
        this.adminService.deleteProduct(p.id)
            .subscribe(function (response) { return _this.loadProducts(); });
    };
    AdminComponent.prototype.add = function () {
        var _this = this;
        this.adminService.createProduct().subscribe(function (data) { return _this.loadProducts(); });
    };
    AdminComponent.prototype.save = function (product) {
        var _this = this;
        this.adminService.updateProduct(product)
            .subscribe(function (response) {
            product.count = response.count;
            product.price = response.price;
            product.name = response.name;
            _this.notifierService.notify('success', 'Продукт ' + response.name + ' обновлен');
        });
    };
    AdminComponent.prototype.onImageSelected = function (product, images) {
        var _this = this;
        if (images.length === 0)
            return;
        var image = images.item(0);
        this.adminService.uploadImageForProduct(product, image)
            .subscribe(function (result) {
            _this.loadProducts();
        });
    };
    AdminComponent.prototype.saveCoin = function (coin) {
        var _this = this;
        this.adminService.updateCoin(coin)
            .subscribe(function (response) {
            coin.count = response.count;
            coin.isBlock = response.isBlock;
            _this.notifierService.notify('success', 'Монета номиналом ' + response.nominal + ' обновлена');
        });
    };
    AdminComponent.prototype.exportProducts = function () {
        var _this = this;
        this.adminService.exportProducts()
            .subscribe(function (blob) {
            var now = new Date();
            var currentData = dateFormat(now, "dd.mm.yyyy HH-MM-ss");
            var nameFile = 'ExportProducts ' + currentData + '.json';
            saveAs(blob, nameFile);
            _this.notifierService.notify('info', 'Данные о продуктах экспортируются в фаил: ' + nameFile);
        });
    };
    // not using
    AdminComponent.prototype.exportProduct = function (product) {
        this.adminService.exportProduct(product).subscribe(function (response) { });
    };
    AdminComponent.prototype.importProducts = function (importFiles) {
        var _this = this;
        if (importFiles.length === 0)
            return;
        var importFile = importFiles.item(0);
        this.adminService.importProducts(importFile)
            .subscribe(function () {
            _this.notifierService.notify('warning', 'Данные о продуктах импортированны из: ' + importFile.name);
            _this.loadProducts();
        });
    };
    AdminComponent = __decorate([
        Component({
            templateUrl: './admin.component.html',
            styles: ['./admin.component.css'],
            providers: [AdminService, HttpClientModule]
        }),
        __metadata("design:paramtypes", [AdminService,
            NotifierService])
    ], AdminComponent);
    return AdminComponent;
}());
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map
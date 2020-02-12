import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from "angular-notifier";
import { AdminService } from './admin.service';
import { saveAs } from 'file-saver';
import { Product } from './product';
import { Coin } from './coin';
//import { dateFormat } from './dateformat';

var dateFormat = require('dateformat');

@Component({
    templateUrl: './admin.component.html',
    styles: ['./admin.component.css'],
    providers: [AdminService, HttpClientModule]
})

export class AdminComponent implements OnInit {

    products: Product[];
    coins: Coin[];

    constructor(
        private adminService: AdminService,
        private notifierService: NotifierService
    ) { }

    ngOnInit() {
        this.loadProducts();
        this.loadCoins();
    }

    // получаем данные через сервис
    loadProducts() {
        this.adminService.getProducts()
            .subscribe((response: Product[]) => this.products = response);
    }

    loadCoins() {
        this.adminService.getCoins()
            .subscribe((response: Coin[]) => this.coins = response);
    }

    delete(p: Product) {
        this.adminService.deleteProduct(p.id)
            .subscribe(response => this.loadProducts());
    }

    add() {
        this.adminService.createProduct().subscribe(data => this.loadProducts());
    }

    save(product: Product) {

        this.adminService.updateProduct(product)
            .subscribe(
                (response: Product) => {

                    product.count = response.count;
                    product.price = response.price;
                    product.name = response.name;

                    this.notifierService.notify('success', 'Продукт ' + response.name + ' обновлен');
                }
            );
    }

    onImageSelected(product: Product, images: FileList) {

        if (images.length === 0)
            return;

        let image = <File>images.item(0);

        this.adminService.uploadImageForProduct(product, image)
            .subscribe((result: Product) => {

                this.loadProducts();
            });
    }

    saveCoin(coin: Coin) {

        this.adminService.updateCoin(coin)
            .subscribe(
                (response: Coin) => {

                    coin.count = response.count;
                    coin.isBlock = response.isBlock;

                    this.notifierService.notify('success', 'Монета номиналом ' + response.nominal + ' обновлена');
                }
            );
    }

    exportProducts() {

        this.adminService.exportProducts()
            .subscribe(blob => {

                let now = new Date();
                let currentData = dateFormat(now, "dd.mm.yyyy HH-MM-ss");

                let nameFile: string = 'ExportProducts ' + currentData + '.json';

                saveAs(blob, nameFile);

                this.notifierService.notify('info', 'Данные о продуктах экспортируются в фаил: ' + nameFile);
            });
    }

    // not using
    exportProduct(product: Product) {

        this.adminService.exportProduct(product).subscribe(response => { });
    }

    importProducts(importFiles: FileList) {

        if (importFiles.length === 0)
            return;

        let importFile = <File>importFiles.item(0);

        this.adminService.importProducts(importFile)
            .subscribe(() => {

                this.notifierService.notify('warning', 'Данные о продуктах импортированны из: ' + importFile.name);

                this.loadProducts();
            });
    }
}
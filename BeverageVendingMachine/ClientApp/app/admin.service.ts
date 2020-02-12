import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product';
import { Coin } from './coin';

@Injectable()
export class AdminService {

    private url = "/api/admin";

    private secretKey = '';

    constructor(private http: HttpClient, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.secretKey = params.get("secretKey")
        })
    }

    getProducts() {
        return this.http.get(this.url + '/get-products');
    }

    createProduct() {

        //const fd = new FormData();

        // https://developer.mozilla.org/ru/docs/Web/API/FormData/append
        //fd.append('image', selectedFile, selectedFile.name);
        
        //this.http.post('./api/image-upload', fd)
        //    .subscribe(res => {
        //        console.log('res: ', res);
        //    });

        //product.imageFile = selectedFile.name;

        let product = new Product();

        return this.http.post(this.url + '/create-product', product);
    }

    updateProduct(product: Product) {

        return this.http.put(this.url + '/update-product/' + product.id, product);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.url + '/delete-product/' + id);
    }

    uploadImageForProduct(product: Product, image: File) {

        const formData: FormData = new FormData();
        formData.append('Image', image, image.name);

        return this.http.post('./api/admin/upload-image-for-product/' + product.id, formData);
    }
    
    exportProduct(product: Product) {

        return this.http.get('./api/admin/export-product/' + product.id);
    }
    
    exportProducts() {

        return this.http.get('./api/admin/export-products', { responseType: 'blob' });
    }

    importProducts(importFile: File) {

        const formData: FormData = new FormData();
        formData.append('importFile', importFile, importFile.name);

        console.log(formData);

        return this.http.post('./api/admin/import-products', formData);
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
    
}
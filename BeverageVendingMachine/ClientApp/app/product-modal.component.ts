import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

import { Product } from './product';


@Component({
    selector: 'product-modal.component',
    templateUrl: './product-modal.component.html'
})

export class ProductModal implements OnInit {

    @ViewChild('content', {static: true}) content: any;
    public ngOnInit() {
    }

    public open() {
        if (!true) {
            // Dont open the modal
        } else {
            // Open the modal
            this.content.open();
        }

    }
}
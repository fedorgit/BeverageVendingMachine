import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NotifierModule } from "angular-notifier";

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AdminComponent } from './admin.component';

import { AdminService } from './admin.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, NotifierModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, AdminComponent, HomeComponent],
    providers: [AdminService],
    bootstrap: [AppComponent]
})
export class AppModule { }
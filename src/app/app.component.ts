import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
// import { BrowserModule } from '@angular/platform-browser';
// import {  MatPaginatorModule } from '@angular/material/paginator';
// import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule, SidebarComponent,],

  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

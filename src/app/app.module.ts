import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component'; 
import { SearchHistoryService } from './services/search-history.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule 
  ],
  providers: [SearchHistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

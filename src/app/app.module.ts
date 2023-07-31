import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { MermaidComponent } from './components/mermaid/mermaid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonMermaidComponent } from './components/json-mermaid/json-mermaid.component';

@NgModule({
  declarations: [
    AppComponent,
    MermaidComponent,
    JsonMermaidComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

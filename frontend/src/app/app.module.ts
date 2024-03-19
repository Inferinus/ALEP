import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanApplicationFormComponent } from './components/loan-application-form/loan-application-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoanApplicationFormComponent,
    // Add other component declarations here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Add other module imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

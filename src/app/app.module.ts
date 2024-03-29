import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeComponent } from './trade/trade.component';
import { HttpClientModule } from '@angular/common/http';
import { TradelistComponent } from './trade/tradelist/tradelist.component';
import { DashboardComponent } from './dashboard-component/dashboard-component.component';

@NgModule({
  declarations: [AppComponent, TradeComponent, TradelistComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

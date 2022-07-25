import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeComponent } from './trade/trade.component';
import { TradelistComponent } from './trade/tradelist/tradelist.component';
import { DashboardComponent } from "./dashboard-component/dashboard-component.component";

const routes: Routes = [
  { path: 'trade', component: TradeComponent },
  { path: 'tradelist', component: TradelistComponent },
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

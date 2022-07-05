import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeComponent } from './trade/trade.component';
import { TradelistComponent } from './trade/tradelist/tradelist.component';

const routes: Routes = [
  { path: 'trade', component: TradeComponent },
  { path: 'tradelist', component: TradelistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

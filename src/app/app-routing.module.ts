import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_PATHS } from "./core/constants/router-paths.constants";
import { ErrorComponent } from "./features/error/error.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { LoginComponent } from "./features/login/login.component";
import { LayoutComponent } from "./shared/templates/layout/layout.component";
import { HomeComponent } from "./features/home/home.component";
import { OrdersComponent } from "./features/orders/orders.component";
import { CouriersComponent } from "./features/couriers/couriers.component";
import { CouriersDetailComponent } from "./features/couriers-detail/couriers-detail.component";
import { ConsensusComponent } from "./features/consensus/consensus.component";

const routes: Routes = [
  {
    path: ROUTE_PATHS.error,
    component: ErrorComponent
  },
  {
    path: ROUTE_PATHS.login,
    component: LoginComponent
  },
  {
    path: ROUTE_PATHS.home,
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: ROUTE_PATHS.home,
        component: HomeComponent
      },
      {
        path: ROUTE_PATHS.orders,
        component: OrdersComponent
      },
      {
        path: ROUTE_PATHS.couriers,
        component: CouriersComponent
      },
      {
        path: ROUTE_PATHS.couriers + "/:courierId",
        component: CouriersDetailComponent
      },
      {
        path: ROUTE_PATHS.consensus,
        component: ConsensusComponent
      }
    ]
  },
  { path: '**', redirectTo: ROUTE_PATHS.login }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren:
      "./web/main/authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "home",
    loadChildren:
      "./web/main/home/home.module#HomeModule"
  },
  {
    path: "**",
    loadChildren:
      "./web/main/authentication/authentication.module#AuthenticationModule"
    //component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

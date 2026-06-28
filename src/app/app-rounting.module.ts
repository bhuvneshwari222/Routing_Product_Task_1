import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeDashboardComponent } from "./components/home-dashboard/home-dashboard.component";
import { UsersDashboardComponent } from "./components/users-dashboard/users-dashboard.component";
import { ProductsDashboardComponent } from "./components/products-dashboard/products-dashboard.component";
import { FairsDashboardComponent } from "./components/fairs-dashboard/fairs-dashboard.component";
import { ProductComponent } from "./components/products-dashboard/product/product.component";
import { ProductFormComponent } from "./components/products-dashboard/product-form/product-form.component";
import { UserFormComponent } from "./components/users-dashboard/user-form/user-form.component";
import { UserDetailsComponent } from "./components/users-dashboard/user-details/user-details.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomeDashboardComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UsersDashboardComponent,
        children: [
            {
                path: 'addUser',
                component: UserFormComponent
            },
            {
                path: ':userID',
                component: UserDetailsComponent
            },
            {
                path: ':userID/edit',
                component: UserFormComponent
            }
        ]
    },
    {
        path: 'products',
        component: ProductsDashboardComponent,
        children: [
            {
                path: 'addProduct',
                component: ProductFormComponent
            },
            {
                path: ':prodID',
                component: ProductComponent
            },
            {
                path: ':prodID/edit',
                component: ProductFormComponent
            }
        ]
    },
    {
        path: 'fairs',
        component: FairsDashboardComponent
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRountingModule {

}
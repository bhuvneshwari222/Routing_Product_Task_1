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
import { FairsDetailsComponent } from "./components/fairs-dashboard/fairs-details/fairs-details.component";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthGuard } from "./service/auth.guard";
import { UserRoleGuard } from "./service/userRole.guard";
import { CanDeactivateGuard } from "./service/can-deactivate.guard";
import { ProductResolver } from "./service/products.resolver";
import { NewProductsResolver } from "./service/new-products.resolver";
import { UsersResolver } from "./service/users.resolver";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'home',
        title: 'Home',
        component: HomeDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        data: {
            userRoles: ['admin', 'superAdmin', 'buyer']
        }
    },
    // {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    // },
    {
        path: 'users',
        title: 'Users',
        component: UsersDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        data: {
            userRoles: ['admin', 'superAdmin']
        },
        resolve: {
            users: UsersResolver
        },
        children: [
            {
                path: 'addUser',
                component: UserFormComponent
            },
            {
                path: ':userID',
                component: UserDetailsComponent,
                resolve: {
                    user: UsersResolver
                }
            },
            {
                path: ':userID/edit',
                component: UserFormComponent,
                canDeactivate: [CanDeactivateGuard],
            }
        ]
    },
    {
        path: 'products',
        title: 'Products',
        component: ProductsDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        resolve: {
            // products: ProductResolver
            products: NewProductsResolver
        },
        data: {
            userRoles: ['admin', 'superAdmin', 'buyer']
        },
        children: [
            {
                path: 'addProduct',
                component: ProductFormComponent
            },
            {
                path: ':prodID',
                component: ProductComponent,
                resolve: {
                    product: NewProductsResolver
                },
            },
            {
                path: ':prodID/edit',
                component: ProductFormComponent,
                canDeactivate: [CanDeactivateGuard],
            }
        ]
    },
    {
        path: 'fairs',
        title: 'Fairs',
        component: FairsDashboardComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        data: {
            userRoles: ['superAdmin']
        },
        children: [
            {
                path: ':fairID',
                component: FairsDetailsComponent
            }
        ]
    },
    {
        path: 'page-not-found',
        component: PageNotFoundComponent,
        data: {
            msg: `Page Not Found !!!`
        }
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
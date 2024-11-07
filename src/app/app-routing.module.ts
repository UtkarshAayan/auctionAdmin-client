import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ForgetPasswordComponent } from './views/pages/forget-password/forget-password.component'
import { ResetPasswordComponent } from './views/pages/reset-password/reset-password.component';
import {ProfileAccountComponent} from './views/pages/profile-account/profile-account.component'
import { authGuard } from './services/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'auctionManagement',
        loadChildren: () =>
          import('./views/auction-management/auction-management.module').then((m) => m.AuctionManagementModule),canActivate: [authGuard]
      },
      {
        path: 'manageBuyers',
        loadChildren: () =>
          import('./views/manage-buyers/manage-buyers.module').then((m) => m.ManageBuyersModule), canActivate: [authGuard]
      },
      {
        path: 'manageHelp',
        loadChildren: () =>
          import('./views/help-content/help-content.module').then((m) => m.HelpContentModule), canActivate: [authGuard]
      },
      {
        path: 'manageBuyContent',
        loadChildren: () =>
          import('./views/how-to-buy/how-to-buy.module').then((m) => m.HowToBuyModule), canActivate: [authGuard]
      },
      {
        path: 'manageSellContent',
        loadChildren: () =>
          import('./views/how-to-sell/how-to-sell.module').then((m) => m.HowToSellModule), canActivate: [authGuard]
      },
      {
        path: 'manage-order',
        loadChildren: () =>
          import('./views/manage-order/manage-order.module').then((m) => m.ManageOrderModule), canActivate: [authGuard]
      },
      {
        path: 'manage-transaction',
        loadChildren: () =>
          import('./views/manage-transaction/manage-transaction.module').then((m) => m.ManageTransactionModule), canActivate: [authGuard]
      },
      {
        path: 'manage-countries',
        loadChildren: () =>
          import('./views/manage-shipping-countries/manage-shipping-countries.module').then((m) => m.ManageShippingCountriesModule), canActivate: [authGuard]
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./views/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule), canActivate: [authGuard]
      },
      {
        path: 'terms-conditions',
        loadChildren: () =>
          import('./views/terms-conditions/terms-conditions.module').then((m) => m.TermsConditionsModule), canActivate: [authGuard]
      },
      {
        path: 'manage-aboutus',
        loadChildren: () =>
          import('./views/manage-aboutus/manage-aboutus.module').then((m) => m.ManageAboutusModule), canActivate: [authGuard]
      },
      {
        path: 'manageSettings',
        loadChildren: () =>
          import('./views/manage-settings/manage-settings.module').then((m) => m.ManageSettingsModule), canActivate: [authGuard]
      },
      {
        path: 'manageRequest',
        loadChildren: () =>
          import('./views/request/request.module').then((m) => m.RequestModule), canActivate: [authGuard]
      },
      {
        path: 'manageSalesTax',
        loadChildren: () =>
          import('./views/sale-tax/sale-tax.module').then((m) => m.SaleTaxModule), canActivate: [authGuard]
      },
      {
        path: 'manageBuyersPremium',
        loadChildren: () =>
          import('./views/buyer-premium/buyer-premium.module').then((m) => m.BuyerPremiumModule), canActivate: [authGuard]
      },
      {
        path: 'subAdminManagement',
        loadChildren: () =>
          import('./views/manage-subadmin/manage-subadmin.module').then((m) => m.ManageSubadminModule), canActivate: [authGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [authGuard]
      },
      {
        path: 'userManagement',
        loadChildren: () =>
          import('./views/employee-management/employee-management.module').then((m) => m.EmployeeManagementModule), canActivate: [authGuard]
      },
      {
        path: 'profileManagement',
        loadChildren: () =>
          import('./views/profile-management/profile-management.module').then((m) => m.ProfileManagementModule), canActivate: [authGuard]
      },
      {
        path: 'notificationAlert',
        loadChildren: () =>
          import('./views/notification-alert/notification-alert.module').then((m) => m.NotificationAlertModule), canActivate: [authGuard]
      },
      {
        path: 'content-library',
        loadChildren: () =>
          import('./views/content-library/content-library.module').then((m) => m.ContentLibraryModule), canActivate: [authGuard]
      },
      {
        path: 'content-version',
        loadChildren: () =>
          import('./views/content-version/content-version.module').then((m) => m.ContentVersionModule), canActivate: [authGuard]
      },
      {
        path: 'manageEmailTemplate',
        loadChildren: () =>
          import('./views/manage-email-template/manage-email-template.module').then((m) => m.ManageEmailTemplateModule), canActivate: [authGuard]
      },
      {
        path: 'manage-home',
        loadChildren: () =>
          import('./views/manage-home/manage-home.module').then((m) => m.ManageHomeModule), canActivate: [authGuard]
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    data: {
      title: 'Forget Password Page'
    }
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {
    path: 'profile-account',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ProfileAccountComponent,
        data: {
          title: 'Profile Account Page'
        }
      },
    ]
  },

  // {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

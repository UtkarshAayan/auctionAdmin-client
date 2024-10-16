import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Manage Sellers',
    url: '/userManagement',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Manage Buyers',
    url: '/manageBuyers',
    iconComponent: { name: 'cil-people' }
  },
  {
    name: 'Manage Auction',
    url: '/auctionManagement',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Order',
    url: '/manage-order',
    iconComponent: { name: 'cil-file' }
  },
  {
    name: 'Manage Transaction',
    url: '/manage-transaction',
    iconComponent: { name: 'cil-credit-card' }
  },
  {
    name: 'Manage SubAdmin',
    url: '/subAdminManagement',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage SalesTax',
    url: '/manageSalesTax',
    iconComponent: { name: 'cil-dollar' }
  },
  {
    name: 'Manage BuyersPremium',
    url: '/manageBuyersPremium',
    iconComponent: { name: 'cil-dollar' }
  },
  {
    name: 'Manage Categories',
    url: '/manageSettings',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Manage Countries',
    url: '/manage-countries',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Manage Help Content',
    url: '/manageHelp',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Manage Sell Content',
    url: '/manageSellContent',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Manage Buy Content',
    url: '/manageBuyContent',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Manage Privacy-Policy',
    url: '/privacy-policy',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Manage Terms-Conditions',
    url: '/terms-conditions',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Manage Aboutus',
    url: '/manage-aboutus',
    iconComponent: { name: 'cil-description' }
  },
  {
    name: 'Manage Request',
    url: '/manageRequest',
    iconComponent: { name: 'cil-bell' }
  },
 
  {
    name: 'Manage Email Template',
    url:  'manageEmailTemplate',
    iconComponent: { name: 'cil-task' }
  },

  {
    name: 'Manage Home',
    url:  'manage-home',
    iconComponent: { name: 'cil-home' }
  },
];

import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Manage Sellers',
    url: '/userManagement',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage Buyers',
    url: '/manageBuyers',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage Auction',
    url: '/auctionManagement',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Order',
    url: '/manage-order',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage Transaction',
    url: '/manage-transaction',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage SubAdmin',
    url: '/subAdminManagement',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Manage SalesTax',
    url: '/manageSalesTax',
    iconComponent: { name: 'cil-settings' }
  },
  {
    name: 'Manage BuyersPremium',
    url: '/manageBuyersPremium',
    iconComponent: { name: 'cil-settings' }
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
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Sell Content',
    url: '/manageSellContent',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Buy Content',
    url: '/manageBuyContent',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Privacy-Policy',
    url: '/privacy-policy',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Terms-Conditions',
    url: '/terms-conditions',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Aboutus',
    url: '/manage-aboutus',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Manage Request',
    url: '/manageRequest',
    iconComponent: { name: 'cil-star' }
  },
 
  {
    name: 'Manage Email Template',
    url:  'manageEmailTemplate',
    iconComponent: { name: 'cil-notes' }
  },

  {
    name: 'Manage Home',
    url:  'manage-home',
    iconComponent: { name: 'cil-notes' }
  },
];

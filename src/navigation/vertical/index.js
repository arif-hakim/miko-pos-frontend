/*
Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
// import dashboard from './dashboard'
// import appsAndPages from './apps-and-pages'
// import chartsAndMaps from './charts-and-maps'
// import others from './others'
// import uiElements from './ui-elements'
// import formAndTable from './forms-and-table'

const menu = [ 
  {
    title: 'Company Profile',
    icon: 'HomeIcon',
    route: 'current-unit',
    tagVariant: 'light-warning',
  },
  {
    header: 'Sales'
  },
  {
    title: 'Order',
    icon: 'ShoppingCartIcon',
    route: 'order',
    tagVariant: 'light-warning',
  },
  {
    title: 'Tax',
    icon: 'DollarSignIcon',
    route: 'tax',
    tagVariant: 'light-warning',
  },
  {
    title: 'Product',
    icon: 'BoxIcon',
    route: 'product',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Product',
        icon: 'BoxIcon',
        route: 'product',
        tagVariant: 'light-warning',
      },
      {
        title: 'Category',
        icon: 'GridIcon',
        route: 'category',
        tagVariant: 'light-warning',
      },
    ]
  },
  {
    header: 'Inventory'
  },
  {
    title: 'Raw Material',
    icon: 'ArchiveIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Raw Material',
        icon: 'ArchiveIcon',
        route: 'material',
        tagVariant: 'light-warning',
      },
      {
        title: 'Category',
        icon: 'GridIcon',
        route: 'material-category',
        tagVariant: 'light-warning',
      },
      {
        title: 'Conversion',
        icon: 'GridIcon',
        route: 'conversion',
        tagVariant: 'light-warning',
      },
    ]
  },
]

// Array of sections
export default [
  ...menu
  // ...dashboard, 
  // ...appsAndPages, 
  // ...chartsAndMaps, 
  // ...uiElements, 
  // ...formAndTable, 
  // ...others
]

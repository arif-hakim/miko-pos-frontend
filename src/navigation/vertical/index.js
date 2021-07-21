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
    header: 'Master Data'
  },
  {
    title: 'Category',
    icon: 'GridIcon',
    route: 'category',
    tagVariant: 'light-warning',
  }, 
  {
    header: 'Transactions'
  },
  {
    title: 'Orders',
    icon: 'ShoppingCartIcon',
    route: 'order',
    tagVariant: 'light-warning',
  },
  {
    title: 'Products',
    icon: 'BoxIcon',
    route: 'product',
    tagVariant: 'light-warning',
  }, 
  {
    header: 'Inventory'
  },
  {
    title: 'Raw Materials',
    icon: 'ArchiveIcon',
    route: 'supply',
    tagVariant: 'light-warning',
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

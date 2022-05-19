import { RemultModule } from '@remult/angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


import { UsersComponent } from './users/users.component';
import { AdminGuard } from "./users/AdminGuard";
import { ShowDialogOnErrorErrorHandler } from './common/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { terms } from './terms';
import { ProductsComponent } from './products/products.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { ExportExcelComponent } from './export-excel/export-excel.component';
import { DynamicServerSideSearchDialogDemoComponent } from './dynamic-server-side-search-dialog/dynamic-server-side-search-dialog-demo.component';
import { ServerSideSearchComponent } from './server-side-search/server-side-search.component';
import { SearchFieldWithDataGridComponent } from './search-field-with-data-grid/search-field-with-data-grid.component';
import { ServerSideSearchSelectionDialogDemoComponent } from './server-side-search-selection-dialog/server-side-search-selection-dialog-demo.component';
import { FullPageLayoutComponent } from './full-page-layout/full-page-layout.component';
import { MultiSelectListDialogDemoComponent } from './multi-select-list-dialog/multi-select-list-demo.component';

const defaultRoute = terms.home;
const routes: Routes = [
  { path: defaultRoute, component: HomeComponent },
  {
    path: 'Server Side Search', component: ServerSideSearchComponent, data: {
      description: 'Demo of a basic angular list, with a search field, that performs the search using server side search',
      source: 'server-side-search'
    }
  },
  {
    path: 'Search field with Data Grid', component: SearchFieldWithDataGridComponent, data: {
      description: 'Demo of a data grid with a search field above it, that performs the search using server side search'
      , source: 'search-field-with-data-grid'
    }
  },
  {
    path: 'Server Side Search Selection Dialog', component: ServerSideSearchSelectionDialogDemoComponent, data: {
      description: 'a Search popup that can be used to select a product with server side search'
      , source: 'server-side-search-selection-dialog'
    }
  },
  {
    path: 'Multi Select Dialog', component: MultiSelectListDialogDemoComponent, data: {
      description: 'a Search popup that can be used to select multiple values'
      , source: 'multi-select-list-dialog'
    }
  },
  {
    path: 'Dynamic Server Side Search Dialog', component: DynamicServerSideSearchDialogDemoComponent, data: {
      description: 'A search popup that can be used to select any entity, utilizing a server side search'
      , source: 'dynamic-server-side-search-dialog'
    }
  },
  {
    path: 'Full Page Layout', component: FullPageLayoutComponent, data: {
      description: 'Demo of using the full height of the page, with top, bottom and a middle scrollable part'
      , source: 'full-page-layout'
    }
  },
  {
    path: 'Import from csv', component: ImportCsvComponent, data: {
      description: 'Demo of importing products from a csv file'
      , source: 'import-csv'
    }
  },
  {
    path: 'Import from Excel', component: ImportExcelComponent, data: {
      description: 'Demo of importing products from an excel file'
      , source: 'import-excel'
    }
  },
  {
    path: 'Export to Excel', component: ExportExcelComponent, data: {
      description: 'Demo of exporting products to an excel file'
      , source: 'export-excel'
    }
  },
  {
    path: 'Products', component: ProductsComponent, data: {
      description: 'A basic admin screen to update products'
      , source: 'products'
    }
  },
  { path: terms.userAccounts, component: UsersComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '/' + defaultRoute, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RemultModule,
  JwtModule.forRoot({
    config: { tokenGetter: () => AuthService.fromStorage() }
  })],
  providers: [AdminGuard, { provide: ErrorHandler, useClass: ShowDialogOnErrorErrorHandler }],
  exports: [RouterModule]
})
export class AppRoutingModule { }

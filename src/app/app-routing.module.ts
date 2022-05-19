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

const defaultRoute = terms.home;
const routes: Routes = [
  { path: defaultRoute, component: HomeComponent },
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

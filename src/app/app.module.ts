import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RemultModule } from '@remult/angular';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { YesNoQuestionComponent } from './common/yes-no-question/yes-no-question.component';
import { InputAreaComponent } from './common/input-area/input-area.component';
import { DialogService } from './common/dialog';
import { AdminGuard } from "./users/AdminGuard";
import { ProductsComponent } from './products/products.component';
import { DynamicServerSideSearchDialogComponent } from './dynamic-server-side-search-dialog/dynamic-server-side-search-dialog.component';
import { ServerSideSearchComponent } from './server-side-search/server-side-search.component';
import { SearchFieldWithDataGridComponent } from './search-field-with-data-grid/search-field-with-data-grid.component';
import { FullPageLayoutComponent } from './full-page-layout/full-page-layout.component';
import { ServerSideSearchSelectionDialogComponent } from './server-side-search-selection-dialog/server-side-search-selection-dialog.component';
import { ServerSideSearchSelectionDialogDemoComponent } from './server-side-search-selection-dialog/server-side-search-selection-dialog-demo.component';
import { MultiSelectListDialogComponent } from './multi-select-list-dialog/multi-select-list-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    YesNoQuestionComponent,
    InputAreaComponent,
    ProductsComponent,
    DynamicServerSideSearchDialogComponent,
    ServerSideSearchComponent,
    SearchFieldWithDataGridComponent,
    FullPageLayoutComponent,
    ServerSideSearchSelectionDialogComponent,
    ServerSideSearchSelectionDialogDemoComponent,
    MultiSelectListDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RemultModule
  ],
  providers: [DialogService, AdminGuard],
  bootstrap: [AppComponent],
  entryComponents: [YesNoQuestionComponent, InputAreaComponent]
})
export class AppModule { }

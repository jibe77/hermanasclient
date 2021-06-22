/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { HttpErrorInterceptor } from '@modules/dashboard/interceptors';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        AmplifyUIAngularModule,
        HttpClientModule,
    ],
    providers: [
        ...dashboardServices.services,
        ...dashboardGuards.guards,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
})
export class DashboardModule {}

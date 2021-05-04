/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as systemComponents from './components';

/* Containers */
import * as systemContainers from './containers';

/* Directives */
import * as systemDirectives from './directives';

/* Guards */
import * as systemGuards from './guards';

/* Services */
import * as systemService from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        HttpClientModule,
    ],
    providers: [
        DecimalPipe,
        ...systemService.services,
        ...systemGuards.guards,
        ...systemDirectives.directives,
    ],
    declarations: [
        ...systemContainers.containers,
        ...systemComponents.components,
        ...systemDirectives.directives,
    ],
    exports: [...systemContainers.containers, ...systemComponents.components],
})
export class SystemModule {}

/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { NotificationModule } from './notification.module';

/* Containers */
import * as chartsContainers from './containers';

/* Guards */
import * as chartsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: chartsContainers.ChartsComponent,
        data: {
            title: 'Charts - Hermanas',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Charts',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [NotificationModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class NotificationRoutingModule {}

import { DashboardDoorActionComponent } from './dashboard-door-action/dashboard-door-action.component';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { DashboardTablesComponent } from './dashboard-tables/dashboard-tables.component';
import { DashboardDoorComponent } from './dashboard-door/dashboard-door.component';

export const components = [
    DashboardCardsComponent,
    DashboardChartsComponent,
    DashboardTablesComponent,
    DashboardDoorComponent,
    DashboardDoorActionComponent,
];

export * from './dashboard-cards/dashboard-cards.component';
export * from './dashboard-charts/dashboard-charts.component';
export * from './dashboard-tables/dashboard-tables.component';
export * from './dashboard-door/dashboard-door.component';

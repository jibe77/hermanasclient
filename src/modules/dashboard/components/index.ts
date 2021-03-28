import { DashboardAccessoriesActionComponent } from './dashboard-accessories-action/dashboard-accessories-action.component';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { DashboardDoorActionComponent } from './dashboard-door-action/dashboard-door-action.component';
import { DashboardTablesComponent } from './dashboard-tables/dashboard-tables.component';
import { DashboardWeatherActionComponent } from './dashboard-weather-action/dashboard-weather-action.component';
import { DashboardWebcamActionComponent } from './dashboard-webcam-action/dashboard-webcam-action.component';
import { DashboardWidgetsComponent } from './dashboard-widgets/dashboard-widgets.component';

export const components = [
    DashboardCardsComponent,
    DashboardChartsComponent,
    DashboardTablesComponent,
    DashboardDoorActionComponent,
    DashboardWebcamActionComponent,
    DashboardAccessoriesActionComponent,
    DashboardWidgetsComponent,
    DashboardWeatherActionComponent,
];

export * from './dashboard-cards/dashboard-cards.component';
export * from './dashboard-charts/dashboard-charts.component';
export * from './dashboard-tables/dashboard-tables.component';

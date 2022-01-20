import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MeteoInfo } from '@modules/dashboard/services';
import { SBSortableHeaderDirective } from '@modules/system/directives';
import { Country } from '@modules/system/models';
import { SortEvent } from '@modules/weather/directives';
import { WeatherService } from '@modules/weather/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'hermanas-weather-table-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './weather-table-area.component.html',
    styleUrls: ['weather-table-area.component.scss'],
})
export class WeatherTableAreaComponent implements OnInit {
    info$!: Observable<MeteoInfo[]>;
    displayedColumns = [
        'dateTime',
        'temperature',
        'externalTemperature',
        'humidity',
        'externalHumidity',
    ];
    dataSource = new MatTableDataSource<MeteoInfo>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public weatherService: WeatherService) {}

    ngOnInit() {
        const today = new Date();
        const to = this.formatDate(today);

        const sevenDaysAgo = new Date(today.getTime() - 7 * 1000 * 60 * 60 * 24);
        const from = this.formatDate(sevenDaysAgo);

        console.log('to : ' + to);
        console.log('from : ' + from);

        this.info$ = this.weatherService.getInfoUsingDateRange(from, to);
        this.info$.subscribe(data => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.sort.sort({ id: 'dateTime', start: 'desc' } as MatSortable);
        });
    }

    private formatDate(today: Date) {
        return today.getFullYear() +
            '-' +
            (today.getMonth() + 1 + '').padStart(2, '0') +
            '-' +
            (today.getUTCDate() + '').padStart(2, '0') +
            '-' +
            (today.getHours() + '').padStart(2, '0') +
            '-' +
            (today.getMinutes() + '').padStart(2, '0');
    }
}

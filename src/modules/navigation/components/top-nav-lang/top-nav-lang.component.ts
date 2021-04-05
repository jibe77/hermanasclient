import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'sb-top-nav-lang',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-lang.component.html',
    styleUrls: ['top-nav-lang.component.scss'],
})
export class TopNavLangComponent implements OnInit {
    siteLanguage = 'English';
    siteLocale: string;
    languageList = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
    ];

    constructor(public navigationService: NavigationService) {}

    ngOnInit(): void {
        this.siteLocale = window.location.pathname.split('/')[1];
        this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;
    }
}

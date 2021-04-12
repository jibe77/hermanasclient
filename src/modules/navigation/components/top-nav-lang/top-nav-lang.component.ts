import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '@modules/navigation/services';
import { I18n } from 'aws-amplify';

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
        { code: 'en-US', label: 'English' },
        { code: 'fr-FR', label: 'Français' },
    ];

    constructor(public navigationService: NavigationService) {}

    ngOnInit(): void {
        this.siteLocale = window.location.pathname.split('/')[1];
        const language = this.languageList.find(f => f.code === this.siteLocale);
        if (language) {
            this.siteLanguage = language.label;
            console.log('setting i18n language to ', language.code);
            I18n.setLanguage(language.code);
        } else {
            this.siteLanguage = this.languageList[1].label;
            console.log('setting default i18n language to ', this.languageList[1].code);
            I18n.setLanguage(this.languageList[1].code);
        }
    }
}

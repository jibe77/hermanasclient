import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}

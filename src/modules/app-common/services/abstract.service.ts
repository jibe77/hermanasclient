import { HttpHeaders } from '@angular/common/http';
import { User } from '@modules/auth/models';
import { environment } from '../../../environments/environment';

export class AbstractService {
    public domainBase = environment.apiUrl;

    public getHeaders() {
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
    }

    protected getHeadersWithAuth(user: User) {
        const auth = btoa(user.backEndUser + ':' + user.backEndPassword);
        return new HttpHeaders({
            Authorization: 'Basic ' + auth,
            'Access-Control-Allow-Origin': '*',
        });
    }
}

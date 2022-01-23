import { HttpHeaders } from '@angular/common/http';
import { User } from '@modules/auth/models';

export class AbstractService {
    public domainBase = 'https://poulailler57.ddns.net:5780';

    protected getHeaders() {
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

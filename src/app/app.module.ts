import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    authInterceptor,
    loggingInterceptor,
    retryInterceptor,
} from '@common/interceptors';
import { GlobalErrorHandler } from '@common/services';
import { ProgressWebsocketService } from '@modules/dashboard/services/progresswebsocket.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, NgbModule],
    providers: [
        ProgressWebsocketService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        provideHttpClient(
            withInterceptors([loggingInterceptor, authInterceptor, retryInterceptor])
        ),
    ],
})
export class AppModule {}

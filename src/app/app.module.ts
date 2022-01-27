import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressWebsocketService } from '@modules/dashboard/services/progresswebsocket.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxStompService } from '@stomp/ng2-stompjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule,
    ],
    providers: [ProgressWebsocketService, RxStompService],
    bootstrap: [AppComponent],
})
export class AppModule {}

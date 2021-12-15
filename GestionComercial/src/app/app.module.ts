import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginModule } from "./aplicaciones/login/login.module";
import { UiModule } from "./core/ui/ui.module";
import { AppComponent } from "./app.component";
import { APP_BASE_HREF, DatePipe } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginModule,
    UiModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  exports: [],
  providers: [DatePipe, { provide: APP_BASE_HREF, useValue: "" }],

  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { enableProdMode } from "@angular/core";

// Modules
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

// Services
import { AuthService } from "./services/auth/auth.service";
import { UserService } from "./services/user/user.service";

// Pipes
import { FilterPipe } from "./pipes/filter.pipe";
import { PhonePipe } from "./pipes/phone.pipe";

// Components
import { AppComponent } from "./components/index/app.component";
import { LoginComponent } from "./components/login/login.component";
import {
  HomeComponent,
  homeChildRoutes
} from "./components/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { DocumentUploadComponent } from "./components/document/document-upload.component";
import { UploadService } from "./services/document/upload.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FilterPipe,
    PhonePipe,
    DocumentUploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  providers: [AuthService, UserService, UploadService, HttpClient],
  bootstrap: [AppComponent]
})

// enableProdMode();
export class AppModule {}

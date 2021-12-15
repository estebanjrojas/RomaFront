import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
// Components
import { LoginComponent } from "./login.component";
import { LoginContainer } from "./login.container";
import { LoginRoutingModule } from "./login-routing.module";
import { UiModule } from "src/app/core/ui/ui.module";

@NgModule({
  declarations: [LoginContainer, LoginComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, UiModule],
  exports: [LoginContainer],
  providers: [],
})
export class LoginModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule,

    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
  ],
  providers: [],
  schemas: [],
})
export class MaterialModule {}

import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  exports: [
    MatInputModule,
    MatRadioModule,
  ]
})
export class MaterialModule {}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isManuallyChanged = false;
  public vatForm: FormGroup = new FormGroup({
    net: new FormControl(null),
    gross: new FormControl(null),
    vat: new FormControl(null),
    selectedTax: new FormControl(null, Validators.required),
    selectedField: new FormControl(null),
  });

  constructor(){
    this.vatForm.controls['net'].valueChanges.subscribe(net => this.netChanged(net));
    this.vatForm.controls['gross'].valueChanges.subscribe(gross =>this.grossChanged(gross));
    this.vatForm.controls['vat'].valueChanges.subscribe(vat =>this.vatChanged(vat));
    this.vatForm.controls['selectedTax'].valueChanges.subscribe(() =>this.selectedTaxChanged());
    this.vatForm.controls['selectedField'].valueChanges.subscribe(() =>this.selectedTaxChanged());
  }

  private netChanged(netValue: string): void {
    if(!this.canChange(netValue,'net')){
      return;
    }
    this.isManuallyChanged = true;
    this.vatForm.controls['selectedField'].setValue('net');
    if(this.vatForm.valid){
      this.vatForm.controls['vat'].setValue((parseFloat(netValue)*this.vatForm.controls['selectedTax'].value/100).toFixed(2));
      this.vatForm.controls['gross'].setValue((parseFloat(netValue)+parseFloat(this.vatForm.controls['vat'].value)).toFixed(2));
    }
    this.isManuallyChanged = false;
  }

  private grossChanged(grossValue: string): void {
    if(!this.canChange(grossValue,'gross')){
      return;
    }
    this.isManuallyChanged = true;
    this.vatForm.controls['selectedField'].setValue('gross');
    if(this.vatForm.valid){
      this.vatForm.controls['net'].setValue(Math.round(parseFloat(grossValue)/(1+parseFloat(this.vatForm.controls['selectedTax'].value)/100)).toFixed(2));
      this.vatForm.controls['vat'].setValue((parseFloat(grossValue)-parseFloat(this.vatForm.controls['net'].value)).toFixed(2));
    }
    this.isManuallyChanged = false;
  }

  private vatChanged(vatValue: string): void {
    if(!this.canChange(vatValue,'vat')){
      return;
    }
    this.isManuallyChanged = true;
    this.vatForm.controls['selectedField'].setValue('vat');
    if(this.vatForm.valid){
      this.vatForm.controls['net'].setValue((parseFloat(vatValue)/parseFloat(this.vatForm.controls['selectedTax'].value)*100).toFixed(2));
      this.vatForm.controls['gross'].setValue((parseFloat(vatValue)+parseFloat(this.vatForm.controls['net'].value)).toFixed(2));
    }
    this.isManuallyChanged = false;
  }

  private selectedTaxChanged(): void {
    if(this.isManuallyChanged){
      return;
    }
    this.vatForm.updateValueAndValidity();
    if(this.vatForm.controls['net'].value && this.vatForm.controls['selectedField'].value === 'net'){
      this.netChanged(this.vatForm.controls['net'].value);
      return;
    }
    if(this.vatForm.controls['gross'].value && this.vatForm.controls['selectedField'].value === 'gross'){
      this.grossChanged(this.vatForm.controls['gross'].value);
      return;
    }
    if(this.vatForm.controls['vat'].value && this.vatForm.controls['selectedField'].value === 'vat'){
      this.vatChanged(this.vatForm.controls['vat'].value);
      return;
    }
  }

  private canChange(value: string, field: string): boolean{
    if(value?.toString().indexOf('.') > -1 ){
      if(value.toString().split('.')[1].length>2){
        this.vatForm.controls[field].setValue(parseFloat(value).toFixed(2));
      }
    }
    if(this.isManuallyChanged){
      return false;
    }
    if(value === null){
      this.vatForm.controls[field].setErrors({'incorrect': true});
      return false;
    }
    if(parseFloat(value).toFixed(2) ==='0.00'){
      this.vatForm.controls[field].setErrors({'incorrect': true});
      return false;
    }
    if(this.vatForm.controls['selectedTax'].value){
      this.clearErrors();
    }
    return true;
  }

  private clearErrors(): void {
    this.vatForm.controls['net'].setErrors( null );
    this.vatForm.controls['gross'].setErrors( null );
    this.vatForm.controls['vat'].setErrors( null );
    this.vatForm.controls['selectedTax'].setErrors( null );
    this.vatForm.controls['selectedField'].setErrors( null );
  }
}

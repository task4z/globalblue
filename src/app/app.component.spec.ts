import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ ReactiveFormsModule, MaterialModule, BrowserAnimationsModule ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Test the number of form group elements', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#vatForm');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(9);
  });

  it('Test initial values for the Vat form', () => {
    const vatFormGroup = component.vatForm;
    const vatFormGroupValues = {
      gross: null,
      net: null,
      selectedField: null,
      selectedTax: null,
      vat: null,
    };
    expect(vatFormGroup.value).toEqual(vatFormGroupValues);
  });

  it('Test the value 10 was selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[0];
    const selectedTaxValueFormGroup = component.vatForm.get('selectedTax');
    expect(selectedTaxValueFormGroup?.value).toBeNull();
    expect(selectedTaxValueFormGroup?.valid).toBeFalse();
    vatFormSelectedTaxElement.click();
    expect(selectedTaxValueFormGroup?.valid).toBeTrue();
    expect(selectedTaxValueFormGroup?.value).toEqual(vatFormSelectedTaxElement.value);
  });

  it('Test the value 13 was selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[1];
    const selectedTaxValueFormGroup = component.vatForm.get('selectedTax');
    expect(selectedTaxValueFormGroup?.value).toBeNull();
    expect(selectedTaxValueFormGroup?.valid).toBeFalse();
    vatFormSelectedTaxElement.click();
    expect(selectedTaxValueFormGroup?.valid).toBeTrue();
    expect(selectedTaxValueFormGroup?.value).toEqual(vatFormSelectedTaxElement.value);
  });

  it('Test the value 20 was selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[2];
    const selectedTaxValueFormGroup = component.vatForm.get('selectedTax');
    expect(selectedTaxValueFormGroup?.value).toBeNull();
    expect(selectedTaxValueFormGroup?.valid).toBeFalse();
    vatFormSelectedTaxElement.click();
    expect(selectedTaxValueFormGroup?.valid).toBeTrue();
    expect(selectedTaxValueFormGroup?.value).toEqual(vatFormSelectedTaxElement.value);
  });

  it('Test the error message exist when input net has value is touched and no vat selected', () => {
    const netElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0];
    const vatFormGroup = component.vatForm;
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    netElement.click();
    netElement.focus();
    fixture.componentInstance.vatForm.controls['net'].setValue('1');
    netElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(vatFormGroup?.status).toBe('INVALID');
      expect(vatFormGroup.get('net')?.value.toString()).toEqual(netElement.value.toString());
      expect(vatFormGroup?.controls['selectedTax']?.errors ? vatFormGroup?.controls['selectedTax']?.errors['required'] : '').toBeTrue();
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(1);
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[3].value).toBe('net');
      expect(vatFormGroup.get('selectedField')?.value).toBe('net');
    });
  });

  it('Test the error message exist when input gross has value is touched and no vat selected', () => {
    const grossElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0];
    const vatFormGroup = component.vatForm;
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    grossElement.click();
    grossElement.focus();
    fixture.componentInstance.vatForm.controls['gross'].setValue('1');
    grossElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        expect(vatFormGroup?.status).toBe('INVALID');
        expect(vatFormGroup.get('gross')?.value.toString()).toEqual(grossElement.value.toString());
        expect(vatFormGroup?.controls['selectedTax']?.errors ? vatFormGroup?.controls['selectedTax']?.errors['required'] : '').toBeTrue();
        expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(1);
        expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[5].value).toBe('gross');
        expect(vatFormGroup.get('selectedField')?.value).toBe('gross');
      }
    );
  });

  it('Test the error message exist when input vat has value is touched and no vat selected', () => {
    const vatElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0];
    const vatFormGroup = component.vatForm;
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    vatElement.click();
    vatElement.focus();
    fixture.componentInstance.vatForm.controls['vat'].setValue('1');
    vatElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(vatFormGroup?.status).toBe('INVALID');
      expect(vatFormGroup.get('vat')?.value.toString()).toEqual(vatElement.value.toString());
      expect(vatFormGroup?.controls['selectedTax']?.errors ? vatFormGroup?.controls['selectedTax']?.errors['required'] : '').toBeTrue();
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(1);
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[7].value).toBe('vat');
      expect(vatFormGroup.get('selectedField')?.value).toBe('vat');
    }
    );
  });

  it('Test the net value 10 give gross of 11 and vat of 1 with 10% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[0];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const netElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    netElement.click();
    netElement.focus();
    fixture.componentInstance.vatForm.controls['net'].setValue('10');
    netElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0].value).toBe(vatFormGroup.get('gross')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0].value).toBe(vatFormGroup.get('vat')?.value.toString());
      expect(vatFormGroup.get('gross')?.value.toString()).toBe('11.00');
      expect(vatFormGroup.get('vat')?.value.toString()).toBe('1.00');
    }
    );
  });

  it('Test the net value 10 give gross of 11.3 and vat of 1.3 with 13% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[1];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const netElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    netElement.click();
    netElement.focus();
    fixture.componentInstance.vatForm.controls['net'].setValue('10');
    netElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0].value).toBe(vatFormGroup.get('gross')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0].value).toBe(vatFormGroup.get('vat')?.value.toString());
      expect(vatFormGroup.get('gross')?.value.toString()).toBe('11.30');
      expect(vatFormGroup.get('vat')?.value.toString()).toBe('1.30');
    }
    );
  });

  it('Test the net value 10 give gross of 102 and vat of 2 with 20% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[2];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const netElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    netElement.click();
    netElement.focus();
    fixture.componentInstance.vatForm.controls['net'].setValue('10');
    netElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0].value).toBe(vatFormGroup.get('gross')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0].value).toBe(vatFormGroup.get('vat')?.value.toString());
      expect(vatFormGroup.get('gross')?.value.toString()).toBe('12.00');
      expect(vatFormGroup.get('vat')?.value.toString()).toBe('2.00');
    }
    );
  });

  it('Test the gross value 11 give net of 10 and vat of 1 with 10% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[0];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const grossElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    grossElement.click();
    grossElement.focus();
    fixture.componentInstance.vatForm.controls['gross'].setValue('11');
    grossElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0].value).toBe(vatFormGroup.get('net')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0].value).toBe(vatFormGroup.get('vat')?.value.toString());
      expect(vatFormGroup.get('net')?.value.toString()).toBe('10.00');
      expect(vatFormGroup.get('vat')?.value.toString()).toBe('1.00');
    }
    );
  });

  it('Test the gross value 113 give net of 100 and vat of 13 with 13% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[1];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const grossElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    grossElement.click();
    grossElement.focus();
    fixture.componentInstance.vatForm.controls['gross'].setValue('113');
    grossElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0].value).toBe(vatFormGroup.get('net')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0].value).toBe(vatFormGroup.get('vat')?.value.toString());
      expect(vatFormGroup.get('net')?.value.toString()).toBe('100.00');
      expect(vatFormGroup.get('vat')?.value.toString()).toBe('13.00');
    }
    );
  });

  it('Test the gross value 12 give net of 10 and vat of 2 with 20% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[2];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const grossElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    grossElement.click();
    grossElement.focus();
    fixture.componentInstance.vatForm.controls['gross'].setValue('12');
    grossElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0].value).toBe(vatFormGroup.get('net')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0].value).toBe(vatFormGroup.get('vat')?.value.toString());
      expect(vatFormGroup.get('net')?.value.toString()).toBe('10.00');
      expect(vatFormGroup.get('vat')?.value.toString()).toBe('2.00');
    }
    );
  });

  it('Test the vat value 1 give net of 10 and gross of 110 with 10% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[0];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const vatElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    vatElement.click();
    vatElement.focus();
    fixture.componentInstance.vatForm.controls['vat'].setValue('1');
    vatElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0].value).toBe(vatFormGroup.get('net')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0].value).toBe(vatFormGroup.get('gross')?.value.toString());
      expect(vatFormGroup.get('net')?.value.toString()).toBe('10.00');
      expect(vatFormGroup.get('gross')?.value.toString()).toBe('11.00');
    }
    );
  });
  
  it('Test the vat value 13 give net of 100 and gross of 113 with 13% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[1];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const vatElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    vatElement.click();
    vatElement.focus();
    fixture.componentInstance.vatForm.controls['vat'].setValue('13');
    vatElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0].value).toBe(vatFormGroup.get('net')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0].value).toBe(vatFormGroup.get('gross')?.value.toString());
      expect(vatFormGroup.get('net')?.value.toString()).toBe('100.00');
      expect(vatFormGroup.get('gross')?.value.toString()).toBe('113.00');
    }
    );
  });

  it('Test the vat value 2 give net of 10 and gross of 12 with 20% selected', () => {
    const vatFormSelectedTaxElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input')[2];
    vatFormSelectedTaxElement.click();
    const vatFormGroup = component.vatForm;
    const vatElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#vat')[0];
    expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('mat-error').length).toBe(0);
    vatElement.click();
    vatElement.focus();
    fixture.componentInstance.vatForm.controls['vat'].setValue('2');
    vatElement.blur();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#net')[0].value).toBe(vatFormGroup.get('net')?.value.toString());
      expect(fixture.debugElement.nativeElement.querySelector('#vatForm').querySelectorAll('input#gross')[0].value).toBe(vatFormGroup.get('gross')?.value.toString());
      expect(vatFormGroup.get('net')?.value.toString()).toBe('10.00');
      expect(vatFormGroup.get('gross')?.value.toString()).toBe('12.00');
    }
    );
  });
});

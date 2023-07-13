/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonHelper {




  //#endregion current user
  constructor(public formBuilder: FormBuilder) { }

  isNullOrUndefined(obj: any) {
    if (obj === undefined || obj === null || obj === '' || obj === ' ') {
      return true;
    } else {
      return false;
    }
  }

  isNullOrWhiteSpace(text: any) {
    if (typeof (text) === 'number' && text.toString() === '') {
      return true;
    } else if (typeof (text) === 'number' && text.toString() !== '') {
      return false;
    } else if (text instanceof Array && text.length === 0) {
      return true;
    } else if (text instanceof Array && text.length > 0) {
      return false;
    }
    return (typeof text === 'undefined' || text == null) || text.replace(/\s/g, '').length < 1;
  }

  mapToFormGroup(sourceObject: any, targetFormGroup: FormGroup) {
    // eslint-disable-next-line guard-for-in
    for (const key in targetFormGroup.controls) {
      const control = targetFormGroup.get(key);
      if (!this.isNullOrUndefined(sourceObject[key])) {
        if (typeof (sourceObject[key]) === 'string') {
          control?.setValue(sourceObject[key].toString());
        } else {
          control?.setValue(sourceObject[key]);
        }
      }
      sourceObject[key] = control?.value;
    }
  }


  warningMessage(messageText: string) {
    const warningTitle = "Uyarı!";
    $.notify({
      icon: "notifications",
      message: warningTitle + " - " + messageText

    }, {
      type: 'warning',
      timer: 300,
      placement: {
        from: 'top',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  infoMessage(messageText: string) {
    const infoTitle = "Bilgilendirme!";
    $.notify({
      icon: "notifications",
      message: infoTitle + " - " + messageText
    }, {
      type: 'info',
      timer: 300,
      placement: {
        from: 'top',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  errorMessage(messageText: string) {
    const errorTitle = "Hata";
    $.notify({
      icon: "notifications",
      message: errorTitle + " - " + messageText

    }, {
      type: 'danger',
      timer: 300,
      placement: {
        from: 'top',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  successMessage(messageText: string) {
    const successTitle = "Başarılı";
    $.notify({
      icon: "notifications",
      message: successTitle + " - " + messageText

    }, {
      type: 'success',
      timer: 300,
      placement: {
        from: 'top',
        align: 'center'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}


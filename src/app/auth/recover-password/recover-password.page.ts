import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone:false,
})
export class RecoverPasswordPage implements OnInit {
  recoverForm: FormGroup;
  email: string = ''; 

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.gmailValidator 
        ]
      ]
    });
  }

  ngOnInit() {}

  // Método para enviar el formulario
  onSubmit() {
    if (this.recoverForm.valid) {
      // Aquí iría el proceso para recuperar la contraseña
      console.log('Formulario enviado', this.recoverForm.value);
    }
  }

  // Validador personalizado para el correo
  gmailValidator(control: any) {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov)$/;
    if (email && !emailRegex.test(email)) {
      return { invalidEmail: true };
    }
    return null;
  }
}
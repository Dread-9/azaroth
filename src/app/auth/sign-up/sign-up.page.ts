import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastService } from 'src/app/service/components/toast.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone:false,
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  isSubmitting = false;
  imagePreview: string | ArrayBuffer | null = null;
  isDragging = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,) {
      this.signUpForm = this.fb.group(
        {
          name: ['', [Validators.required, Validators.minLength(2)]],
          lastName: ['', [Validators.required, Validators.minLength(2)]],
          email: ['', [Validators.required, Validators.email, this.gmailValidator]],
          password: ['', [Validators.required, Validators.minLength(8), this.validatePasswordStrength]],
          confirmPassword: ['', [Validators.required]],
          image: ['', [Validators.required]],
          termsAccepted: [false, Validators.requiredTrue],
        },
        { validator: this.passwordsMatch('password', 'confirmPassword') },
      );
  }

  ngOnInit() {}

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov)$/;
  
    if (email && !emailRegex.test(email)) {
      return { invalidEmail: true };
    }
    return null;
  }

  togglePasswordVisibility(type: string) {
    if (type === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (type === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  // Validación de contraseñas coincidentes
  passwordsMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // Solo verificar si ambos controles son válidos
      if (control.valid && matchingControl.valid) {
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ passwordMismatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Validación de la fortaleza de la contraseña
  validatePasswordStrength(control: any) {
    const password = control.value;
    if (
      !password ||
      !/(?=.*[A-Z])/.test(password) || // Al menos una mayúscula
      !/(?=.*[0-9])/.test(password) || // Al menos un número
      !/(?=.*[!@#$%^&*])/.test(password) || // Al menos un carácter especial
      password.length < 8
    ) {
      return { weakPassword: true };
    }
    return null;
  }

  isPasswordStrong(password: string): boolean {
    return this.validatePasswordStrength({ value: password }) === null;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Establecer la vista previa de la imagen
        this.signUpForm.controls['image'].setValue(file); // Establecer el archivo en el formulario
      };
      reader.readAsDataURL(file); // Leer el archivo como URL para la previsualización
    }
  }


  cancelImage(): void {
    this.imagePreview = null;
    this.signUpForm.controls['image'].setValue('');
  }

  // Permite la acción de soltar (drop)
  onDrop(event: any): void {
    event.preventDefault(); // Previene el comportamiento por defecto
    this.isDragging = false; // Restablece el estado de arrastre
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Detecta cuando un archivo está sobre el área (para mostrar el borde cambiado)
  onDragOver(event: any): void {
    event.preventDefault();
    this.isDragging = true;
  }

  // Detecta cuando el archivo deja el área de arrastre
  onDragLeave(event: any): void {
    this.isDragging = false;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isSubmitting = true;
      const { confirmPassword, termsAccepted, ...user } = this.signUpForm.value;

      // this.authService.register(user).subscribe({
      //   next: (response) => {
      //     this.toastService.showToast('Registro exitoso.', 'success');
      //     this.isSubmitting = false;
      //     this.router.navigate(['/login']);
      //   },
      //   error: (error) => {
      //     this.toastService.showToast('Hubo un error al registrar al usuario.', 'danger');
      //     this.isSubmitting = false;
      //   },
      //   complete: () => {
      //     // Puedes agregar lógica de finalización si es necesario.
      //   }
      // });      
    } else {
      this.toastService.showToast('Por favor, complete todos los campos correctamente.', 'warning');
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/components/toast.service';
import { LoadingService } from 'src/app/service/components/loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  rememberMe: boolean = false;
  passwordVisible: boolean = false;
  email: string = 'user@example.com';
  password: string = 'password123';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    const storedEmail = sessionStorage.getItem('email');
    const storedPassword = sessionStorage.getItem('password');
    const storedRememberMe = sessionStorage.getItem('rememberMe') === 'true';
    this.loginForm = this.fb.group({
      email: [storedEmail, [Validators.required, Validators.email]],
      password: [storedPassword, [Validators.required]],
      rememberMe: [storedRememberMe] 
    });
    this.rememberMe = this.loginForm.get('rememberMe')?.value || false;
  }

  async login() {
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // await this.loadingService.presentLoading('Iniciando sesión...', 500);

    // this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
    //   next: (response) => {
    //     console.log('Respuesta completa del login:', response);
    //     this.router.navigate(['tabs/home']);
    //   },
    //   error: (err) => {
    //     console.error('Error en el login:', err);
    //   },
    //   complete: () => {
    //     this.loadingService.dismissLoading();
    //   },
    // });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
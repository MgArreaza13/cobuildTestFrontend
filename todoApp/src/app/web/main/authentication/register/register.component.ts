import { LocalStorageService } from './../../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public user: User = {};
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    // Validate token
    const token = this.lsService.getValue('token');
    if (token) {
      this.router.navigate(['/']);
    }

    // Build form
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
      ]],
      first_name: ['', [
        Validators.required,
      ]],
      last_name: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
      ]],
      password1: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]],
      password2: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]],
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log('here')
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // Set object
    this.user.username = this.registerForm.get('username').value;
    this.user.first_name = this.registerForm.get('first_name').value;
    this.user.last_name = this.registerForm.get('last_name').value;
    this.user.email = this.registerForm.get('email').value;
    this.user.password1 = this.registerForm.get('password1').value;
    this.user.password2 = this.registerForm.get('password2').value;

    // Send request
    this.authService.register(this.user).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/auth/login')
      },
      err => console.log(err)
    );
  }

}

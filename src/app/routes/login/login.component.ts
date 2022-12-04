import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ){

  }

  ngOnInit(): void {
  }

  public login(): void{
    this.loginForm.markAllAsTouched();
    if(!this.loginForm.valid) return;

    this.loginForm.disable();
    this.isLoading = true;

    this.authService.authenticate(this.loginForm.value).subscribe({
      next: (res => {
        if(res && res.jwtToken) {
          this.authService.setAuth(res.jwtToken);
          this.router.navigate(['/admin/playlists'])
        }
        else{
          this.showErrorMessage('Bad credentials!')
        }

        this.loginForm.enable();
        this.isLoading = false;
      }),
      error: (err => {
        this.showErrorMessage('Bad credentials!');
        this.loginForm.enable();
        this.isLoading = false;
      })
    })
  }

  public showErrorMessage(msg: string): void{
    this.messageService.add({severity:'error', summary: 'Error', detail: msg});
  }

}

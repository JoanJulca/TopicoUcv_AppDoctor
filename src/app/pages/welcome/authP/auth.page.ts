import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseApp } from '@angular/fire/compat';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  });
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
    // Load saved credentials if rememberMe was checked
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      this.form.patchValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true
      });
    }
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as user).then(res => {
        console.log(res);
        this.getUserInfo(res.user.uid);

        // Save credentials if rememberMe is checked
        if (this.form.value.rememberMe) {
          localStorage.setItem('savedEmail', this.form.value.email);
          localStorage.setItem('savedPassword', this.form.value.password);
        } else {
          localStorage.removeItem('savedEmail');
          localStorage.removeItem('savedPassword');
        }
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: "Usuario o Contraseña Incorrectos",
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `user/${uid}`;

      this.firebaseSvc.getDocument(path).then((user: user) => {
        if (user.role === 'admin' && user.estadocuenta !== 'deshabilitado') {
          this.utilsSvc.saveInLocalStorage('user', user);
          this.utilsSvc.routerLink('/main-p/CitasPendientes');
          this.form.reset();

          this.utilsSvc.presentToast({
            message: `Te damos la Bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline'
          });
        } else {
          this.utilsSvc.presentToast({
            message: "Acceso denegado. Su cuenta ha sido deshabilitada.",
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: "No se pudo obtener la información del usuario",
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}

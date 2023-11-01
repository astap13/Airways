import { HttpClient } from '@angular/common/http';
/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { User } from '../services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public http: HttpClient,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.request();
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async request() {
    const url = `https://airways-api-ckd3.onrender.com/user`;

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.uid) {
        const userData = user;

        const requestData = {
          uid: userData.uid,
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await this.http.post(url, requestData).toPromise();
      } else {
        console.error('User data not found in localStorage');
      }
    } catch (error) {
      console.error('Error occurred during the POST request:', error);
    }
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return (
      this.afAuth
        .signInWithPopup(provider)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((result) => {
          console.log('You have been successfully logged in!');
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    location.reload();
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
}

import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBEgcyQam8MbaIQ7cYPkJKdSeU1lV6Km8Y",
    authDomain: "react-hooks-app-3a01d.firebaseapp.com",
    databaseURL: "https://react-hooks-app-3a01d.firebaseio.com",
    projectId: "react-hooks-app-3a01d",
    storageBucket: "react-hooks-app-3a01d.appspot.com",
    messagingSenderId: "255649435473",
    appId: "1:255649435473:web:5c835337dd3d7cb79f0d70",
    measurementId: "G-4F03EFY4W5"
};

class  Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login(mails , pass){
        return this.auth.signInWithEmailAndPassword(mails , pass)
    }
    logOut(){
        return this.auth.signOut()
    }

    async register(names,mails,pass){
        await this.auth.createUserWithEmailAndPassword(mails,pass)
        return this.auth.currentUser.updateProfile({
            displayName:names
        })
    }

    addAuth(authan){
        if (!this.auth.currentUser){
            return alert('Login please')
        }
        // aos yerine ne istesen yaza bilersen orda sadece document adidir
        return this.db.doc(`aos/${this.auth.currentUser.uid}`).set(
            {
                authans:authan
            }
        )
    }

       controlFirebase(){
        return new Promise(mood =>
                {
                    this.auth.onAuthStateChanged(mood)
                }
            )
        }

        getUsername(){
            return  this.auth.currentUser && this.auth.currentUser.displayName
        }
        // getAuth(){
        //     const  autha  =  this.db.doc(`aos/${this.auth.currentUser.uid}`).get()
        //     return autha.get('authans')
        // }

}

export default new Firebase();

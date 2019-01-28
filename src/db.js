import Firebase from 'firebase'
 let config = {
    apiKey: "AIzaSyCpjYf4uzrz3yKzyheFfc3lZ2ZPHszOVac",
    authDomain: "vue-lk.firebaseapp.com",
    databaseURL: "https://vue-lk.firebaseio.com",
    projectId: "vue-lk",
    storageBucket: "vue-lk.appspot.com",
    messagingSenderId: "1008368761938"
  };
let app = Firebase.initializeApp(config)
export const db = app.database()
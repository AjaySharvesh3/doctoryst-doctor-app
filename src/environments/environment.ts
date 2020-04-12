import {firestore} from 'firebase';

export const environment = {
  production: true,
  defaultAdminUsers: [
    {
      firstName: 'Ajay Sharvesh',
      lastName: 'M P',
      email: 'ajaysharvesh.mp@gmail.com'
    }
  ],
  firebase: {
    apiKey: "AIzaSyB-i7o5KQR9fSclm9TECijs6rQRpDik_y0",
    authDomain: "app-shrubsink.firebaseapp.com",
    databaseURL: "https://app-shrubsink.firebaseio.com",
    projectId: "app-shrubsink",
    storageBucket: "app-shrubsink.appspot.com",
    messagingSenderId: "324450998650",
    appId: "1:324450998650:web:2cc2b040c5456679965ec3",
    measurementId: "G-8LBZWXRF24",
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED
  }
};

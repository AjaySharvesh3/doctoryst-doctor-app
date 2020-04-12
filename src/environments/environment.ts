import {firestore} from 'firebase';

export const environment = {
  production: true,
  defaultAdminUsers: [
    {
      firstName: 'Parri',
      lastName: 'Pandian',
      email: 'parri.vp@gmail.com'
    }
  ],
  firebase: {
    apiKey: 'AIzaSyCXOhR7ihCcrYi_GsD8JBzeJNFGKKlp9qA',
    authDomain: 'angular-app-template-dev.firebaseapp.com',
    databaseURL: 'https://angular-app-template-dev.firebaseio.com',
    projectId: 'angular-app-template-dev',
    storageBucket: 'angular-app-template-dev.appspot.com',
    messagingSenderId: '902752737164',
    appId: '1:902752737164:web:9615e5d669b436c0baa8a9',
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED
  }
};

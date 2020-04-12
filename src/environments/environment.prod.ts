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
    cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED
  }
};

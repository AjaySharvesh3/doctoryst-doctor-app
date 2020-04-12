export class AppConstant {

  static readonly NAVIGATE_TO = {
    home: 'projects',
    login: 'security/login',
    logout: 'security/logout',
    forgotPassword: 'security/forgot-password',
    accessNotAuthorized: 'security/not-authorized',
    signUp: 'security/sign-up',
    pendingEmailVerification: 'security/pending-email-verification',
    resetPassword: 'security/reset-password',
    verifyEmail: 'security/verify-email'
  };

  static readonly LOGGED_IN_USER = 'LOGGED_IN_USER';
  static readonly UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS';
  static readonly USER_REGISTRATION_IN_PROGRESS = 'USER_REGISTRATION_IN_PROGRESS';
  static readonly USER_ACCOUNT_ACTION_PASSWORD_RESET = 'resetPassword';
  static readonly USER_ACCOUNT_ACTION_VERIFY_EMAIL = 'verifyEmail';


  static readonly TOP_MENU_LIST = [
    {
      menuName: 'Project',
      path: 'projects',
      active: 'true',
      helpText: 'Manage Projects'
    },
    {
      menuName: 'User',
      path: 'users',
      active: 'true',
      helpText: 'Manage Users'
    }
  ];

  static readonly REGEX = {
    emailRegex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$',
    passwordRegex: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$',
    numbersRegex: '^[0-9]*$',
    decimalNumbersRegex: '^[0-9]*\.?[0-9]*$',
    phoneNumberRegex: '[-\\s\\./0-9]*$'
  };

  static readonly MESSAGE = {
    loginErrorMessage: 'You have entered an invalid username or password.',
    emailWithNoAccessErrorMessage: 'Your email account is not authorized to access this application. ' +
      'Please contact the Administrator for access before you sign up again.'
  };

  static readonly STATUS = {
    ENABLED: 'enabled',
    DISABLED: 'disabled'
  };

  static readonly ROLES = [
    {
      code: 'admin',
      name: 'Admin',
      attribute: 'admin',
      displayOrder: 1
    },
    {
      code: 'end-user',
      name: 'User',
      attribute: 'endUser',
      displayOrder: 2
    }
  ];

  static readonly APPS = [
    {
      code: 'angular-app',
      name: 'Angular Application',
      attribute: 'angularApp',
      color: 'primary',
      route: 'angular-apps',
      displayOrder: 1
    },
    {
      code: 'node-rest-api',
      name: 'Node Rest API',
      attribute: 'nodeRestApi',
      color: 'success',
      route: 'node-rest-apis',
      displayOrder: 2
    }
  ];

}

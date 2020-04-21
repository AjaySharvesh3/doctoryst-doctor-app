export class AppConstant {

  static readonly NAVIGATE_TO = {
    home: 'home',
    stores: 'stores',
    tickets: 'tickets',
    myStores: 'my-stores',
    login: 'security/login',
    logout: 'security/logout',
    forgotPassword: 'security/forgot-password',
    accessNotAuthorized: 'security/not-authorized',
    signUp: 'security/sign-up',
    pendingEmailVerification: 'security/pending-email-verification',
    resetPassword: 'security/reset-password',
    verifyEmail: 'security/verify-email',
    pageNotFound: 'page-not-found'
  };

  static readonly LOGGED_IN_USER = 'LOGGED_IN_USER';
  static readonly LOGGED_IN_USER_ROLES = 'ROLES';
  static readonly UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS';
  static readonly USER_REGISTRATION_IN_PROGRESS = 'USER_REGISTRATION_IN_PROGRESS';
  static readonly USER_ACCOUNT_ACTION_PASSWORD_RESET = 'resetPassword';
  static readonly USER_ACCOUNT_ACTION_VERIFY_EMAIL = 'verifyEmail';


  static readonly TOP_MENU_LIST = [
    {
      menuName: 'Stores',
      path: 'stores',
      active: 'true',
      helpText: 'Manage Stores',
      allowedRoles: ['operation']
    },{
      menuName: 'Products',
      path: 'products',
      active: 'true',
      helpText: 'Manage Products',
      allowedRoles: ['operation']
    },
    {
      menuName: 'Users',
      path: 'users',
      active: 'true',
      helpText: 'Manage Users',
      allowedRoles: ['operation']
    },
    {
      menuName: 'Tickets',
      path: 'tickets',
      active: 'true',
      helpText: 'Manage Tickets',
      allowedRoles: ['support']
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
    DISABLED: 'disabled',
    DELETED: 'deleted'
  };

  static readonly ROLES = [
    {
      code: 'operation',
      name: 'Operation',
      attribute: 'operation',
      displayOrder: 1
    },
    {
      code: 'support',
      name: 'Support',
      attribute: 'support',
      displayOrder: 2
    },
    {
      code: 'business',
      name: 'Business',
      attribute: 'business',
      displayOrder: 3
    }
  ];

  static readonly TYPES = [
    {
      code: 'plants-type',
      name: 'Plants',
      attribute: 'plantsType',
      color: 'primary',
      route: 'plants-type',
      displayOrder: 1
    },
    {
      code: 'flowers-type',
      name: 'Flowers',
      attribute: 'flowersType',
      color: 'danger',
      route: 'flowers-type',
      displayOrder: 2
    },
    {
      code: 'gardening-type',
      name: 'Gardening',
      attribute: 'gardeningType',
      color: 'success',
      route: 'gardening-type',
      displayOrder: 3
    },
    {
      code: 'tools-type',
      name: 'Tools',
      attribute: 'toolsType',
      color: 'warning',
      route: 'tools-type',
      displayOrder: 3
    }
  ];

  static readonly STORE_SIDE_MENU_LIST = [
    {
      menuName: 'Store Profile',
      path: 'profile',
      active: 'true',
      helpText: 'Manage Store Profile'
    },
    {
      menuName: 'Verifications',
      path: 'verifications',
      active: 'true',
      helpText: 'Manage Verification'
    },
    {
      menuName: 'Products',
      path: 'store-products',
      active: 'true',
      helpText: 'Manage Products'
    }
  ];

  static readonly PRODUCT_LIST = [
    {
      productName: 'Plants',
      path: 'plants',
      cardTopTheme: 'card-theme-top-primary',
      imageSrc: '/assets/images/products/plants/plants_available.png',
      altText: 'Plants Logo',
      textColor: 'primary-text',
      tooltip: 'Check plants categories',
      route: 'plants',
      categoriesCount: 0
    },
    {
      productName: 'Flowers',
      path: 'flowers',
      cardTopTheme: 'card-theme-top-red',
      imageSrc: '/assets/images/products/flowers/flower_available.png',
      altText: 'Flowers Logo',
      textColor: 'red-text',
      tooltip: 'Check flowers categories',
      route: 'flowers',
      categoriesCount: 0
    },
    {
      productName: 'Gardening',
      path: 'gardening',
      cardTopTheme: 'card-theme-top-success',
      imageSrc: '/assets/images/products/gardening/gardening_available.png',
      altText: 'Gardening Logo',
      textColor: 'success-text',
      tooltip: 'Check gardening categories',
      route: 'gardening',
      categoriesCount: 0
    },
    {
      productName: 'Tools',
      path: 'tools',
      cardTopTheme: 'card-theme-top-warning',
      imageSrc: '/assets/images/products/tools/tools_available.png',
      altText: 'Tools Logo',
      textColor: 'warning-text',
      tooltip: 'Check tools categories',
      route: 'tools',
      categoriesCount: 0
    }
  ];

}

# v2.0
# Create the Angular App first with below command
# ng new angular-app-template
# Then cd to the directory 'angular-app-template' after the Angular App is initiated
# Run this shell script in the command line to generate the modules and components as defined in this file.

# Add Root Modules
# -----------------
ng g module project --module=app --routing=true

# Project Components
# ------------------
ng g component project/components/add-edit-project --module=project --skipTests=true
ng g component project/components/project-dashboard --module=project --skipTests=true
ng g component project/components/enable-disable-project --module=project --skipTests=true
ng g component project/components/project-list --module=project --skipTests=true
ng g service project/services/project --skipTests=true

# *********************

# Install Dependent Modules
# -------------------------
npm install @angular/fire @ng-bootstrap/ng-bootstrap bootstrap firebase ngx-bootstrap ngx-order-pipe ngx-webstorage-service ng-connection-service
npm install angular-font-awesome font-awesome fontawesome-svg-core free-brands-svg-icons free-solid-svg-icons
npm install

# Initialize Firebase with below command in terminal
# firebase init

# Adding a service worker to your project
# -------------------------
# ng add @angular/pwa --project angular-app-template

# Run NPM Audit Fix to Fix any Vulnerabilities
npm audit fix

## Project structure

### Angular projects
The file structure in Angular projects looks like this:

- **e2e** - End-to-end tests
- **node_modules** - Third party modules listed in package.json
- **src** - Development is done here. All Angular components, templates, styles, images, and anything else your app needs go here
  - **app** - static asset files (images, videos, fonts, etc.) - everything from this directory will be copied to dist folder
    - **components** - Components folder
      - **common** - Commom components
      - **custom** - Custom components
    - `app.component.html` - It is the root component of what will become a tree of nested components as the application evolves
    - `app.component.ts`
    - `app.module.ts` - The root module that tells Angular how to assemble the application
    - `app.routes.ts` - Routes module
  - **assets** - Static asset files (images, videos, fonts, etc.) - everything from this directory will be copied to dist folder
    - **fonts**
    - **img**
    - **js**
  - **environments** - This folder contains one file for each of your destination environments
  - **styles** - This folder contains all the global styles
    - `style.scss` - Main file where other stylesheets are imported
    - **settings** – Config, font, colors definitions...
    - **tools** – Mixins and functions
    - **generic** – Reset and/or normalize styles
    - **elements** – Basic HTML elements (H1, tables, lists, forms, links... )
    - **objects** – Grid, containers, media and animations
    - **components** - Custom component
    - **trumps** – Overrides
  - `favicon.ico`
  - `index.html`
  - `main.ts`
  - `polyfills.ts`
  - `test.ts`
  - `tsconfig.app.json`
  - `tsconfig.spec.json`
  - `typings.d.ts`
- `.angular-cli.json`
- `.editorconfig`
- `.gitignore`
- `.karma.conf.js`
- `package.json`
- `protractor.conf.js`
- `README.md`
- `tsconfig.json`
- `tslint.json`



### WordPress projects
The file structure in Wordpress projects looks like this:

- **wp** - WordPress installation
  - **wp-content**
    - **themes**
      - **your-theme**
        - **dist** - dist folder where CSS, JS and assets files are built
          - **assets** - Images, js and fonts
            - **img** - This folder contains all the images
            - **js** - This folder contains all JavaScripts files
            - **fonts** - This folder contains all the fonts
          - **styles** - This folder contains all the global styles
            - `style.scss` - Main file where other stylesheets are imported
            - **settings** – Config, font, colors definitions...
            - **tools** – Mixins and functions
            - **generic** – Reset and/or normalize styles
            - **elements** – Basic HTML elements (H1, tables, lists, forms, links... )
            - **objects** – Grid, containers, media and animations
            - **components** - Specific UI components
            - **trumps** – Overrides
        - **templates** - Custom templates
        - `index.php`
        - `functions.php`
        - `etc.`
  - **wp-admin**
  - **wp-includes**
  - `wp-config.php`

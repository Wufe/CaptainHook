# Captain Hook

[![CircleCI](https://circleci.com/gh/Wufe/CaptainHook.svg?style=svg)](https://circleci.com/gh/Wufe/CaptainHook)

### Open webhook service

Run your tasks behind a webhook.

### Requirements

+ `node`  
+ `npm`

### Installation

+ `npm install`  ( or `yarn`, if you prefer )

If `typings install` does not work, consider adding `./node_modules/.bin` to $PATH.  

### Reporting issues

+ Look for any related issues.  
+ If you find an issue that seems related, plase comment there instead of creating a new one.  
+ If you find no related issue, create a new one.  
+ Include all details you can ( operative system, environment, interpreter version, etc.. )  
+ Include the error log.  
+ Remember to check the discussion and update if there are changes.

### Contributing

+ Fork the repository  
+ Create your feature branch  
+ Commit your changes and push the branch  
+ Submit a pull request  

### Start development

+ `npm run dev` to start all transpilers.  
+ `npm run dev:core` to start core transpiler.  
+ `npm run dev:frontend` to start frontend transpiler.  

### Test

Run `yarn` or `npm install`, then `npm test`.

### Project structure

`build` contains the transpiled code for development stages.  
`config` contains sequelize configuration.
`dist` contains the transpiled code for production stages.  
`migrations` contains sequelize migrations.
`seeders` contains sequelize seeders.  
`src/core` contains the application logic source code. Entrypoint `index.tsx`.  
`src/frontend` contains the source for the frontend javascript. Source starting from `index.tsx`.  
`test` contains unity and integration tests.  
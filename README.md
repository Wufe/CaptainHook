# Captain Hook

[![CircleCI](https://circleci.com/gh/Wufe/CaptainHook.svg?style=svg)](https://circleci.com/gh/Wufe/CaptainHook)

### Open webhook service

Run your tasks behind a webhook.

### Requirements

+ `node`  
+ `npm`

### Installation

+ `npm install`  
+ `typings install`

If `typings install` does not work, consider adding `./node_modules/.bin` to $PATH.  
Otherwise `npm i -g typings`.

### Start development

+ `npm run dev` to start all transpilers.  
+ `npm run dev:core` to start core transpiler.  
+ `npm run dev:frontend` to start frontend transpiler.  

### Project structure

`build` contains the transpiled code for development stages.  
`dist` contains the transpiled code for production stages.  
`src/core` contains the application logic source code. Entrypoint `index.tsx`.  
`src/frontend` contains the source for the frontend javascript. Source starting from `index.tsx`.  
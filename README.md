# Captain Hook

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
+ `npm run dev:cli` to start cli transpiler.  
+ `npm run dev:frontend` to start frontend transpiler.  
+ `npm run dev:server` to start server transpiler.  
+ `npm start` to transpile cli, frontend and server once, and run the server.

### Project structure

`src` contains main source code.  
`src/chook` contains the application logic. Entrypoint `index.tsx`.  
`src/chook/build` contains the transpiled code for the application logic.
`src/cli` contains source code for the cli component. The source starts from `index.tsx`.  
`src/cli/bin` contains the bin `chook` for development environment.  
`src/cli/build` is the folder where transpiled code will be put.  
`src/frontend` contains the source for the frontend javascript. Source starting from `index.tsx`.  
`src/frontend/build/assets/javascript` contains the transpiled javascript.  
`src/server` is for the server folder.  
`src/server/build` contains the transpiled code for the server.
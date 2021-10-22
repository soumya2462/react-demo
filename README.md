# Run app locally

Open design.ui folder in VS Code<br />
Add an .env file in the root directory with

``` 
REACT_APP_CLIENT_ID=<clientID>
REACT_APP_CLIENT_SECRET=<secret>
REACT_APP_DESIGN_GATEWAY_URL=http://localhost:10011
REACT_APP_AUTHENTICATION_URL=http://localhost:10081
```

Ask any dev from the team for the id and secret.

Open a terminal within VS Code and use `yarn` or `yarn install` (This will take a few minutes).
And then do `yarn start`<br />
This is using redux and configured to show the store in redux dev tools in Chrome or Firefox.<br />


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It has been ejected.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs the packages in package.json and all required dependencies.
Only needs to run when package.json is changed after a pull.

### `yarn add`

Adds a package to the project, installing and adding it to package.json dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the config files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

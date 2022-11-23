// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCzsMKZfdandxhx8hLqkUVG2LUT2C18WmI",
    authDomain: "grumpisgamificacion.firebaseapp.com",
    databaseURL: "https://grumpisgamificacion-default-rtdb.firebaseio.com",
    projectId: "grumpisgamificacion",
    storageBucket: "grumpisgamificacion.appspot.com",
    messagingSenderId: "216276560508",
    appId: "1:216276560508:web:4e6e04ff36024d5b0777f9",
    measurementId: "G-LLHYNTR4C0"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

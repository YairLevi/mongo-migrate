"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = __importStar(require("fs"));
const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     *
     * The function below can accessed using `window.Main.sayHello`
     */
    sendMessage: (message) => {
        electron_1.ipcRenderer.send('message', message);
    },
    /**
      Here function for AppBar
     */
    Minimize: () => {
        electron_1.ipcRenderer.send('minimize');
    },
    Maximize: () => {
        electron_1.ipcRenderer.send('maximize');
    },
    Close: () => {
        electron_1.ipcRenderer.send('close');
    },
    /**
     * Provide an easier way to listen to events
     */
    on: (channel, callback) => {
        electron_1.ipcRenderer.on(channel, (_, data) => callback(data));
    },
    /**
     * Test: create a file and text
     */
    create: (data) => {
        fs.writeFileSync('file.txt', data);
    }
};
electron_1.contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
electron_1.contextBridge.exposeInMainWorld('ipcRenderer', electron_1.ipcRenderer);

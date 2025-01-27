![Module Hooks Logo](./modulehooks.svg)

![](https://img.shields.io/npm/dw/%40modulehooks%2Fmodulehooks?color=336633&style=for-the-badge)
![](https://img.shields.io/npm/v/%40modulehooks%2Fmodulehooks?color=66cc33&style=for-the-badge)
![](https://img.shields.io/github/repo-size/%40modulehooks%2Fmodulehooks?color=66cc33&label=Size&style=for-the-badge)
![](https://img.shields.io/github/license/%40modulehooks%2Fmodulehooks?color=333333&style=for-the-badge)

## Getting Started

**For module type imports:**
```sh
  npm install @modulehooks/module --save-dev
```

**For commonjs type imports:**
```sh
  npm install @modulehooks/commonjs --save-dev
```

## Run Code with Custom Module Hook
```sh
  node --import @modulehooks/module example.js
```

## Run Code with Loader (Legacy)
```sh
  node --loader @modulehooks/commonjs example.js
```

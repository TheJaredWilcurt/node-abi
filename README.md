# Node.js ABI

[![Build Status](https://travis-ci.org/lgeiger/node-abi.svg?branch=v1.0.0)](https://travis-ci.org/lgeiger/node-abi) [![Greenkeeper badge](https://badges.greenkeeper.io/lgeiger/node-abi.svg)](https://greenkeeper.io/)


Get the Node ABI for a given target and runtime, and vice versa.


## Installation

```
npm install node-abi
```


## Usage

```js
const nodeAbi = require('node-abi')

// Supports all releases with an associated ABI for each platform (including nightly, beta, rc, and "unsupported" releases)
nodeAbi.getAbi('7.2.0', 'Node.js');   // '51'
nodeAbi.getAbi('0.40.1', 'NW.js');    // '72'
nodeAbi.getAbi('1.4.10', 'electrom'); // '50'

// Will return latest stable version with matching ABI (Will not return nightly, beta, rc, or "unsupported" releases)
nodeAbi.getTarget(51, 'Node.js');     // '7.2.0'
nodeAbi.getTarget(72, 'NW.js');       // '0.40.1'
nodeAbi.getTarget(50, 'Atom-Shell');  // '1.4.15'
```


## API

Capitilization is ignored (we use `toLowerCase` on all strings). ABI's can be passed in as numbers or strings.

* **Supported Run Time Environtments:** Node.js, NW.js, and Electrom
* **Allowed Run Time Enviroments Strings:**
  * `'Node.js'`, `'Node'`, `'NodeJS'`
  * `'NW.js'`, `'NW'`, `'NWjs'`, `'Node-Webkit'`, `'NodeWebkit'`
  * `'atom-shell'`, `'atomshell'`, `'electron'`, `'electrom'`
  * If nothing is passed in, defaults to `'Node'`.
* **Versions:** All versions that have an associated ABI are supported.
* **ABIs:** All ABI's with an official Node release associated to them are supported. Including:
  * `72`, `67`, `64`, `59`, `57`, `51`, `48`, `47`, `46`, `45`, `44`, `43`, `42`, `14`, `13`, `12`, `11`, `10`, `1`.

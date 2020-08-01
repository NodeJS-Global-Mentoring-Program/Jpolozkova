"use strict";

require("core-js/modules/es.array.reverse");

require("core-js/modules/es.string.split");

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});
rl.on('line', line => {
  let res = line.split("").reverse().join("");
  console.log(res);
});
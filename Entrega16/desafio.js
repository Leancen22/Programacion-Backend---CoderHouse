import minimist from "minimist";

let options = {alias: {modo: 'm', p: 'puerto', d: 'debug'}}
console.log(minimist(process.argv.slice(2), options))

options = {default: {modo: 'prod', puerto: 0, debug: false}}
console.log(minimist(process.argv.slice(2), options))
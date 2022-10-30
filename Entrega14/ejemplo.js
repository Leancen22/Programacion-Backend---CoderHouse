import minimist from "minimist";

console.log(minimist([1, 2, 3, 4, 'a', 'b', 'c']))
console.log(minimist([1, '2', '10.23.45', {a: 1, b: 2}]))

console.log(minimist(['-p', '8080', '--environment', 'dev', 'valor_suelto', '--bandera']))

let options = {default: {nombre: 'Bandalos', apellido: 'Chinos'}}
console.log(minimist(['valor_sin_parametro', '--bandera1', '-a', 1, '--nombre', 'Artyc'], options))

options = {alias: {n: 'nombre', a: 'apellido'}}
console.log(minimist(['valor_sin_parametro', '--bandera1', '-a', 1, '--nombre', 'Artyc'], options))
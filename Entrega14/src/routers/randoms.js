//Retortna numeros del 1 al 1000 aleatorios
const randomNum = () => {
    return Math.floor(Math.random() * 1000 + 1);
};
  
const calcularNums = (cant) => {
    const numbers = {};
    //Se ejecuta cant veces, este parametro es enviado por fork.send
    while (cant > 0) {
        const num = randomNum();
        //Si se encuentra el numero obtenido por random suma 1 a la cantidad , sino lo define como 1
        numbers[num] ? numbers[num] += 1 : numbers[num] = 1;
        cant -= 1;
    }
    return numbers;
};
  
//Mientras el proceso continua se envian los numeros
process.on('message', msg => {
    const numeros = calcularNums(msg.cant);
    process.send({ numeros });
});

//Proceso finalizado, se usa como bandera
process.send('Proceso terminado');
  
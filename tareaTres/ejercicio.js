function suma(num1,num2){
        return parseInt(num1)+parseInt(num2);
}

let prim = prompt("ingresa un número:");
let segun = prompt("ingresa otro número:");
let res = suma(prim,segun);
console.log("La suma de los dos numeros dados es:"+res);

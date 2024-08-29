let numeroMaquina = Math.floor(Math.random()*(10 - 1)+1);
    console.log(numeroMaquina);
 
let numeroUsuario = parseInt ( prompt("Adivina un numero del 1 al 10"));

let vidas= 3;
 while (numeroMaquina !== numeroUsuario && vidas > 1){
    vidas --;
    numeroUsuario = parseInt (prompt ("Vuelve a intentarlo , tus vidas son: "+vidas));
 }

 if (numeroMaquina === numeroUsuario){
    console.log("Ganaste un gato golpe");
 }else {
    console.log("Perdiste");
    console.log("El numero secreto era: "+numeroMaquina);

 }
/**
 * Created by usuario on 03/05/2017.
 */
var botonInicio = document.getElementById("inicio");
var botonPausa = document.getElementById("pausa");
var botonContinuar = document.getElementById("continuar");
var botonReinicio = document.getElementById("reiniciar");
var botonGuardar = document.getElementById("guardar");

var control;

window.onload = function()
{
    TABLA(false);
    startDB();


    botonInicio.addEventListener("click", function()
    {
        PAUSA(false);
        INICIOCRONO(false);
    }, true);

    botonPausa.addEventListener("click", function()
    {
        PAUSACRONO();
    });


    botonContinuar.addEventListener("click", function()
    {
        PAUSA(false);
        INICIOCRONO(true);
    }, true);


    botonReinicio.addEventListener("click", function()
    {
        REINICIOCRONO();
    });

    botonGuardar.addEventListener("click", function()
    {
        GUARDAR();
    });

};



function TABLA(cargar)
{
    botonInicio.hidden = false;
    botonReinicio.hidden = true;
    botonPausa.hidden = true;
    botonContinuar.hidden = true;
    botonGuardar.hidden = true;

    var listaImg = ["image_part_001.jpg", "image_part_002.jpg", "image_part_003.jpg", "image_part_004.jpg", "image_part_005.jpg", "image_part_006.jpg", "image_part_007.jpg", "image_part_008.jpg", "image_part_009.jpg", "image_part_010.jpg", "image_part_011.jpg", "blanco.jpg"];


    if(cargar!==false)
    {
        listaImg = [];
        for(var i= 0; i<cargar.length; i++)
        {
            listaImg.push(cargar[i].substring(41));
        }
        botonInicio.hidden = true;
        botonPausa.hidden = true;
        botonContinuar.hidden = false;
        botonReinicio.hidden = false;
        botonGuardar.hidden=false;
        console.log(listaImg);
    }

    var filas = 3;
     var columnas = 4;

    //CREAR A TABOA
     var tabla = document.createElement("table");
     tabla.setAttribute("id", "tabla");
     tabla.setAttribute("border", "1px");
     var tblBody = document.createElement("tbody");

     var base = document.getElementById("divtabla");


    for (var i = 0; i < filas; i++)
    {
        var hilera = document.createElement("tr");

         for (var j = 0; j < columnas; j++)
         {
             var celda = document.createElement("td");

             hilera.appendChild(celda);
         }

        tblBody.appendChild(hilera);
     }

     tabla.appendChild(tblBody);
     base.appendChild(tabla);

    var celdas = document.getElementsByTagName("td");


    for(i = 0; i<celdas.length; i++)
    {
        var imagen = document.createElement("img");
        celdas[i].appendChild(imagen);
    }

    var imgs = document.getElementsByTagName("img");


    for(i = 0; i<imgs.length; i++)
    {
        var output = '';


        if(i>=0 && i<listaImg.length)
        {
            output = listaImg[i];
        }

        imgs[i].setAttribute("src", "");
        imgs[i].setAttribute("id", "imagen" + i);
        imgs[i].src = "img/pieces/" + output;
        imgs[i].setAttribute("width", "128px");
        imgs[i].setAttribute("height", "128px");
        imgs[i].setAttribute("onclick", "MOVIMIENTO(this, false);");
    }

    if(cargar===false)
    {
        PAUSA(true);
    }
    if(cargar!==false)
    {
        PAUSACRONO(false);
    }
}

function buscarBlanco()
{
    var imgs = document.getElementsByTagName("img");

    for(var i = 0; i<imgs.length; i++)
    {
        if(imgs[i].src==='http://localhost/crebacabezas/img/pieces/blanco.jpg')
        {
            return imgs[i];
        }
    }
}


function COMPROBAR(){
    var listaImg = ["http://localhost/crebacabezas/img/pieces/image_part_001.jpg", "http://localhost/crebacabezas/img/pieces/image_part_002.jpg", "http://localhost/crebacabezas/img/pieces/image_part_003.jpg", "http://localhost/crebacabezas/img/pieces/image_part_004.jpg", "http://localhost/crebacabezas/img/pieces/image_part_005.jpg", "http://localhost/crebacabezas/img/pieces/image_part_006.jpg", "http://localhost/crebacabezas/img/pieces/image_part_007.jpg", "http://localhost/crebacabezas/img/pieces/image_part_008.jpg", "http://localhost/crebacabezas/img/pieces/image_part_009.jpg", "http://localhost/crebacabezas/img/pieces/image_part_010.jpg", "http://localhost/crebacabezas/img/pieces/image_part_011.jpg", "img/pieces/blanco.jpg"];
    var arraySolucion = []; //array no que se garda a imaxe ordeada para poder comprobar se se gaña o xogo

    var celdas = document.getElementsByTagName("img");


    for(var i = 0; i<celdas.length; i++)
    {
        arraySolucion.push(celdas[i].getAttribute("src"));
    }


        if(listaImg[0].substring(listaImg[0].length-18) === arraySolucion[0].substring(arraySolucion[0].length-18) && listaImg[1].substring(listaImg[1].length-18) ===arraySolucion[1].substring(arraySolucion[1].length-18)
        && listaImg[2].substring(listaImg[2].length-18) === arraySolucion[2].substring(arraySolucion[2].length-18) && listaImg[3].substring(listaImg[3].length-18) === arraySolucion[3].substring(arraySolucion[3].length-18)
        && listaImg[4].substring(listaImg[4].length-18) === arraySolucion[4].substring(arraySolucion[4].length-18) && listaImg[5].substring(listaImg[5].length-18) === arraySolucion[5].substring(arraySolucion[5].length-18)
        && listaImg[6].substring(listaImg[6].length-18) === arraySolucion[6].substring(arraySolucion[6].length-18) && listaImg[7].substring(listaImg[7].length-18) === arraySolucion[7].substring(arraySolucion[7].length-18)
        && listaImg[8].substring(listaImg[8].length-18) === arraySolucion[8].substring(arraySolucion[8].length-18) && listaImg[9].substring(listaImg[9].length-18) === arraySolucion[9].substring(arraySolucion[9].length-18)
        && listaImg[10].substring(listaImg[10].length-18) === arraySolucion[10].substring(arraySolucion[10].length-18))
        {
            alert("HAS GANADO");
            PAUSACRONO(true);
        }


}

function MOVE(elemento, celda)
{
    var cambio = celda.src;

    celda.removeAttribute("src");
    console.log(elemento);
    celda.setAttribute("src", elemento.src);
    elemento.removeAttribute("src");
    elemento.setAttribute("src", cambio);
}

function MOVIMIENTO(elemento, randomize)
{

        var celdas = document.getElementsByTagName("img");

        for (var i = 0; i < celdas.length; i++) {
            if (celdas[i].src === elemento.src) {
                var num = i; //ASIGNAR NUMERO DE CELDA AL ELEMENTO CLICADO
            }
        }

        var rightCell = celdas[num + 1];
        var leftCell = celdas[num - 1];
        var topCell = celdas[num - 4];
        var bottomCell = celdas[num + 4];


        if(randomize === true)
        {
            var randomnum = Math.round(Math.random()*4);

            switch(randomnum)
            {
                case 1:
                    if (rightCell !== undefined && num !== 3 && num !== 7)
                    {
                        MOVE(elemento, rightCell);
                    }
                    break;
                case 2:
                    if (leftCell !== undefined && num !== 4 && num !== 8)
                    {
                        MOVE(elemento, leftCell);
                    }
                    break;
                case 3:
                    if (topCell !== undefined)
                    {
                        MOVE(elemento, topCell);
                    }
                        break;
                case 4:
                    if (bottomCell !== undefined)
                    {
                        MOVE(elemento, bottomCell);
                    }
                    break;
                }
        }

        else
        {
            if (rightCell !== undefined && rightCell.src === "http://localhost/crebacabezas/img/pieces/blanco.jpg" && num !== 3 && num !== 7)//estas duas ultimas posibilidades de num controlan que a imaxe non poda cambiar de fila
            {
                MOVE(elemento, rightCell);
                COMPROBAR();
            }
            if (leftCell !== undefined && leftCell.src === "http://localhost/crebacabezas/img/pieces/blanco.jpg" && num !== 4 && num !== 8) {

                MOVE(elemento, leftCell);
                COMPROBAR();
            }
            if (topCell !== undefined && topCell.src === "http://localhost/crebacabezas/img/pieces/blanco.jpg") {
                MOVE(elemento, topCell);
                COMPROBAR();
            }
            if (bottomCell !== undefined && bottomCell.src === "http://localhost/crebacabezas/img/pieces/blanco.jpg") {
                MOVE(elemento, bottomCell);
                COMPROBAR();
            }
        }
}

var minutos = 0;
var segundos = 0;
var centesimas = 0;

var idMinutos = document.getElementById("minutos");
var idSegundos= document.getElementById("segundos");
var idCentesimas = document.getElementById("centesimas");



function INICIOCRONO(continuar)
{
    if(continuar===false)
    {
        for(var i=0; i<500; i++)
        {
            var celdablanco = buscarBlanco();
            MOVIMIENTO(celdablanco, true);
        }
    }

    control = setInterval(CRONO, 10);
    botonInicio.hidden = true;
    botonPausa.hidden = false;
    botonContinuar.hidden = true;
    botonReinicio.hidden = true;
    botonGuardar.hidden = true;

}
function PAUSA(pausar)
{
    var celdas = document.getElementsByTagName("img");

    if(pausar===true)
    {
        for(var i = 0; i<celdas.length; i++)
        {
            celdas[i].removeAttribute("onclick");
        }
    }
    else{
        for(i = 0; i<celdas.length; i++)
        {
            celdas[i].style.opacity = 1;
            celdas[i].setAttribute("onclick", "MOVIMIENTO(this, false);");
        }
    }

}

function PAUSACRONO(victoria)
{

    var celdas = document.getElementsByTagName("img");
    botonGuardar.hidden = false;


    PAUSA(true);

    for(var i = 0; i<celdas.length; i++)
    {
        celdas[i].style.opacity = 0.5;
    }
        clearInterval(control);
    if(victoria === true)
    {
        botonInicio.hidden = true;
        botonPausa.hidden = true;
        botonContinuar.hidden = true;
        botonGuardar.hidden = true;
        botonReinicio.hidden = false;
    }
    else{
        botonInicio.hidden = true;
        botonPausa.hidden = true;
        botonContinuar.hidden = false;
        botonReinicio.hidden = false;
    }


}

function REINICIOCRONO()
{
    clearInterval(control);

    botonContinuar.hidden = true;
    botonReinicio.hidden = true;
    minutos = 0;
    segundos = 0;
    centesimas = 0;

    idMinutos.innerHTML = "00";
    idSegundos.innerHTML = ":00";
    idCentesimas.innerHTML = ":00";

    var tabla = document.getElementsByTagName("table");
    tabla[0].remove();
    PAUSA(true);
    TABLA(false);
}

function CRONO()
{
    if (centesimas < 99) {
        centesimas++;
        if (centesimas < 10) { centesimas = "0"+centesimas }
        idCentesimas.innerHTML = ":"+centesimas;
    }
    if (centesimas == 99) {
        centesimas = -1;
    }
    if (centesimas == 0) {
        segundos ++;
        if (segundos < 10) { segundos = "0"+segundos }
        idSegundos.innerHTML = ":"+segundos;
    }
    if (segundos == 59) {
        segundos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0) ) {
        minutos++;
        if (minutos < 10) { minutos = "0"+minutos }
        idMinutos.innerHTML = minutos;
    }
}

function GUARDAR()
{
    var imagenes = document.getElementsByTagName("img");
    var partidas = document.getElementsByClassName("nombrePartida");
    var nombres = []; //array de nombres usados anteriormente

    for(i=0; i<partidas.length;i++)
    {
        nombres.push(partidas[i].id);
    }
    var nombre = prompt("Introduce un nombre de usuario", "");
    var arrayImagenes = [];
    var arrayCrono = [minutos, segundos, centesimas];

    for(var i = 0; i<nombres.length; i++)
    {
        if(nombre.toLowerCase() == nombres[i].toLowerCase())
        {
            alert("Ese nome de usuario xa existe. Por favor elixa outro");
            return false;
        }
        if(nombre===null)
        {
            alert("Por favor elixa un nome para a partida");
            return false;
        }
    }

    for(i = 0; i<imagenes.length; i++)
    {
        arrayImagenes.push(imagenes[i].getAttribute("src"));
    }


    console.log(arrayImagenes);
    console.log(arrayCrono);

    add(nombre, arrayImagenes, arrayCrono);
}

function startDB() {

    dataBase = indexedDB.open('crebacabezasDB', 1);

    dataBase.onupgradeneeded = function (e) {
        var active = dataBase.result;

        var object = active.createObjectStore("almacen", {keyPath: 'id', autoIncrement: true});
        object.createIndex('usuario', 'usuario', {unique: false});
        object.createIndex('imagenes', 'imagenes', {unique: false});
        object.createIndex('crono', 'crono', {unique: true});

    };

    dataBase.onsuccess = function (e) {
        console.log('Database loaded');
        loadAll();
    };
    dataBase.onerror = function (e) {
        alert('Error loading database');
    };
}

function add(usuario, imagenes, crono) {

    var active = dataBase.result;
    var data = active.transaction(["almacen"], "readwrite");
    var object = data.objectStore("almacen");

    var request = object.put({
        usuario: usuario,
        imagenes: imagenes,
        crono: crono
    });

    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
        alert('Partida gardada');
        loadAll();
    };
}

function loadAll() {

    var active = dataBase.result;
    var data = active.transaction(["almacen"], "readonly");
    var object = data.objectStore("almacen");

    var elements = [];

    object.openCursor().onsuccess = function (e) {

        var result = e.target.result;

        if (result === null) {
            return;
        }

        elements.push(result.value);
        result.continue();

    };

    data.oncomplete = function () {

        var outerHTML = '';

        for (var key in elements) {


            outerHTML += '\n\
                            <button type="button" class="nombrePartida"  id="' + elements[key].usuario  + '" onclick="load(' + elements[key].id + ');">' + elements[key].usuario + '</button><br/><br/>\n\
                        ';

        }

        elements = [];
        document.querySelector("#partidas").innerHTML = outerHTML;
    };

}

function load(id)
{
    var active = dataBase.result;
    var data = active.transaction(["almacen"], "readonly");
    var object = data.objectStore("almacen");

    var request = object.get(parseInt(id));

    request.onsuccess = function () {
        var result = request.result;

        if (result !== undefined) {
            alert("Partida de " + result.usuario + " cargada con éxito!");

            if(control==undefined)
            {
                control = setInterval(CRONO, 10);
            }

            CARGARPARTIDA(result.imagenes, result.crono)
        }
    };
}

function CARGARPARTIDA(imagenes, crono)
{
    var tabla = document.getElementsByTagName("table");
    tabla[0].remove();
    TABLA(imagenes);

    minutos = crono[0];
    segundos = crono[1];
    centesimas = crono[2];

    idCentesimas.innerHTML = ":"+centesimas;
    idSegundos.innerHTML = ":"+segundos;
    idMinutos.innerHTML = "0"+minutos;



}


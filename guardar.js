/**
 * Created by usuario on 15/05/2017.
 */
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
if ('webkitIndexedDB' in window) {
    window.IDBTransaction = window.webkitIDBTransaction;
    window.IDBKeyRange = window.webkitIDBKeyRange;
    window.IDBCursor = window.webkitIDBCursor;
    window.IDBDatabaseException = window.webkitIDBDatabaseException;
    window.IDBRequest = window.webkitIDBRequest;
}

var objectDB = {};
objectDB.indexedDB = {};
objectDB.indexedDB.db = null;
objectDB.indexedDB.onerror = function(e){
    console.log(e);
};

objectDB.indexedDB.abrir = function()
{
    var version = 1;
    var abrir = indexedDB.open("crebacabezasBD", version);

    abrir.onupgradeneeded = function(e)
    {
      console.log("Actualizando base de datos...");
        objectDB.indexedDB.db = e.target.result;
        var db = objectDB.indexedDB.db;

        if(db.objectStoreNames.contains("javascriptBD"))
        {
            //SI EXISTE EL ALMACÉN HACER TAL
        }
        else
        {
            var almacen = db.createObjectStore("javascriptBD", {keyPath: "id", autoIncrement:true});
            almacen.createIndex("idObjetoIndex", "idObjeto", {unique:false});
        }
        console.log("version de la base de datos: " + db.version);
    };

    abrir.onsuccess = function(e)
    {
        console.log("Base de datos cargada");
        objectDB.indexedDB.db = e.target.result;
        console.log("Version de la base de datos: " + objectDB.indexedDB.db.version);
    };
    abrir.onerror = objectDB.indexedDB.onerror;
};

objectDB.indexedDB.engadirObxecto = function(idObxecto, arrayObxecto, cronoObxecto)
{
    var db = objectDB.indexedDB.db;
    var trans = db.transaction(["javascriptBD"], "readwrite");
    var almacen = trans.objectStore("javascriptBD");
    var datos = {
        "idObxecto": idObxecto,
        "arrayObxecto": arrayObxecto,
        "cronoObxecto": cronoObxecto
    };

    var engadir = almacen.put(datos);
    engadir.onsuccess = function(e)
    {
        console.log("Obxecto engadido a base de datos");
    };
    engadir.onerror = function(e)
    {
        console.log("erro ao introducir o obxecto: ", e);
    };
    trans.oncomplete = function(e)
    {
        console.log("Transaccion completada");
    };
};

objectDB.indexedDB.recuperarObxecto = function(id)
{
    var db = objectDB.indexedDB.db;
    var trans = db.transaction(["javascriptDB"], "readonly");
    var almacen = trans.objectStore("javascriptBD");
    var recuperar = almacen.get(id);
    recuperar.onsuccess = function(e)
    {
        console.log("Recuperacion completada");
        var datos = {
            "idObxecto": e.result.idObxecto,
            "arrayObxecto": e.result.arrayObxecto,
            "cronoObxecto": e.result.cronoObxecto
        };

        return datos;
    };

    recuperar.onerror = function(e)
    {
      console.log("Erro ao recuperar o obxecto: " + e);
    };
};




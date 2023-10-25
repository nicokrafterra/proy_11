// Importación de módulos necesarios
const colors = require('colors'); // Módulo para dar estilo al texto en la consola.
const fs = require('fs').promises; // Módulo para trabajar con el sistema de archivos.
const readline = require('readline').createInterface({ // Módulo para leer la entrada del usuario desde la consola.
    input: process.stdin,
    output: process.stdout,
});

// Definición de la clase Producto
class Producto {
    // Se definen propiedades privadas de la clase
    #codigoproducto;
    #nombreproducto;
    #inventarioproducto;
    #precioproducto;

    constructor() {
        this.#codigoproducto = '';
        this.#nombreproducto = '';
        this.#inventarioproducto = 0;
        this.#precioproducto = 0;
    }

    // Métodos getter y setter para las propiedades de Producto
    get codigoproducto() {
        return this.#codigoproducto;
    }
    set codigoproducto(codigo) {
        this.#codigoproducto = codigo;
    }
    get nombreproducto() {
        return this.#nombreproducto;
    }
    set nombreproducto(nombre) {
        this.#nombreproducto = nombre;
    }
    get inventarioproducto() {
        return this.#inventarioproducto;
    }
    set inventarioproducto(inventario) {
        this.#inventarioproducto = inventario;
    }
    get precioproducto() {
        return this.#precioproducto;
    }
    set precioproducto(precio) {
        this.#precioproducto = precio;
    }
}

// Definición de la clase ProductosTienda
class ProductosTienda {
    #listaproductos;

    constructor() {
        this.#listaproductos = [];
    }

    // Método getter y setter para la lista de productos
    get listaproductos() {
        return this.#listaproductos;
    }
    set listaproductos(lista) {
        this.#listaproductos = lista;
    }

    // Método para mostrar la lista de productos
    mostrarproductos() {
        this.#listaproductos.forEach((producto) => {
            console.log(
                `|     ` +
                producto.codigoproducto +
                `     |` +
                `      ` +
                producto.nombreproducto +
                `     |` +
                `      ` +
                producto.inventarioproducto +
                `     |` +
                `      ` +
                producto.precioproducto +
                `     |`
            );
        });
    }
}

// Declaración de una función asincrónica que toma un parametro llamado "productostienda".
const cargaarchivoproductos = async (productostienda) => { 
    try {
        // Se intenta leer el contenido del archivo "datos.json" de forma asincrónica.
        const data = await fs.readFile('./datos.json', 'utf-8'); 
        // Se parsea el contenido del archivo JSON y se almacena en la propiedad "listaproductos" de "productostienda".
        /*La funciion JSON.parce se utiliza para deserializar las cadenas de texto en formato JSON
        y los convierte en un objeto JavaScript*/
        productostienda.listaproductos = JSON.parse(data); 
        console.log(`Productos cargados desde datos.json`.bgBlue); 
    } catch (error) {
        // En caso de error al cargar el archivo, se muestra un mensaje de error.
        console.error(`Error al cargar el archivo: ${error.message}`.bgRed); 
    }
};

// Se define la funcion de tipo constante asincronica y felcha agregarProducto con dos parametros que son "productostienda"y"nuevo producto"
const agregarProducto = async (productostienda, nuevoProducto) => {
    //la funcion .push añade los objetos indicados al arreglo y debuelbe la nueva longitud del arreglo
    productostienda.listaproductos.push(nuevoProducto);
    console.log(`Producto agregado:`.bgGreen);
    console.log(nuevoProducto);
    //await funcion "await grabar productos" espera a que gravar productos se ejecute
    //la funcion .map permite iterar añadiendo objetos a un arreglo 
    await grabararchivoproductos(productostienda.listaproductos.map(producto => ({
        codigoproducto: producto.codigoproducto,
        nombreproducto: producto.nombreproducto,
        inventarioproducto: producto.inventarioproducto,
        precioproducto: producto.precioproducto,
    })));
};

// Función para grabar la lista de productos en un archivo JSON
const grabararchivoproductos = async (listaproductos) => {
    //la funcion "try , catch" es usada para detectar errores y solucionarlos "try" detecta los errores y "catch" los soluciona 
    try {
        /*se crea una constante llamada cadenaJson que contiene una funcion JSON.stringfy que se encarga de comvertir
        listaproductos a formto texto JSON,manteniendo todas las propiedades del listaproductos y dejando un espacion en blanco de 2*/
        const cadenaJson = JSON.stringify(listaproductos, null, 2);
        const nombrearchivo = './datos.json';
        /*la funcion fs.whiteFile sirve para reemplasar o crear contenido en los archivos*/
        await fs.writeFile(nombrearchivo, cadenaJson, 'utf-8');
        console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);
    } catch (error) {
        console.error(`Error al guardar el archivo: ${error.message}`.bgRed);
    }
};

// Se declara la función mostrarMenu como una función de flecha sin parámetros.
const mostrarMenu = () => {
    // Se crea una nueva promesa que toma un argumento de función con un parámetro 'resolve'.
    return new Promise((resolve) => {
        console.log(`=========================`.green);
        console.log(`     Seleccione una opción    `.green);
        console.log(`=========================\n`.green);
        console.log(`${'1'.red} Crear nuevo producto`);
        console.log(`${'2'.red} Listar productos`);
        console.log(`${'3'.red} Salir\n`);
        // Utiliza la función readline.question para solicitar al usuario que seleccione una opción
        readline.question('Seleccione una opción: ', (opt) => {
            // Cuando el usuario proporciona una opción se resuelve la promesa con la opción elegida
            resolve(opt);
        });
    });
};

// Se declara la función pausa como una función de flecha sin parámetros
const pausa = () => {
    // Se crea una nueva promesa que toma un argumento de función con un parámetro 'resolve'
    return new Promise((resolve) => {
        // Utiliza la función readline.question para solicitar al usuario que presione "ENTER" para continuar
        readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt) => {
            // Cuando el usuario presiona "ENTER", se resuelve la promesa
            resolve();
        });
    });
};

// Declaración de una función asincrónica sin parámetros                            
const obtenerDetallesProducto = async () => {
    // Se crea una nueva promesa que toma un argumento de función con un parámetro 'resolve'
    return new Promise((resolve) => {
        // Se crea una instancia de la clase Producto
        const nuevoProducto = new Producto();
        // Se utiliza readline.question para solicitar detalles del producto de forma interactiva
        readline.question('Código del producto: ', (codigo) => {
            // Se asigna el código del producto a la propiedad correspondiente de la clase Producto
            nuevoProducto.codigoproducto = codigo;
            readline.question('Nombre del producto: ', (nombre) => {
                // Se asigna elnombre del producto a la propiedad correspondiente de la clase Producto
                nuevoProducto.nombreproducto = nombre;
                readline.question('Inventario del producto: ', (inventario) => {
                    // Se asigna el inventario del producto a la propiedad correspondiente de la clase Producto después de convertirlo a un entero.
                    nuevoProducto.inventarioproducto = parseInt(inventario);
                    readline.question('Precio del producto: ', (precio) => {
                        // Se asigna el precio del producto a la propiedad correspondiente de la clase Producto después de convertirlo a un número de punto flotante
                        nuevoProducto.precioproducto = parseFloat(precio);
                        // Cuando se han recopilado todos los detalles del producto, se resuelve la promesa con la clase Producto completa
                        resolve(nuevoProducto);
                    });
                });
            });
        });
    });
};

// Función principal que ejecuta el programa
const main = async () => {
    console.clear();
    console.log('***********************');
    console.log('**  PROYECTO CLASES  **');
    console.log('***********************\n');
    // Se crea una instancia de la clase "ProductosTienda" para administrar productos.
    let productostienda = new ProductosTienda();
    // Se carga información de productos desde un archivo en la instancia de "productostienda".
    await cargaarchivoproductos(productostienda);
    // Se crea una variable "salir" en falso para controlar la ejecución del bucle.
    let salir = false;
    // Se inicia un bucle que se ejecutará hasta que la variable "salir" sea verdadera.
    while (!salir) {
        // Se muestra un menú y se espera la selección del usuario.
        const opcion = await mostrarMenu();

        switch (opcion) {
            case '1':
                console.log(`Ingrese los detalles del nuevo producto:`.bgBlue);
                // Se obtienen detalles de un nuevo producto del usuario.
                const nuevoProducto = await obtenerDetallesProducto();
                console.log(`Producto agregado:`.bgGreen);
                // Se muestra el producto agregado en la consola.
                console.log(nuevoProducto);
                // Se agrega el nuevo producto a "productostienda".
                await agregarProducto(productostienda, nuevoProducto);
                // Se pausa la ejecución hasta que el usuario presione "ENTER"
                await pausa();
                break;

            case '2':
                console.log(`Listado de productos:`.bgBlue);
                // Se muestra el listado de productos almacenados en "productostienda"
                productostienda.mostrarproductos();
                // Se pausa la ejecución hasta que el usuario presione "ENTER"
                await pausa();
                break;

            case '3':
                // Se establece la variable "salir" en verdadero para salir del bucle.
                salir = true;
                break;

            default:
                console.log(`Opción no válida. Por favor, seleccione una opción válida.`.bgRed);
                // Se muestra un mensaje de opción no válida y se pausa la ejecución hasta que el usuario presione "ENTER".
                await pausa();
                break;
        }
    }
    // Se cierra la interfaz de entrada de línea de comandos.
    readline.close();
    // Se muestra un mensaje de despedida en la consola.
    console.log('Adios'.bgGreen);

};

// Llama a la función principal para iniciar el programa
main();

## Challenge

Una empresa de encuestas desea crear un nuevo formulario de prueba que recompense a los usuarios con fichas por participar en la encuesta.

Crean encuestas, las cargan en formato JSON y quieren que tú
desarrolles una aplicación web receptiva usando React y TypeScript para que las
personas puedan responder y enviar los resultados, obteniendo tokens en el proceso

## Requisitos:

- Next.js (preferido), CRA o paquete web personalizado para el front-end
infraestructura, teniendo en cuenta para la arquitectura del proyecto
jerarquía y organización de directorios, enrutamiento, convenciones y
buenas prácticas de código limpio, buenos patrones de diseño para la propia aplicación
sino también para los componentes de React

- Para el estado de la aplicación, usemos React Hooks

- Diseño Ant para componentes (adicional)

- Agregue un archivo "Léame" descriptivo, también debe incluir enlaces a cualquier
recursos y documentación utilizados para resolver el reto.

## La web debe comportarse de la siguiente manera:

- Conecte la billetera Metamask

- Asegúrese de que el usuario esté conectado a Goerli y, si no, muestre un botón para
cambiar de red automáticamente.

- Mostrar el saldo del token $QUIZ (dirección a continuación).

- Una vez cargada la página, presente el título de la trivia diaria con su
imagen y un botón que le permite comenzar a responder.

- Una vez que comience la encuesta, muestre la pregunta actual, que estará disponible por la cantidad de segundos de la propiedad lifeSeconds.

- Respondido o no, debe pasar a la siguiente pregunta.

- Una vez que haya terminado con todas las preguntas, muestre un resumen con todas las
respuestas

- Mostrar un botón para enviar las preguntas al contrato del validador

- Actualizar el saldo de $QUIZ


## Pasos a seguir:

- Instalar la extensión de Metamask en tu navegador preferiblemente Chrome.
 

Link de descarga 
[https://metamask.io/](https://metamask.io/)

- Obtener saldo para el test

Links para obtener ethereum gratis para los test

Goerli Testnet Network
[https://goerli.etherscan.io/address/0x4df6F1aa462f2d0696AE7f1B1228D9d9dCFE23Bf](https://goerli.etherscan.io/address/0x4df6F1aa462f2d0696AE7f1B1228D9d9dCFE23Bf)

Vídeo Goerli
[https://www.y outube.com/watch?v=cvUIpdfZHMw&t=601s](https://www.youtube.com/watch?v=cvUIpdfZHMw&t=601s)

- Crear un proyecto con Nextjs

- Instalar dependencias para el proyecto:

```npm i @metamask/detect-provider``` 

```npm i ethers```

- Crear en la carpeta raíz un archivo react-app-env.d.ts para crear la instancia del objeto window para poder usar window.ethereum

 Agregar el siguiente código dentro

 ``` 
 interface Window {
    ethereum: any
} 
```
- Crear los componentes Start, Question, Connect y Finish
- En el componente Connect vamos a generar un borón de conexión 
- En el componente Start saludamos y tenemos el botón para inicair la encuesta
- En el componente Question vamos a ir mostrando cada una de las preguntas
- En el componente Finish vamos a mostrar los resultados con un botón para enviar los resultados
- En el index vamos a crear los métodos para conectar la billetera y para enviar el mensaje a la billetera
- Podemos crear una carpeta para utils y dentro un archivo index para crear el formateo del tiempo en milisegundos a minutos y segundos

## Para subir datos en formato json para modificarla encuesta

[http://localhost:3000/api/load](http://localhost:3000/api/load)

Código de ejemplo:

```
{
    "title":"Survey",
   "image":"todos.png",
   "data":[
      {
         "question":"¿Cuál de estos lenguajes es tu favorito?",
         "image":"todos.png",
         "lifetimeSeconds":10,
         "options":[
            {
               "text":"Javascript"
            },
            {
               "text":"Java"
            },
            {
               "text":"C#"
            }
         ]
      },
      {
         "question":"¿Cuál de estos lenguajes aprendiste a usar de primero?",
         "image":"todos.png",
         "lifetimeSeconds":5,
         "options":[
            {
               "text":"Javascript"
            },
            {
               "text":"Java"
            },
            {
               "text":"C#"
            }
         ]
      },
      {
        "question":"¿Cuál de estos lenguajes es el más usado?",

        "image":"todos.png",
        "lifetimeSeconds":5,
        "options":[
         {
            "text":"Javascript"
         },
         {
            "text":"Java"
         },
         {
            "text":"C#"
         }
      ]
     }
   ]
}
```

- Usar la dependencia de ethers para crear una instancia de la librería ethers

```
const provider2 = new ethers.providers.Web3Provider(window.ethereum);
```

recordá que tenes que realizar el paso anterior donde poder asignar a el objeto window la propiedad ethreum

Acá te dejo el link para la documentación del módulo ethers

[https://docs.ethers.io/v5/](https://docs.ethers.io/v5/) 

redes de prueba 

https://faucet.dimensions.network

https://faucet.kyber.network



Abrir el proyecto, escribir el el navegador

- Crear en el backend una ruta para agregar datos nuevos para la encuesta nueva

[http://localhost:3000](http://localhost:3000) 



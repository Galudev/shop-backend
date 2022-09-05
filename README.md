# shop-backend

Esta API contendrá todo lo relacionado con la base de datos y los procesos que se pueden llevar a cabo desde la web Shop, que simula una tienda de muebles.

Pasos a realizar para montar el proyecto una vez descargado:
1. Cambiar el nombre del fichero ".env.template" por ".env" y sustituir los comentarios de las variables indicadas por los datos propios.
2. Abrir la terminal en la carpeta raiz del proyecto y ejecutar el comando `npm install`.
3. Ejecutar en la misma terminal el comando `npm start`.

Para usarla en local, realizar peticiones HTTP a localhost:4000/api

A continuación se muestra cómo realizar las distintas peticiones y códigos de ejemplo tanto de peticiones como de las respuestas.

** Los códigos mostrados son simples ejemplos, las listas contarán con tantos objetos como se encuentren en la base de datos.

* Añadir un nuevo mueble a la base de datos: Realizar una petición POST a localhost:4000/api/furniture/new cuyo body contenga un objeto con los atributos
    ~~~
    {
        "category": "Table",
        "name": "Mesa de aluminio gris para jardín",
        "description": "Mesa de aluminio gris para jardín muy resistente al desgaste, a la intemperie y a los rayos UV. Con un armazón ligero de aluminio con revestimiento en polvo.",
        "img": "https://www.lidl.es/media/product/0/0/3/7/8/6/7/mesa-de-aluminio-gris-para-jardin-zoom.jpg",
        "price": 99.99
    }
    ~~~
    Además, hay que incluir en el header la contraseña que proporciona los permisos necesarios, cuya key recibe el nombre de x-password.

    Si el mueble se ha añadido correctamente, devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Mueble añadido correctamente",
        "furniture": {
            "category": "Table",
            "name": "Mesa de aluminio gris para jardín",
            "description": "Mesa de aluminio gris para jardín muy resistente al desgaste, a la intemperie y a los rayos UV. Con un armazón ligero de aluminio con revestimiento en polvo.",
            "img": "https://www.lidl.es/media/product/0/0/3/7/8/6/7/mesa-de-aluminio-gris-para-jardin-zoom.jpg",
            "price": 99.99,
            "_id": "630f3e015a3b14e26842df06",
            "__v": 0
        }
    }
    ~~~

* Recuperar el listado de muebles de la base de datos: Realizar una petición GET a localhost:4000/api/furniture

    Devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Obtención exitosa de los muebles de la base de datos",
        "furnitureList": [
            {
                "_id": "630f3e015a3b14e26842df06",
                "category": "Table",
                "name": "Mesa de aluminio gris para jardín",
                "description": "Mesa de aluminio gris para jardín muy resistente al desgaste, a la intemperie y a los rayos UV. Con un armazón ligero de aluminio con revestimiento en polvo.",
                "img": "https://www.lidl.es/media/product/0/0/3/7/8/6/7/mesa-de-aluminio-gris-para-jardin-zoom.jpg",
                "price": 99.99,
                "__v": 0
            }
        ]
    }
    ~~~

* Enviar un email al administrador: Realizar una petición POST a localhost:4000/api/mail cuyo body contenga un objeto con los atributos subject y message en formato JSON. Ejemplo:
    ~~~
    {
        "subject": "Prueba",
        "message": "Esto es una prueba"
    }
    ~~~
    Si el email se ha enviado correctamente, devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Correo enviado correctamente"
    }
    ~~~

* Crear un nuevo usuario: Realizar una petición POST a localhost:4000/api/auth/new cuyo body contenga un objeto con los atributos name, email y password en formato JSON. Ejemplo:

    ~~~
    {
        "name": "Juan",
        "email": "juan23@gmail.com",
        "password": "fPe46%3g"
    }
    ~~~

    Si el usuario se ha creado correctamente, devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Cuenta creada correctamente",
        "user": {
            "name": "Juan",
            "email": "juan23@gmail.com",
            "basketList": []
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSnVhbiIsImVtYWlsIjoianVhbjIzQGdtYWlsLmNvbSIsImlhdCI6MTY2MTkzODI1MiwiZXhwIjoxNjYxOTQxODUyfQ.L3XfjPXKYZTTyzHlb3QNFIBkLTudw_xRWDVZJz2ZlDk"
    }
    ~~~
* Iniciar sesión: Realizar una petición POST a localhost:4000/api/auth cuyo body contenga un objeto con los atributos email y password en formato JSON. Ejemplo:

    ~~~
    {
        "email": "juan23@gmail.com",
        "password": "fPe46%3g"
    }
    ~~~

    Si en la base de datos existe un usuario con ese email y contraseña, devuelve el siguiente objeto:
    ~~~
    {
        "ok": true,
        "message": "Inicio de sesión exitoso",
        "user": {
            "name": "Juan",
            "email": "juan23@gmail.com",
            "basketList": []
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3VXNlciIsImlhdCI6MTY2MTk0MDk5NCwiZXhwIjoxNjYxOTQ0NTk0fQ.4CrWjfl2WjgHx2Itm2dinWjYLorqyx_Xy7wak0Hs4rw"
    }
    ~~~
* Revalidar un token, usado para extender la sesión en el tiempo (un token solo es válido durante 1 hora tras su generación): Realizar una petición GET a localhost:4000/api/auth/renew incluyendo en el header un token válido en ese momento, cuya key recibe el nombre de x-token.

    Si el token es válido, se genera uno nuevo y devuelve la siguiente respuesta:
    ~~~
    {
        "ok": true,
        "message": "Token renovado correctamente",
        "user": {
            "name": "Juan",
            "email": "juan23@gmail.com",
            "basketList": []
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW4yM0BnbWFpbC5jb20iLCJpYXQiOjE2NjIzODMwMzAsImV4cCI6MTY2MjM4NjYzMH0.se09rLsNNaMVuBBAINyJtiQ7fgfbqCZC68aX_1Qb_Mk"
    }
    ~~~

* Añadir un nuevo item al carrito del usuario: Realizar una petición POST a localhost:4000/api/basket/id, sustituyendo id por el id del elemento a añadir.
    Además, hay que incluir en el header un token válido en ese momento, cuya key recibe el nombre de x-token.

    Si se añade correctamente, devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Item añadido al carrito correctamente",
        "basketList": [
            {
                "id": "630f3e015a3b14e26842df06",
                "count": 1
            }
        ]
    }
    ~~~

* Actualizar el número de un item en el carrito del usuario: Realizar una petición PUT a localhost:4000/api/basket cuyo body contenga un objeto con los atributos id (el id del mueble correspondiente) y count (con el nuevo valor a tomar) en formato JSON. Ejemplo:
    ~~~
    {
        "id": "630f3e015a3b14e26842df06",
        "count": 4
    }
    ~~~
    Además, hay que incluir en el header un token válido en ese momento, cuya key recibe el nombre de x-token.

    Si se actualiza correctamente, devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Item del carrito actualizado correctamente",
        "basketList": [
            {
                "id": "630f3e015a3b14e26842df06",
                "count": 4
            }
        ]
    }
    ~~~

* Eliminar un item del carrito del usuario: Realizar una petición DELETE a localhost:4000/api/basket/id, sustituyendo id por el id del elemento a eliminar.
    Además, hay que incluir en el header un token válido en ese momento, cuya key recibe el nombre de x-token.

    Si se elimina correctamente, devuelve el siguiente objeto JSON:
    ~~~
    {
        "ok": true,
        "message": "Item eliminado del carrito correctamente",
        "basketList": []
    }
    ~~~

* Si en alguna petición tiene lugar un error, devuelve el siguiente objeto JSON:

    ~~~
    {
        ok: false,
        message: 'Mensaje con la información del error que ha tenido lugar'
    }
    ~~~

![image](https://github.com/user-attachments/assets/d523209d-2eea-4960-bcc3-88142b387af6)# Duacoders
Prueba técnica para Duacode
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Importar volcado de la BBDD en MySQL

He usado mysql en su versión 9. Teneis disponible el archivo duacoders_dump.sql para importar en vuestro mysql.
Se usa la database con nombre Duacoders
Se usa el puerto por defecto 3306
User: root
Password: DuacodersMySQLPassword123

Estos datos están en el archivo de configuración app.module.ts

Para importar desde la linea de comandos hay que ejecutar en la terminal 
```bash
mysql -u root -p Duacoder < duacoders_dump.sql
```

Para comprobar que se ha importado correctamente:
```bash
mysql -u root -p Duacoder
mysql> SHOW TABLES;
```

## probar los endpoints
En los archivos podemos encontrar la colección Duacoders.postman_collection.json. Una exportación en formato V2 de las Request de postman.
Una vez importadas deberían poder funcionar correctamente. 

Deberíamos tener los siguientes request: 

![image](https://github.com/user-attachments/assets/08e35428-11c9-417d-8854-38f5346620ac)

El tiempo de expiración de los tokens jwt es de 24H asique no debería habar que hacer nada, como mucho añadir el token al header de cada request.
* postNewDuacoder. Este endpoint permite crear un nuevo usuario a partir de los datos de usuario en formato json. **La imagen no va incluida aquí**.
Devuelve:
  * 201 si fue creado correctamente. Incluye un json con los datos del usuario recogidos de la BBDD
  * 400 si hay algún parámetro incorrecto
  * 404 si no encuentra el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor(no debería ocurrir)
  * 
* getDuacoders. Devuelve una lista paginada de duacoders. Este endpoint acepta filtrado, pero eso se muestra en el siguiente endpoint, que es el mismo. Devuelve:
  * 200 si todo fue correcto junto con los duacoders que hayan aparecido en la búsqueda.
  * 404 si no encuentra el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor

* getDuacodersFiltered. Tiene los parametros limit y page, pero no están funcionando. Lo que si funciona es el filtrado por nombre, departamento, skills, likesOnion, birthDateFrom.
  * 200 si todo fue correcto junto con los duacoders que hayan aparecido en la búsqueda.
  * 404 si no encuentra el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor

* getDuacoders/number. Muestra los detalles de un único duacoder escogido a partir de su id(numeral autoincremental)
  * 200 si todo fue correcto junto con los duacoders que hayan aparecido en la búsqueda.
  * 404 si no encuentra el usuario o el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor
  
* patchDuacoders/number. Permite actualizar campos del duacoder especificado por ID en la URI
  * 200 si todo está bien, junto con los datos del usuario actualizados
  * 404 si no encuentra el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor
 
* deleteDuacoders/number. Permite eliminar al duacoder con el id especificado
  * 202 si borra exitosamente al usuario
  * 404 si no encuentra el usuario o el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor

* postUpdateFoto/number/foto. Permite subir un archivo de foto al directorio del servidor(/uploads/duacodes) y guarda el nombre del fichero en un string en el campo foto. Está funcionando correctamente enviando un form-data de tipo multipart/form-data y la foto adjunta en forma de fichero con la clave foto
  * 201 si sube la foto exitosamente
  * 400 si no se incluye la foto
  * 404 si no encuentra el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor
 
* getDuacodersPDF/number. No está funcionando. Se ha intentado implementar pero no ha dado tiempo. Se recibe algo pero se obtiene error al intentar cargar el archivo pdff en postman. No se puede guardar en forma de archivo.
  * 200 aunque no parece funcionar
  * 404 si no encuentra el usuario o el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor

* getExcel. Devuelve un archivo de excel. En el postman es necesario darle a guardar respuesta y nombrarlo como xlsx. Se puede descargar el excel desde swagger sin necesidad de guardar la respuesta de la petición en un archivo
  * 200 si recibe el archivo
  * 404 si no encuentra el endpoint(URI mal)
  * 401 si no estás autorizado
  * 500 si hay un error en el servidor


## SWAGGER
En la dirección http://localhost:3000/api#/Duacoders/DuacoderController_create
podemos encontrar la documentación de swagger. Debí dejar la documentación para el final ya que me retrasó al añadir demasiadas lineas de código al proyecto y hacer que sea dificil encontrar y modificar el código.
Aquí podemos ir arriba a la derecha y en authorize poner un token de autenticación JWT de Postman. 
Al hacer click en Try it out podemos ejecutar peticiones sobre los endpoints. Tambien se puede ver bastante información soobre los mismos, aunque no está perfectamente completa en todos los endpoints. 
Destacar que se puede descargar el excel desde swagger sin necesidad de guardar la respuesta de la petición en un archivo como en Postman. 
Actualizar la foto es también sencillo desde aquí.














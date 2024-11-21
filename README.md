# Duacoders
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

## Instalar MySQL 

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

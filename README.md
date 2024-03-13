## Especificaciones del challenge

**Tecnologías usadas**
- DOCKER
- DOCKER COMPOSE 3
- Node 14.17
- MongoDB 4.2
- Serverless

**Requisito**

- Instalar Docker en tu máquina(https://docs.docker.com/engine/install/)

**Instalacion**
- Clonar el proyecto. 
- Ingresar a la carpeta del proyecto.
- Copiar y pegar los archivos .env.example a .env y .env.test.example a .env.test
```bash
cp .env.example .env && cp .env.test.example .env.test
```
- Iniciar el servicio: 
```bash
docker-compose up -d
```
- Ejecutar los test (Se uso la libreria Jest): 
```bash
docker-compose exec serverless-node npm run test
```
## Challenge specifications

**Technologies used**
- DOCKER
- DOCKER COMPOSE 3
- Node 14.17
- MongoDB 4.2
- VueJS

**Requirement**

- Install Docker on your machine(https://docs.docker.com/engine/install/)

**Instalation**
- Clone the project.
- Enter the project folder.
- Copy and paste the files .env.example to .env and .env.test.example to .env.test (BACKEND)
```bash
cp .env.example .env && cp .env.test.example .env.test
```
- Copy and paste the files .env.example to .env and .env.test.example to .env.test (BACKEND)
```bash
cp .env.example .env && cp .env.test.example .env.test
```
- Docker for the service mongo:
```bash
docker-compose up -d
```
- The backend directory is the service in express
- install packages (node v14.17):
```bash
npm install
```
- start the service:
```bash
npm start
```
- The microfrontend directory is the service in vue
- install packages (node v16.19):
```bash
npm install
```
- start the service:
```bash
npm npm run dev
```
NOTE: the first base of the project was made in serverless but AWS updated its dependencies therefore everything was changed to express
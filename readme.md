# More Plates - Workout journal for the 5/3/1 workout program.
This v2 redesign of the 5/3/1 logger app is simplified for the beginner user looking to follow the 5/3/1 workout program. There are fewer customizations supported, and is designed to guide the user through the endless cycles of the vanilla 5/3/1 training program.

## Table of contents
* [Features](https://github.com/dwong4013/531logger/tree/v2#features)
* [Technologies](https://github.com/dwong4013/531logger/tree/v2#technologies)
* [Setup](https://github.com/dwong4013/531logger/tree/v2#setup)

## Features
* Track your max weight for squats, bench, deadlift and overhead press.
* Create 3 week training cycles consisting built around the 4 main exercises.
* Weights, reps and sets all calculated for you to follow for each workout.
* Mark down your progress as you workout (no more doing less or more sets because you forgot how many you've done).
* Review your previously completed workouts and cycles to see your progress over time.

## Technologies
* Node.js v16-alpine
* Express.js v4.17.1
* Mongoose v5.9.11
* React v16.13.1
* React Redux v7.2.0
* Redux v4.0.5
* React Testing Library v9.5.0
* Docker Desktop v4.8.2

## Setup
### Running the entire project in development
From the root directory:
1) Create a .env file and create the following variables and supply your own custom values:
* MONGO_USERNAME
* MONGO_PASSWORD
* MONGO_PORT
* MONGO_DB
* MONGO_HOSTNAME
* BACKEND_PORT
* JWTSECRET
*If you are running the entire project in docker compose, you do not need MONGO_HOSTNAME variable, as this is supplied in the yaml config for the mongodb container.* 

2) Run the command in root directory:
```
docker compose --verbose up --build
```

### Running only the client container in development

*Run the commands from client directory*

1. Build the docker container image :
```
docker build -t 531-client .
```
2. Run the docker container:
```
docker run -it -d -p 3000:3000 -p 35729:35729 -v <src-directory>:/usr/src/531logger/client 531-client
```
*Replace <src-directory> with the full project path to bind the volume for hot reloading*

#### Run Sass compiler for development

1. Open the container shell terminal:
```
docker exec -it <container-id> sh
```
2. Run sass in watch mode:
```
sass --watch --poll ./src/scss/style.scss:./src/css/style.css
```

### Running only the backend container in development
*Run the commands from the backend directory*
1. Build the docker container image:
```
docker build -t 531-api .
```

2. Run the docker container:

```
docker run -it -p 5000:5000 -v <src-directory>:/usr/src/531logger/api 531-api
```
*Replace <src-directory> with the full project path to bind the volume for hot reloading*

### Running tests
After building and running the docker containers, you can run tests from the shell terminal of the backend or client container with:
1. Open the shell terminal in container:
```
docker exec -it <container-id> sh
```
*To find your container-id, run:*
```
docker ps
```
2. Run the tests:
``` 
npm run test
```



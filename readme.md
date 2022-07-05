# 5/3/1 Logger - 5/3/1 Program Planner
This v1 is for trainees familiar with the 5/3/1 strength training program. The user can create their own custom templates 5/3/1 workout templates, selecting weight, sets and reps. Each training cycle will be based on the template, and the user can track their progress for each workout.
*Created for desktop only* 

## Table of contents
* [Features](https://github.com/dwong4013/531logger/tree/v1#features)
* [Technologies](https://github.com/dwong4013/531logger/tree/v1#technologies)
* [Setup](https://github.com/dwong4013/531logger/tree/v1#setup)

## Features
* Track your max weight for squats, bench, deadlift and overhead press.
* Create 3 week training cycles consisting built around the 4 main exercises.
* Have complete control over your 5/3/1 program variations.
* Create custom cycle templates consisting of main sets and volume sets to train with strength focus or conditioning focus.
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

## Setup
### Running the project in development
From the root directory:
1. Create a .env file and create the following variables and supply your own custom values:
* MONGO_USERNAME
* MONGO_PASSWORD
* MONGO_PORT
* MONGO_DB
* MONGO_HOSTNAME
* BACKEND_PORT
* JWTSECRET

2. Install node modules:
```
npm install
npm install --prefix client
```

3. Start the node and react servers:
```
npm run dev
```

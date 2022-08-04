To build the docker image, use the following command from the client directory:

"docker build -t 531-client ."

To start the docker container for the client, use the following command from the client directory:

docker run -it -d -p 3000:3000 -p 35729:35729 ---env PORT=3000 v <src-directory>:/usr/src/531logger/client 531-client

To run shell commands in the container, use the following command:

docker exec -it <container-id> sh

To start sass watching, run a new command within the container sh:
sass --watch --poll ./src/scss/style.scss:./src/css/style.css

To run react client, run a new command within the container sh:
npm start

To follow client logs, open a new terminal and run:
docker logs --follow <container-id>
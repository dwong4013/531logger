To build the docker image, use the following command from the client directory:

"docker build -t 531-client ."

To start the developmet server for react, use the following command from the client directory:

docker run -it -d -p 3000:3000 -p 35729:35729 -v <src-directory>:/usr/src/531logger/client 531-client

To start sass watching, run a new command:

docker exec <container-id> npm run css

To follow client logs, open a new terminal and run:
docker logs --follow <container-id>
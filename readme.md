To build the docker image, use the following command from the client directory:

"docker build -t 531-api ."

To start the developmet server for express api, use the following command from the client directory:

docker run -it -p 3000:3000 -v <src-directory>:/usr/src/531logger/api 531-api

To follow client logs, open a new terminal and run:
docker logs --follow <container-id>
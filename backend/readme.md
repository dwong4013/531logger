To build the docker image, use the following command from the client directory:

"docker build -t 531-api ."

To start the development server for express api, use the following command from the client directory:

"docker run -it -p 5000:5000 -v <src-directory>:/usr/src/531logger/api 531-api"

To run tests after the container has started, enter the shell of the container with the following command:
"docker exec -it <container-ic> sh"
once inside the shell, run:
"npm test"

To follow client logs, open a new terminal and run:
"docker logs --follow <container-id>"
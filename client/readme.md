To build the docker image, use the following cmd from the client directory:

"docker build -t 531-client ."

To start the developmet server for react, use the following cmd from the client directory:

"docker run -i -p 3000:3000 -p 35729:35729 -v <src-directory>:/usr/src/client 531-client"
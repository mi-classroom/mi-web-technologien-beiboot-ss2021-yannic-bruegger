# beiboot-ss2021-client

An website that shows metadata of images on a server in a directory structure.

See the main [README](../README.md) for additional information and a guide on how to clone the repository.

There are two ways of running an instance of the client. Choose between [run as docker container](#run-as-docker-container) and [run manually](#run-manually) 

## Run as Docker container

Make sure you have [docker](https://www.docker.com/) installed and configured. You can test your installation by executing the following command. If no error occures, you are good to go.

```sh
docker --version
```
In order to create a container, you need to build an image from the Dockerfile first. In the build command, give the image a ``[NAME_OF_YOUR_CHOICE]``. Afterwards you can create (and start) a container by referencing the chosen name. Additionally, you need to specify a ``[PORT]`` where the webservice listens to.

```sh
# Navigate into the client directory if not already done
cd ./client

# Build your own docker image from the Dockerfile
docker build -t [NAME_OF_YOUR_CHOICE] . 

# Create an accessible container
docker run -p [PORT]:5000 [NAME_OF_YOUR_CHOICE]
```

Navigate to localhost:[PORT]. You should see your app running.


## Run manually

Make sure you have an up to date version of [Node.js and NPM](https://nodejs.org/en/) installed. You can test your installation by executing the following two commands. If no error occures, you are good to go.

```sh
node --version
npm --version
```

Navigate into the client directory (if not already done) and install all dependencies. Run the start script afterwards in order to listen on the specified port.

```sh
# Navigate into the client directory if not already done
cd ./client

# Install dependencies
npm install

# Build the project and start a sirv server
npm run build
npm run start
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.
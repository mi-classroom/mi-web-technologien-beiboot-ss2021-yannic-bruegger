# beiboot-ss2021-server

An application that serves metadata of images in a directory via HTTP.

See the main [README](../README.md) for additional information and a guide on how to clone the repository.

There are two ways of running an instance of the server. Choose between [run as docker container](#run-as-docker-container) and [run manually](#run-manually) 

## Run as Docker container

Make sure you have [docker](https://www.docker.com/) installed and configured. You can test your installation by executing the following command. If no error occures, you are good to go.

```sh
docker --version
```
In order to create a container, you need to build an image from the Dockerfile first. In the build command, give the image a ``[NAME_OF_YOUR_CHOICE]``. Afterwards you can create (and start) a container by referencing the chosen name. Additionally, you need to specify a ``[PORT]`` where the webservice listens to. Lastly, you need to define the **absolute** ``[PATH/TO/DATA]`` - the directory with images you want to serve.

```sh
# Navigate into the server directory if not already done
cd ./server

# Build your own docker image from the Dockerfile
# The last argument represents the directory that contains the Dockerfile ('.' as 'current directory' in this case)
docker build -t [NAME_OF_YOUR_CHOICE] . 

# Create an accessible container
docker run -p [PORT]:3000 -v [PATH/TO/DATA]:/data [NAME_OF_YOUR_CHOICE]
```



## Run manually
Make sure you have an up to date version of [Node.js and NPM](https://nodejs.org/en/) installed. You can test your installation by executing the following two commands. If no error occures, you are good to go.

```sh
node --version
npm --version
```

Navigate into the server directory (if not already done) and install all dependencies. Run the start script afterwards in order to listen on the specified port.

```sh
# Navigate into the server directory if not already done
cd ./server

# Install dependencies
npm install

# Start the server
npm run start
```

## Configuration

If you want to make changes to the default configuration, take a look at the [.env-File](./.env).
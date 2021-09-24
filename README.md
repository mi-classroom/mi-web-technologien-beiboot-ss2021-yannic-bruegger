![cda; cranach editor; browse and edit metadata in Cranach Digital Archive](/header.png)

# About the project

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.

## Decision Records
You are curious in what decisions have been made and why? Take a look at our [Architecture Decision Records (ADRs)](/adr/README.md). 

## Get a local copy up and running

> **Prerequisites**: Please make sure that you have an up to date version of nodejs and npm up and running on your computer. You can check that by executing ``node --version`` and ``npm --version``.

In order to get a local copy of *cranach metadata* up and running you need to follow the these steps:

```bash
# 1. Clone the repo
git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2021-yannic-bruegger.git <target-directory>

# 2. Install server dependencies
cd server
npm install
cd ..

# 3. Install client dependencies
cd client
npm install
cd ..
```

## Start the application
After successfully installing the dependencies you can start all the neded modules (client and server) of *cranach metadata*. You can do so by executing the following steps:
```bash
# 1. Start the server (in one terminal)
cd server
npm run dev
cd ..

# 2. Start the client (in another terminal)
cd client
npm run dev
cd ..
```
Afterwards you can access the client via an internet browser of your choice with the following url: [http://localhost:5000](http://localhost:5000).

If the port is already taken on your machine, the terminal output of the client will show you display the correct port to access the client.
## Images and data

**Images are not included in this repository!** Therefore, you will not see any files in the navigation area on the left by default. Simply add a ``data`` folder to the project directory with your cranach file structure.

## The team
| GitHub | Name | Role |
|-|-|-|
|<a href="https://github.com/yannic-bruegger"><img src="https://avatars.githubusercontent.com/u/36576062?v=4" width="40"></a>| Yannic Brügger | Developer
|<a href="https://github.com/WasMachenSachen"><img src="https://avatars.githubusercontent.com/u/24228449?v=4" width="40"></a>| Tim Loges | Reviewer

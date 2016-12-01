## Nightlife Coordination App
Paul Hoskinson (plhosk@gmail.com)


- Try the live version on Heroku: [https://nightlife-plhosk.herokuapp.com/](https://nightlife-plhosk.herokuapp.com/)
- Github Repository: [https://github.com/plhosk/nightlife](https://github.com/plhosk/nightlife)

---

### Main Technologies
- Client: React, Redux, React-Router, Material UI
- Server: Node/Express, Mongoose, Passport

### Development Instructions
- Install [Node.js](https://nodejs.org/en/) and Git (optional)
- Clone or download the code from git repository: `git clone https://github.com/plhosk/nightlife.git`
- Enter project folder: `cd nightlife`
- Install node packages: `npm install`
- Rename the file ".env.example" in your project directory to ".env" and add the URI to your MongoDB database collection (example: `MONGO_URI=mongodb://localhost/nightlife`)
- If you plan to use the GitHub authentication feature, enter the client ID, client secret and callback URL to the .env file
- Build the client bundle with Webpack: `npm run build` (or `npm run prod` for production)
- Start the Node/Express web server: `npm start`
- Visit the server URL in your web browser (default port 3000): [http://localhost:3000](http://localhost:3000)

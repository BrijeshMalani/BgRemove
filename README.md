# Background Removal Tool

A web application that removes backgrounds from images using the remove.bg API.

## Features

- Upload images and remove their backgrounds
- Download processed images
- Modern and responsive UI
- Real-time processing

## Setup

1. Clone the repository:
```bash
git clone https://github.com/BrijeshMalani/bgremove.git
cd bgremove
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your remove.bg API key:
```
REMOVE_BG_API_KEY=your_api_key_here
```

4. Start the server:
```bash
node server.js
```

5. Open your browser and visit `http://localhost:3000`

## Deployment

### Deploying to GitHub

1. Create a new repository on GitHub named `bgremove`
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/BrijeshMalani/bgremove.git
git push -u origin main
```

### Deploying to a Hosting Service

This application can be deployed to any Node.js hosting service like:
- Heroku
- Vercel
- DigitalOcean
- AWS

Make sure to:
1. Set the `REMOVE_BG_API_KEY` environment variable
2. Configure the server to listen on the correct port
3. Set up proper CORS if needed

## Technologies Used

- Node.js
- Express.js
- remove.bg API
- HTML/CSS/JavaScript
- Multer for file uploads
- Axios for API requests

## License

MIT 
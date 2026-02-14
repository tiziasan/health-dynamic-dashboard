# health-dynamic-dashboard

A dynamic health and fitness dashboard with AI-powered layout generation using OpenAI's API.

## Prerequisites

- Node.js (v14 or higher)
- npm
- OpenAI API key

## Installation

1. Clone the repository:
```console
git clone <repository-url>
cd <repository-name>
```
2. Install dependencies:
```console
npm install
npm install -g json-server
```
3. Create a `.env` file in the root directory:

OPENAI_API_KEY=your_openai_api_key_here
PORT=3001

## Running the Application

The application requires two servers running simultaneously:

### Terminal 1 - Start the JSON server (port 3000):
```console
npm run db
```
### Terminal 2 - Start the main application server (port 3001):
```console
npm run dev
```
## Access the Dashboard

Open your browser and navigate to:
```console
http://localhost:3001
```
## Project Structure

- `index.html` - Main application interface
- `js/app.js` - Application logic
- `js/server.js` - Express server with OpenAI proxy
- `js/llm.js` - LLM integration
- `js/render.js` - Dashboard rendering
- `js/drag.js` - Drag and drop functionality
- `js/data.js` - Data management
- `js/api.js` - API utilities
- `db.json` - User data and dashboard configurations
- `style.css` - Application styles

## Features

- AI-powered dashboard layout generation
- Drag-and-drop widget repositioning
- Health metrics visualization (steps, sleep, heart rate, etc.)
- Personalized health suggestions
- Customizable user preferences



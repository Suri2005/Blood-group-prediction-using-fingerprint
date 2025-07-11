# Blood Group Predictor Backend

This is the backend server for the Blood Group Predictor application. It provides API endpoints for blood group prediction and analysis.

## Setup

1. Make sure you have Python 3.8+ installed
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

### Option 1: Using the start script

Simply run:
```bash
./start_server.sh
```

### Option 2: Manual start

1. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```
2. Start the Flask server:
   ```bash
   python app.py
   ```

The server will start on port 5001. You can access it at http://localhost:5001.

## API Endpoints

- `GET /`: Health check endpoint
- `POST /api/predict`: Upload an image for blood group prediction

## Troubleshooting

If you see the error "Backend server is not running. Please start the Python server first." in the frontend, make sure:

1. The backend server is running on port 5001
2. You have activated the virtual environment
3. All dependencies are installed correctly

## Note

This is a demonstration backend that simulates blood group prediction. In a production environment, you would need to implement actual machine learning models for accurate predictions. 
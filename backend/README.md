# TransPort Backend

Backend API kwa ajili ya website ya TransPort.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file (optional):
```env
PORT=5000
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Tracking
- `GET /api/tracking` - Get all tracking data
- `GET /api/tracking/:trackingNumber` - Get tracking info by tracking number

### Bookings
- `POST /api/bookings/submit` - Submit a new booking

## Frontend Integration

Frontend inafanya requests kwa URLs:
- `http://localhost:5000/api/tracking/:trackingNumber`
- `http://localhost:5000/api/bookings/submit`

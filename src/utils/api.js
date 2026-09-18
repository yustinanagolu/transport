const API_BASE_URL = 'http://localhost:5000/api';

export async function trackShipment(trackingNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}/tracking/${encodeURIComponent(trackingNumber)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Imeshindwa kupata taarifa za mzigo.');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function submitBooking(bookingData) {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Imeshindwa kutuma maombi.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

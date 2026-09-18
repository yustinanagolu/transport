const express = 'express';
import { Router } from 'express';
const router = Router();

router.post('/submit', (req, res) => {
  const { transportType, from, to, name, phone, notes } = req.body;

  if (!transportType || !from || !to || !name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Tafadhali jaza taarifa zote muhimu.',
    });
  }

  const bookingId = 'BK' + Date.now().toString().slice(-8);

  const booking = {
    id: bookingId,
    transportType,
    from,
    to,
    name,
    phone,
    notes: notes || '',
    status: 'Imepokelewa',
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    success: true,
    message: 'Maombi yako yamepokelewa! Tutawasiliana nawe haraka.',
    data: booking,
  });
});

export default router;

const express = 'express';
import { Router } from 'express';
const router = Router();

const trackingData = {
  'TP123456': {
    status: 'Inasafiri',
    location: 'Dar es Salaam -> Mwanza',
    estimatedDelivery: '2025-01-20',
    lastUpdate: 'Mizigo imewekwa kwenye meli inayosafiri kwenda Mwanza.',
    history: [
      { date: '2025-01-15', status: 'Imewekwa', location: 'Dar es Salaam' },
      { date: '2025-01-16', status: 'Inasafiri', location: 'Dar es Salaam -> Mwanza' },
    ],
  },
  'TP789012': {
    status: 'Imefika',
    location: 'Mwanza',
    estimatedDelivery: '2025-01-18',
    lastUpdate: 'Mizigo imefika kwenye ofisi ya Mwanza. Tafadhali chukua mzigo wako.',
    history: [
      { date: '2025-01-14', status: 'Imewekwa', location: 'Dar es Salaam' },
      { date: '2025-01-17', status: 'Imefika', location: 'Mwanza' },
    ],
  },
  'TP345678': {
    status: 'Inasubiri',
    location: 'Dar es Salaam',
    estimatedDelivery: '2025-01-25',
    lastUpdate: 'Mizigo inasubiri kuwekwa kwenye ndege.',
    history: [
      { date: '2025-01-16', status: 'Imewekwa', location: 'Dar es Salaam' },
    ],
  },
};

router.get('/:trackingNumber', (req, res) => {
  const { trackingNumber } = req.params;
  const data = trackingData[trackingNumber.toUpperCase()];

  if (data) {
    res.json({ success: true, data: { trackingNumber: trackingNumber.toUpperCase(), ...data } });
  } else {
    res.status(404).json({ success: false, message: 'Namba ya ufuatiliaji haipo.' });
  }
});

router.get('/', (req, res) => {
  res.json({ success: true, data: trackingData });
});

export default router;

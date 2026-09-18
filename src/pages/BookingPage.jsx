import { useState, useMemo } from 'react';
import { submitBooking } from '../utils/api';

const transportDetails = {
  ndege: {
    office: 'Airport Cargo Terminal, Julius Nyerere International Airport, Dar es Salaam',
    departure: '6:00 AM - 8:00 AM (kila siku)',
    arrival: '1-2 masaa baada ya kuruka',
    instruction: 'Fika kwenye ofisi kabla ya saa 6:00 mchana kwa ajili ya upekuzi na taratibu za ndege.',
  },
  barabara: {
    office: 'Ofisi Kuu ya TransPort, Bandari ya Dar es Salaam, Block 12',
    departure: '5:00 AM - 7:00 AM (kila siku)',
    arrival: 'Inategemea umbali: Dar -> Mwanza: siku 1-2, Dar -> Nairobi: siku 1',
    instruction: 'Tuma mzigo wako kituoni kwetu au piga simu kwa ajili ya uchukuzi wa mzigo.',
  },
  bahari: {
    office: 'Bandari ya Dar es Salaam, Soko Kuu wa Mizigo, Warehouse 3',
    departure: '8:00 AM - 10:00 AM (Jumatano na Jumamosi)',
    arrival: 'Inategemea bandari ya kwenda: Mombasa: siku 3-5, Zanzibar: siku 1',
    instruction: 'Hakikisha mzigo wako uko tayari kuingia kwenye bandari kabla ya tarehe ya usafiri.',
  },
};

const routes = [
  { id: 1, from: 'Dar es Salaam', to: 'Mwanza', type: 'ndege', duration: '1.5 masaa', departure: '7:00 AM', arrival: '8:30 AM', office: 'Airport Cargo Terminal, Dar es Salaam' },
  { id: 2, from: 'Dar es Salaam', to: 'Arusha', type: 'ndege', duration: '1 saa', departure: '7:30 AM', arrival: '8:30 AM', office: 'Airport Cargo Terminal, Dar es Salaam' },
  { id: 3, from: 'Dar es Salaam', to: 'Dodoma', type: 'ndege', duration: '45 min', departure: '8:00 AM', arrival: '8:45 AM', office: 'Airport Cargo Terminal, Dar es Salaam' },
  { id: 4, from: 'Mwanza', to: 'Dar es Salaam', type: 'ndege', duration: '1.5 masaa', departure: '10:00 AM', arrival: '11:30 AM', office: 'Mwanza Airport Cargo' },
  { id: 5, from: 'Dar es Salaam', to: 'Mbeya', type: 'barabara', duration: 'siku 1', departure: '6:00 AM', arrival: 'siku 1, jioni', office: 'Ofisi Kuu ya TransPort, Dar es Salaam' },
  { id: 6, from: 'Dar es Salaam', to: 'Arusha', type: 'barabara', duration: 'siku 1', departure: '5:30 AM', arrival: 'siku 1, jioni', office: 'Ofisi Kuu ya TransPort, Dar es Salaam' },
  { id: 7, from: 'Dar es Salaam', to: 'Mwanza', type: 'barabara', duration: 'siku 1-2', departure: '5:00 AM', arrival: 'siku 2, mchana', office: 'Ofisi Kuu ya TransPort, Dar es Salaam' },
  { id: 8, from: 'Dar es Salaam', to: 'Dodoma', type: 'barabara', duration: 'saa 8', departure: '6:00 AM', arrival: 'siku 1, mchana', office: 'Ofisi Kuu ya TransPort, Dar es Salaam' },
  { id: 9, from: 'Dar es Salaam', to: 'Zanzibar', type: 'bahari', duration: 'siku 1', departure: '9:00 AM', arrival: 'siku 1, mchana', office: 'Bandari ya Dar es Salaam' },
  { id: 10, from: 'Dar es Salaam', to: 'Mombasa', type: 'bahari', duration: 'siku 3-5', departure: '8:00 AM', arrival: 'siku 5, asubuhi', office: 'Bandari ya Dar es Salaam' },
  { id: 11, from: 'Dar es Salaam', to: 'Nairobi', type: 'ndege', duration: '2 masaa', departure: '9:00 AM', arrival: '11:00 AM', office: 'Airport Cargo Terminal, Dar es Salaam' },
  { id: 12, from: 'Dar es Salaam', to: 'Kampala', type: 'ndege', duration: '1.5 masaa', departure: '10:00 AM', arrival: '11:30 AM', office: 'Airport Cargo Terminal, Dar es Salaam' },
  { id: 13, from: 'Arusha', to: 'Nairobi', type: 'barabara', duration: 'saa 6', departure: '6:00 AM', arrival: 'siku 1, mchana', office: 'Ofisi ya Arusha, TransPort' },
  { id: 14, from: 'Mwanza', to: 'Kampala', type: 'barabara', duration: 'siku 2', departure: '5:00 AM', arrival: 'siku 2, jioni', office: 'Ofisi ya Mwanza, TransPort' },
  { id: 15, from: 'Dodoma', to: 'Dar es Salaam', type: 'ndege', duration: '45 min', departure: '2:00 PM', arrival: '2:45 PM', office: 'Dodoma Airport Cargo' },
];

const offices = [
  { id: 'dar', name: 'Ofisi Kuu - Dar es Salaam', lat: -6.8235, lng: 39.2695, address: 'Bandari ya Dar es Salaam, Block 12', phone: '+255 712 345 678' },
  { id: 'arusha', name: 'Ofisi ya Arusha', lat: -3.3869, lng: 36.6833, address: 'Njiro Road, Arusha', phone: '+255 762 345 678' },
  { id: 'mwanza', name: 'Ofisi ya Mwanza', lat: -2.5167, lng: 32.9000, address: 'Mabatini Area, Mwanza', phone: '+255 754 345 678' },
  { id: 'dodoma', name: 'Ofisi ya Dodoma', lat: -6.1630, lng: 35.7516, address: ' Dodoma Central, NSSF Building', phone: '+255 783 345 678' },
  { id: 'mbeya', name: 'Ofisi ya Mbeya', lat: -8.9094, lng: 33.4608, address: 'Mbalizi Road, Mbeya', phone: '+255 765 345 678' },
  { id: 'zanzibar', name: 'Ofisi ya Zanzibar', lat: -6.1659, lng: 39.1989, address: 'Malindi, Zanzibar', phone: '+255 777 345 678' },
  { id: 'tanga', name: 'Ofisi ya Tanga', lat: -5.0896, lng: 39.0988, address: 'Central Tanga, Near Port', phone: '+255 753 345 678' },
  { id: 'morogoro', name: 'Ofisi ya Morogoro', lat: -6.8227, lng: 37.6618, address: 'Morogoro Town Center', phone: '+255 768 345 678' },
  { id: 'kilimanjaro', name: 'Ofisi ya Kilimanjaro', lat: -3.0674, lng: 37.3556, address: 'Moshi Town, KCB Building', phone: '+255 786 345 678' },
  { id: 'iringa', name: 'Ofisi ya Iringa', lat: -7.7689, lng: 35.6997, address: 'Mafinga Street, Iringa', phone: '+255 764 345 678' },
];

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function BookingPage() {
  const [transportType, setTransportType] = useState('ndege');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [nearestOffice, setNearestOffice] = useState(null);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    name: '',
    phone: '',
    notes: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const details = transportDetails[transportType];
  const filteredRoutes = routes.filter(route => route.type === transportType);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Browser yako haitumii geolocation.');
      return;
    }

    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        let nearest = null;
        let minDist = Infinity;
        offices.forEach((office) => {
          const dist = haversineDistance(latitude, longitude, office.lat, office.lng);
          if (dist < minDist) {
            minDist = dist;
            nearest = { ...office, distance: dist };
          }
        });

        setNearestOffice(nearest);
      },
      () => {
        setLocationError('Imeshindwa kupata location yako. Tafadhali jaribu tena.');
      }
    );
  };

  const mapSrc = useMemo(() => {
    if (!nearestOffice || !userLocation) return '';
    const centerLat = (userLocation.lat + nearestOffice.lat) / 2;
    const centerLng = (userLocation.lng + nearestOffice.lng) / 2;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng - 0.05},${userLocation.lat - 0.05},${userLocation.lng + 0.05},${userLocation.lat + 0.05}&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`;
  }, [nearestOffice, userLocation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSubmissionStatus(null);

    if (!formData.from || !formData.to || !formData.name || !formData.phone) {
      setSubmissionError('Tafadhali jaza taarifa zote muhimu.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitBooking({
        transportType,
        from: formData.from,
        to: formData.to,
        name: formData.name,
        phone: formData.phone,
        notes: formData.notes,
        route: selectedRoute,
      });

      setSubmissionStatus({
        success: true,
        message: response.message,
        bookingId: response.data.id,
      });
      setFormData({ from: '', to: '', name: '', phone: '', notes: '' });
      setSelectedRoute(null);
    } catch (err) {
      setSubmissionError(err.message || 'Imeshindwa kutuma maombi. Tafadhali jaribu tena.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="bg-slate-800 text-white py-20 px-6 border-t border-slate-700">
      <div className="max-w-4xl mx-auto bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-700 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Agiza Usafiri au Omba Nukuu ya Bei
          </h2>
          <p className="text-slate-400 text-center mb-8 text-sm">
            Chagua aina ya usafiri na ujaze maelezo ya mzigo wako ili kupata maelekezo ya ofisi na gharama.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-slate-300">
              1. Chagua Aina ya Usafiri:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => { setTransportType('ndege'); setSelectedRoute(null); }}
                className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition font-medium ${
                  transportType === 'ndege'
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl">✈️</span> Ndege (Haraka)
              </button>

              <button
                type="button"
                onClick={() => { setTransportType('barabara'); setSelectedRoute(null); }}
                className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition font-medium ${
                  transportType === 'barabara'
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl">🚛</span> Barabara (Malori)
              </button>

              <button
                type="button"
                onClick={() => { setTransportType('bahari'); setSelectedRoute(null); }}
                className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition font-medium ${
                  transportType === 'bahari'
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl">🚢</span> Baharini (Makontena)
              </button>
            </div>
          </div>

          <div className="bg-blue-950/50 border border-blue-800/60 p-5 rounded-xl text-sm text-blue-200">
            <p className="mb-2">📌 <strong>Maelekezo:</strong> {details.instruction}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <span className="text-blue-300 font-semibold">📍 Ofisi:</span>
                <p className="text-blue-100 mt-1">{details.office}</p>
              </div>
              <div>
                <span className="text-blue-300 font-semibold">🕐 Muda wa Kuanza:</span>
                <p className="text-blue-100 mt-1">{details.departure}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-blue-300 font-semibold">⏱️ Muda wa Kufika:</span>
                <p className="text-blue-100 mt-1">{details.arrival}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-slate-300">
              2. Chagua Njia (Route):
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredRoutes.map(route => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setSelectedRoute(route)}
                  className={`p-4 rounded-xl border text-left transition ${
                    selectedRoute?.id === route.id
                      ? 'bg-blue-600 border-blue-400 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-semibold">{route.from} → {route.to}</div>
                  <div className="text-xs mt-1 opacity-80">Muda: {route.duration} | Ondoa: {route.departure}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedRoute && (
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
              <h4 className="text-blue-400 font-semibold mb-2">Maelezo ya Njia Uliyochagua:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-400">Kutoka:</span>
                  <p className="text-white">{selectedRoute.from}</p>
                </div>
                <div>
                  <span className="text-slate-400">Kwenda:</span>
                  <p className="text-white">{selectedRoute.to}</p>
                </div>
                <div>
                  <span className="text-slate-400">Muda wa Safari:</span>
                  <p className="text-white">{selectedRoute.duration}</p>
                </div>
                <div>
                  <span className="text-slate-400">Muda wa Kuanza:</span>
                  <p className="text-white">{selectedRoute.departure}</p>
                </div>
                <div>
                  <span className="text-slate-400">Muda wa Kufika:</span>
                  <p className="text-white">{selectedRoute.arrival}</p>
                </div>
                <div>
                  <span className="text-slate-400">Ofisi:</span>
                  <p className="text-white">{selectedRoute.office}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h4 className="text-blue-400 font-semibold">📍 Ofisi ya Karibu</h4>
                <p className="text-slate-300 text-sm mt-1">
                  {nearestOffice ? `${nearestOffice.name} (${Math.round(nearestOffice.distance)} km)` : 'Bado hujateua location.'}
                </p>
              </div>
              <button
                type="button"
                onClick={detectLocation}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Tumia Location Yangu
              </button>
            </div>
            {locationError && <p className="text-red-400 text-xs mt-2">{locationError}</p>}
            {nearestOffice && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm">
                <div>
                  <span className="text-slate-400">Jina la Ofisi:</span>
                  <p className="text-white">{nearestOffice.name}</p>
                </div>
                <div>
                  <span className="text-slate-400">Anwani:</span>
                  <p className="text-white">{nearestOffice.address}</p>
                </div>
                <div>
                  <span className="text-slate-400">Namba ya Simu:</span>
                  <p className="text-white">{nearestOffice.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400">Umbali:</span>
                  <p className="text-white">{Math.round(nearestOffice.distance)} km</p>
                </div>
              </div>
            )}
          </div>

          {mapSrc && (
            <div className="border border-slate-700 rounded-xl overflow-hidden">
              <iframe
                title="map"
                src={mapSrc}
                className="w-full h-64"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">Mahali Mzigo Ulipo</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="Mfano: Dar es Salaam"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">Mahali Unapokwenda</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="Mfano: Mwanza / Nairobi"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">Jina la Mtu wa Kuwasiliana</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Jina kamili"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">Namba ya Simu</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Mfano: +255 712 345 678"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Maelezo zaidi ya mzigo (Hiari)</label>
            <textarea
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Andika maelezo kuhusu mzigo wako..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition resize-none"
            ></textarea>
          </div>

          {submissionError && (
            <div className="bg-red-950/50 border border-red-800/60 p-4 rounded-xl text-sm text-red-200">
              ❌ {submissionError}
            </div>
          )}

          {submissionStatus && (
            <div className="bg-green-950/50 border border-green-800/60 p-4 rounded-xl text-sm text-green-200">
              ✅ {submissionStatus.message}
              {submissionStatus.bookingId && (
                <p className="mt-1">Namba ya Maombi: <strong>{submissionStatus.bookingId}</strong></p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Inatuma...' : 'Tuma Maombi ya Usafirishaji'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingPage;

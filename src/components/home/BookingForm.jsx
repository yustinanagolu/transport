import { useState, useMemo } from 'react';

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

function BookingForm() {
  const [transportType, setTransportType] = useState('ndege');
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [nearestOffice, setNearestOffice] = useState(null);

  const details = transportDetails[transportType];

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

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold mb-3 text-slate-300">
              1. Chagua Aina ya Usafiri:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setTransportType('ndege')}
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
                onClick={() => setTransportType('barabara')}
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
                onClick={() => setTransportType('bahari')}
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
                placeholder="Mfano: Dar es Salaam"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">Mahali Unapokwenda</label>
              <input
                type="text"
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
                placeholder="Jina kamili"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">Namba ya Simu</label>
              <input
                type="tel"
                placeholder="Mfano: +255 712 345 678"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Maelezo zaidi ya mzigo (Hiari)</label>
            <textarea
              rows="3"
              placeholder="Andika maelezo kuhusu mzigo wako..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition hover:shadow-blue-500/25"
          >
            Tuma Maombi ya Usafirishaji
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;

import { useState } from 'react';
import { trackShipment } from '../utils/api';

function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!trackingNumber.trim()) {
      setError('Tafadhali weka namba ya ufuatiliaji.');
      return;
    }

    setLoading(true);

    try {
      const data = await trackShipment(trackingNumber);
      setResult({ trackingNumber: trackingNumber.toUpperCase(), ...data });
    } catch (err) {
      setError(err.message || 'Namba ya ufuatiliaji haipo. Tafadhali hakikisha umeandika kama inavyotakiwa, mfano: TP123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-800 text-white py-20 px-6 border-t border-slate-700">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-4">
            🔍 Fuata Mizigo Wako
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Weka namba ya ufuatiliaji ya mzigo wako ili kujua hali yake ya sasa, location, na muda wa kufika.
          </p>
        </div>

        <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <label className="block text-sm font-semibold mb-3 text-slate-300">
              Namba ya Ufuatiliaji (Tracking Number):
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Mfano: TP123456"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inafuatilia...' : 'Fuatilia'}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>
        </form>

        {result && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Maelezo ya Mizigo</h3>
                <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  {result.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-xl">
                  <span className="text-slate-400 text-sm">Namba ya Ufuatiliaji:</span>
                  <p className="text-white font-semibold text-lg">{result.trackingNumber}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-xl">
                    <span className="text-slate-400 text-sm">Location ya Sasa:</span>
                    <p className="text-white font-semibold">{result.location}</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl">
                    <span className="text-slate-400 text-sm">Muda wa Kufika:</span>
                    <p className="text-white font-semibold">{result.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl">
                  <span className="text-slate-400 text-sm">Taarifa ya Mwisho:</span>
                  <p className="text-white mt-1">{result.lastUpdate}</p>
                </div>

                {result.history && result.history.length > 0 && (
                  <div className="bg-slate-800 p-4 rounded-xl">
                    <span className="text-slate-400 text-sm">Historia ya Usafiri:</span>
                    <div className="mt-3 space-y-2">
                      {result.history.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-slate-400">{item.date}</span>
                          <span className="text-white">{item.status}</span>
                          <span className="text-slate-400">{item.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-blue-950/50 border border-blue-800/60 rounded-xl">
                <p className="text-blue-200 text-sm">
                  📞 Kama una maswali, wasiliana nasi kwa namba: <strong>+255 712 345 678</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-white mb-4">Jinsi ya Kupata Namba ya Ufuatiliaji</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Baada ya kutuma maombi ya usafirishaji, utapokea namba ya ufuatiliaji kupitia SMS au Email.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Namba hii inaformat ya <strong>TP</strong> kufuatiwa na namba 6, mfano: <strong>TP123456</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Weka namba hii kwenye fomu hapo juu ili kufuatilia hali ya mzigo wako.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrackPage;

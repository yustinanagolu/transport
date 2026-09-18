import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <section id="mwanzo" className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="bg-blue-500/20 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-500/30">
              Usafirishaji wa Uhakika na Haraka
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-6 leading-tight">
              Tunasafirisha Mizigo Yako Mahali Popote
            </h1>
            <p className="text-slate-300 mt-4 text-lg leading-relaxed">
              Pata huduma bora za usafirishaji wa mizigo mikubwa na midogo nchi nzima kwa usalama wa hali ya juu na kwa wakati.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition hover:shadow-blue-500/25 inline-block"
              >
                Aagiza Usafiri Sasa
              </Link>
              <Link
                to="/track"
                className="border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold px-6 py-3 rounded-lg transition inline-block text-center"
              >
                Fuatilia Mizigo (Track)
              </Link>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-700 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Kwanini Chagua TransPort?</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                <span className="text-3xl">🚀</span>
                <div>
                  <h4 className="font-semibold text-white">Uharaka na Wakati</h4>
                  <p className="text-sm text-slate-400">Mizigo inafika bila kuchelewa.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                <span className="text-3xl">🛡️</span>
                <div>
                  <h4 className="font-semibold text-white">Usalama 100%</h4>
                  <p className="text-sm text-slate-400">Mzigo wako umekingwa kikamilifu.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl">
                <span className="text-3xl">💰</span>
                <div>
                  <h4 className="font-semibold text-white">Bei ya Hali ya Juu</h4>
                  <p className="text-sm text-slate-400">Tunatoa bei nafuu bila kuharibu ubora.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

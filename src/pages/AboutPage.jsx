
function AboutPage() {
  return (
    <section id="kuhusu" className="bg-slate-900 text-white py-20 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-6">Kuhusu TransPort</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            TransPort ni kampuni ya usafirishaji iliyoundwa kukidhi mahitaji ya mizigo yako kwa usalama, uharaka, na bei nafuu.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Tuna uzoefu wa miaka mingi katika sekta ya logistiki, na tumehusisha maelfu ya wateja kote nchini. Uwazi wetu ni kukupa huduma bora za usafirishaji wa mizigo kupitia ndege, barabara, na baharini.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-blue-400">Kwanini TransPort?</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl">
              <span className="text-3xl">🤝</span>
              <div>
                <h4 className="font-semibold text-white">Uwazi na Uaminifu</h4>
                <p className="text-sm text-slate-400">Tunashirikiana na wateja wetu kwa wazi na uaminifu.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl">
              <span className="text-3xl">🌍</span>
              <div>
                <h4 className="font-semibold text-white">Mtandao wa Kimataifa</h4>
                <p className="text-sm text-slate-400">Tunashirikiana na washirika wetu kote duniani.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;

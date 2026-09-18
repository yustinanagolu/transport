

import { Link } from 'react-router-dom';

function ServicesPage() {
  const servicesList = [
    {
      id: 1,
      icon: "🚛",
      title: "Usafirishaji wa Barabarani",
      description: "Usafirishaji wa uhakika wa mizigo mikubwa na midogo kote nchini kwa kutumia malori ya kisasa.",
    },
    {
      id: 2,
      icon: "✈️",
      title: "Usafirishaji wa Angani",
      description: "Huduma za haraka za kusafirisha mizigo ya dharura kupitia ndege za mizigo kwa mikoa na nchi jirani.",
    },
    {
      id: 3,
      icon: "🚢",
      title: "Usafirishaji wa Baharini",
      description: "Usafirishaji wa makontena (FCL & LCL) kupitia bandari kwa gharama nafuu na usalama wa hali ya juu.",
    },
    {
      id: 4,
      icon: "🏬",
      title: "Uwewekaji Mizigo (Warehousing)",
      description: "Maeneo salama ya kuhifadhia mizigo yako kabla au baada ya kusafirishwa yenye ulinzi wa masaa 24.",
    },
  ];

  return (
    <section id="huduma" className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
            Huduma Zetu
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">
            Tunanufaisha Biashara Yako kwa Huduma Bora za Logistiki
          </h3>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Tunatoa suluhisho la kina la usafirishaji lililobuniwa kukidhi mahitaji ya biashara yako.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/50 rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              <div className="text-4xl bg-slate-900/80 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition">
                {service.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 gap-2 transition"
              >
                Pata Nukuu <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;

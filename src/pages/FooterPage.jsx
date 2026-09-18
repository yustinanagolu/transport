import { Link } from 'react-router-dom';

function FooterPage() {
  return (
    <footer id="mawasiliano" className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold tracking-wide text-blue-400 flex items-center gap-2 mb-4">
            <span>🚚</span>
            <span>TransPort</span>
          </div>
          <p className="text-sm leading-relaxed">
            Tunasaidia kusafirisha mizigo yako kwa usalama na uharaka. Tekeleza huduma za usafirishaji kwa bei nafuu.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Viungo</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">Mwanzo</Link>
            </li>
            <li>
              <Link to="/huduma" className="hover:text-blue-400 transition">Huduma Zetu</Link>
            </li>
            <li>
              <Link to="/kuhusu" className="hover:text-blue-400 transition">Kuhusu Sisi</Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-blue-400 transition">Fuatilia Mizigo</Link>
            </li>
            <li>
              <Link to="/quote" className="hover:text-blue-400 transition">Pata Nukuu</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Mawasiliano</h4>
          <ul className="space-y-2 text-sm">
            <li>📞 +255 712 345 678</li>
            <li>📧 info@transport.co.tz</li>
            <li>📍 Dar es Salaam, Tanzania</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
        © {new Date().getFullYear()} TransPort. Haki zote zimehifadhiwa.
      </div>
    </footer>
  );
}

export default FooterPage;

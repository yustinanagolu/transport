import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide text-blue-400 flex items-center gap-2">
          <span>🚚</span>
          <span>TransPort</span>
        </div>

        <ul className="hidden md:flex space-x-8 font-medium text-slate-300">
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
        </ul>

        <Link
          to="/quote"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
        >
          Pata Nukuu (Quote)
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;

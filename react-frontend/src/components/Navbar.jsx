import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='bg-slate-600 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/auctions-data' className={linkClass}>
                  Auction Data
                </NavLink>
                <NavLink to='/auction-slug' className={linkClass}>
                  Auction Data (Slugs)
                </NavLink>
                <NavLink to='/auctions-info' className={linkClass}>
                  Auctions Info
                </NavLink>
                <NavLink to='/distilleries-info' className={linkClass}>
                  Distilleries Info
                </NavLink>
                <NavLink to='/slugs-info' className={linkClass}>
                  Distilleries Info (Slugs)
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

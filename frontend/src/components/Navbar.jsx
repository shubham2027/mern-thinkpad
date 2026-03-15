import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LogOutIcon, PlusIcon, UserCircle2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { removeToken } from '../lib/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // [AUTH-EDIT-1] clear token and go login
    removeToken();
    toast.success("Signed out");
    navigate("/login");
  };

  return (
    <header className='bg-base-300 boder-b border-base-content/10'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>Mindscribe</h1>

          <div className='flex items-center gap-2'>
            {/* [AUTH-EDIT-2] avoid showing create button on create page */}
            {location.pathname !== "/create" && (
              <Link to={"/create"} className='btn btn-primary'>
                <PlusIcon className='size-5' /> New Note
              </Link>
            )}

            <div className='dropdown dropdown-end'>
              <button tabIndex={0} className='btn btn-ghost btn-circle border border-base-content/20'>
                <UserCircle2Icon className='size-6' />
              </button>
              <ul tabIndex={0} className='menu dropdown-content z-[1] mt-3 w-44 rounded-box bg-base-100 p-2 shadow'>
                <li>
                  <button onClick={handleLogout}>
                    <LogOutIcon className='size-4' /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

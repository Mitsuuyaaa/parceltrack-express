import { useState } from 'react';
import { Link } from 'react-router-dom';
import api, { clearAuth, getToken, getUser } from '../services/api';

/* Drop-in replacement for the "Sign In" link in Home's navbar.
   Shows "Sign In" when logged out, and "Hi, name + Log out" when logged in. */
function AccountButton({ mobile = false }) {
    const [loggedIn, setLoggedIn] = useState(Boolean(getToken()));
    const [busy, setBusy] = useState(false);
    const user = getUser();
    const firstName = user?.name?.split(' ')[0] || 'there';

    const handleLogout = async () => {
        setBusy(true);
        try {
            await api.post('/logout');
        } catch {
            // even if the request fails, still log out locally
        } finally {
            clearAuth();
            setLoggedIn(false);
            setBusy(false);
        }
    };

    if (!loggedIn) {
        return (
            <Link
                to="/login"
                className={
                    mobile
                        ? 'mt-2 rounded-full bg-[#D71920] px-6 py-3 text-center font-bold text-white'
                        : 'rounded-full bg-[#D71920] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-200 transition hover:bg-[#B5121A]'
                }
            >
                Sign In
            </Link>
        );
    }

    return (
        <div className={mobile ? 'mt-2 flex flex-col gap-2' : 'flex items-center gap-4'}>
            <span className={mobile ? 'px-3 font-semibold text-gray-700' : 'text-sm font-semibold text-gray-700'}>
                Hi, {firstName}
            </span>
            <button
                type="button"
                onClick={handleLogout}
                disabled={busy}
                className={
                    mobile
                        ? 'rounded-full bg-[#D71920] px-6 py-3 text-center font-bold text-white disabled:opacity-60'
                        : 'rounded-full bg-[#D71920] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-200 transition hover:bg-[#B5121A] disabled:opacity-60'
                }
            >
                {busy ? 'Logging out...' : 'Log out'}
            </button>
        </div>
    );
}

export default AccountButton;
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Home from '../pages/Home'; // adjust the path if Home.jsx is in another folder

/* ---------- Icons ---------- */
const iconProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

export const CloseIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

export const BackIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M15 5l-7 7 7 7" />
    </svg>
);

const EyeIcon = ({ className = 'h-5 w-5' }) => (
    <svg {...iconProps} className={className}>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = ({ className = 'h-5 w-5' }) => (
    <svg {...iconProps} className={className}>
        <path d="M3 3l18 18" />
        <path d="M10.6 6.1A9.9 9.9 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4.2M6.6 6.6A17 17 0 002 12s3.6 7 10 7a9.8 9.8 0 004.1-.9" />
        <path d="M9.9 9.9a3 3 0 004.2 4.2" />
    </svg>
);

/* ---------- Reusable form pieces ---------- */
export const underlineInput =
    'w-full border-0 border-b border-gray-300 bg-transparent py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#D71920]';

export function Field({ id, label, required, children }) {
    return (
        <div>
            <label htmlFor={id} className="text-xs text-gray-700">
                {required && <span className="text-[#D71920]">*</span>}
                {label}
            </label>
            {children}
        </div>
    );
}

export function PasswordInput({ id, value, onChange, placeholder, autoComplete = 'off' }) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <input
                id={id}
                type={show ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${underlineInput} pr-8`}
                autoComplete={autoComplete}
            />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                aria-label={show ? 'Hide password' : 'Show password'}
            >
                {show ? <EyeIcon /> : <EyeOffIcon />}
            </button>
        </div>
    );
}

export function PrimaryButton({ disabled, loading, children }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className="mx-auto block w-full max-w-[258px] rounded-md bg-[#D71920] py-3.5 text-sm font-extrabold uppercase text-white transition hover:bg-[#B5121A] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
        >
            {loading ? 'Please wait...' : children}
        </button>
    );
}

export function TermsCheck({ checked, onChange }) {
    return (
        <label className="flex items-start gap-3 text-[11px] leading-snug text-gray-500">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#D71920]"
            />
            <span>
                I have read the terms of use and the privacy policy. I agree and accept them.
                <br />
                <a href="#terms" className="text-[#D71920] hover:underline">Terms of Use</a>
                {' '}and{' '}
                <a href="#privacy" className="text-[#D71920] hover:underline">Privacy Policy</a>
            </span>
        </label>
    );
}

export function FormError({ message }) {
    if (!message) return null;
    return (
        <p role="alert" className="mt-6 rounded-md bg-red-50 px-4 py-3 text-xs text-[#D71920]">
            {message}
        </p>
    );
}

/* ---------- Modal shell: blurred homepage + white dialog ---------- */
export function AuthModal({ title, backTo, children }) {
    const navigate = useNavigate();

    // Close with Escape
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && navigate('/');
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [navigate]);

    // Lock page scroll behind the modal
    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    return (
        <>
            {/* Homepage stays visible behind the modal */}
            <div aria-hidden="true">
                <Home />
            </div>

            {/* Dim + blur overlay with the modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-md">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="auth-title"
                    className="w-full max-w-[520px] overflow-hidden rounded-md bg-white shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-8 py-5">
                        <div className="flex items-center gap-3">
                            {backTo && (
                                <Link
                                    to={backTo}
                                    className="text-gray-500 hover:text-gray-900"
                                    aria-label="Back to login"
                                >
                                    <BackIcon />
                                </Link>
                            )}
                            <h1 id="auth-title" className="text-2xl font-semibold text-gray-900">
                                {title}
                            </h1>
                        </div>
                        <Link to="/" className="text-gray-500 hover:text-gray-900" aria-label="Close">
                            <CloseIcon />
                        </Link>
                    </div>

                    {/* Body */}
                    <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-8 pb-8 pt-8 sm:px-12">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
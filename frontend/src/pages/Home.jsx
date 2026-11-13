import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api, { clearAuth, getUser } from '../services/api';

/* ---------- Icons ---------- */
const ip = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};
const Icon = ({ d, className = 'h-6 w-6', children }) => (
    <svg {...ip} className={className}>
        {children || <path d={d} />}
    </svg>
);
const BoxIcon = (p) => <Icon {...p}><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></Icon>;
const TruckIcon = (p) => <Icon {...p}><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></Icon>;
const PinIcon = (p) => <Icon {...p}><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Icon>;
const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Icon>;
const CalcIcon = (p) => <Icon {...p}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" /></Icon>;
const ClockIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
const MailIcon = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>;
const PhoneIcon = (p) => <Icon {...p}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></Icon>;
const HeadsetIcon = (p) => <Icon {...p}><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="1" /><rect x="17" y="14" width="4" height="6" rx="1" /></Icon>;
const UpIcon = (p) => <Icon {...p}><path d="M6 15l6-6 6 6" /></Icon>;
const ChevronIcon = ({ className = 'h-4 w-4' }) => <Icon className={className}><path d="M6 9l6 6 6-6" /></Icon>;
const UserIcon = (p) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></Icon>;
const MenuIcon = (p) => <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
const CloseIcon = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>;
const CheckIcon = (p) => <Icon {...p}><path d="M5 12l5 5 9-10" /></Icon>;

/* ---------- Static content ---------- */
const menus = [
    { label: 'Services', items: ['Express Delivery', 'Parcel Shipping', 'International Shipping', 'Complaint Center'] },
    { label: 'Information', items: ['FAQ', 'Package Information', 'Terms', 'Privacy Policy'] },
    { label: 'Send Package', items: ['Send a Package', 'My Shipments'] },
    { label: 'VIP', items: ['VIP Customer Registration', 'Partner Application'] },
];

const slides = [
    { tag: 'New', title: 'Max Sulit Saya Promo', text: 'Ship more for less on every pouch size, all year long.', bg: 'from-[#D71920] to-[#8F0E13]' },
    { tag: 'Pay on arrival', title: 'Hassle-free with Cash on Delivery', text: 'Send now, let your buyer pay when the parcel arrives.', bg: 'from-[#B5121A] to-[#5E080C]' },
    { tag: 'Mobile app', title: 'Everything in your pocket', text: 'Book pickups and track every update from the app.', bg: 'from-[#E63B42] to-[#A5121A]' },
];

const quick = [
    { id: 'track', label: 'Track & Trace', icon: SearchIcon },
    { id: 'rates', label: 'Shipping Rates', icon: CalcIcon },
    { id: 'days', label: 'Shipping Days', icon: ClockIcon },
    { id: 'branches', label: 'Find Branches', icon: PinIcon },
];

const rates = [
    { size: 'Small (Envelope)', weight: '3 kg', price: '₱ 85' },
    { size: 'Medium (A4)', weight: '5 kg', price: '₱ 125' },
    { size: 'Large (A3)', weight: '8 kg', price: '₱ 175' },
];

const timeline = [
    { status: 'Out for delivery', place: 'Local delivery hub', time: 'Today, 8:40 AM', current: true },
    { status: 'Arrived at sorting hub', place: 'Regional hub', time: 'Yesterday, 9:05 PM' },
    { status: 'Parcel picked up', place: 'Sender location', time: 'Yesterday, 10:30 AM' },
];

const services = [
    { icon: TruckIcon, title: 'Express Delivery', text: 'Receive packages hassle-free within 1–3 days, by land or sea.' },
    { icon: BoxIcon, title: 'Parcel Shipping', text: 'Reliable shipping for envelopes, boxes and everything between.' },
    { icon: PinIcon, title: 'Shipment Tracking', text: 'Follow every shipment from pickup to your door in real time.' },
    { icon: CalcIcon, title: 'Cash on Delivery', text: 'Let your buyer pay on arrival and get your money remitted.' },
    { icon: UserIcon, title: 'VIP Account', text: 'A dashboard with perks for frequent senders and online sellers.' },
    { icon: ClockIcon, title: 'Customer Service', text: 'Support through the week, ready to help with any parcel.' },
];

/* ---------- Pieces ---------- */
function NavMenu({ label, items }) {
    return (
        <div className="group relative">
            <button type="button" className="flex items-center gap-1 py-2 text-sm font-semibold text-gray-700 transition group-hover:text-[#D71920] group-focus-within:text-[#D71920]">
                {label} <ChevronIcon />
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[210px] rounded-lg bg-white py-2 opacity-0 shadow-xl ring-1 ring-black/5 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {items.map((item) => (
                    <a key={item} href="#services" className="block px-5 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#D71920]">
                        {item}
                    </a>
                ))}
            </div>
        </div>
    );
}

function UserMenu({ name, onLogout, busy }) {
    return (
        <div className="group relative">
            <button type="button" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#D71920]">
                <UserIcon className="h-5 w-5" />
                <span className="max-w-[110px] truncate">{name}</span>
                <ChevronIcon />
            </button>
            <div className="invisible absolute right-0 top-full z-50 min-w-[170px] rounded-lg bg-white py-2 opacity-0 shadow-xl ring-1 ring-black/5 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <a href="#track" className="block px-5 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-[#D71920]">My Shipments</a>
                <button
                    type="button"
                    onClick={onLogout}
                    disabled={busy}
                    className="block w-full px-5 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-[#D71920] disabled:opacity-60"
                >
                    {busy ? 'Logging out...' : 'Log out'}
                </button>
            </div>
        </div>
    );
}

/* ---------- Page ---------- */
function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const name = user?.name?.split(' ')[0] || 'Account';

    const [menuOpen, setMenuOpen] = useState(false);
    const [slide, setSlide] = useState(0);
    const [tab, setTab] = useState('track');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [busy, setBusy] = useState(false);
    const [toast, setToast] = useState(Boolean(location.state?.welcome));

    // Auto-advance carousel
    useEffect(() => {
        const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
        return () => clearInterval(id);
    }, []);

    // Hide the "Login successfully" toast
    useEffect(() => {
        if (!toast) return;
        const id = setTimeout(() => setToast(false), 3000);
        return () => clearTimeout(id);
    }, [toast]);

    const handleLogout = async () => {
        setBusy(true);
        try {
            await api.post('/logout');
        } catch {
            // still log out locally if the request fails
        } finally {
            clearAuth();
            navigate('/', { replace: true });
        }
    };

    const handleTrack = (e) => {
        e.preventDefault();
        setSubmitted(trackingNumber.trim());
    };

    const s = slides[slide];

    return (
        <div id="top" className="min-h-screen bg-gray-50 text-gray-800">
            {/* Toast */}
            {toast && (
                <div role="status" className="fixed left-1/2 top-24 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-xl ring-1 ring-black/5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                        <CheckIcon className="h-3 w-3" />
                    </span>
                    Login successfully
                </div>
            )}

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white shadow-sm">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D71920] text-white"><BoxIcon /></span>
                        <span className="text-xl font-extrabold tracking-tight text-gray-900">
                            Parcel<span className="text-[#D71920]">Track</span>
                            <span className="ml-1 text-sm font-bold uppercase text-gray-500">Express</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-6 lg:flex">
                        <a href="#about" className="text-sm font-semibold text-gray-700 hover:text-[#D71920]">About Us</a>
                        {menus.map((m) => <NavMenu key={m.label} {...m} />)}
                        <a href="#app" className="rounded-full bg-[#D71920] px-5 py-2 text-sm font-bold text-white hover:bg-[#B5121A]">Download Now</a>
                        <a href="#contact" className="text-sm font-semibold text-[#D71920]">Contact Us</a>
                        <UserMenu name={name} onLogout={handleLogout} busy={busy} />
                    </div>

                    <button type="button" onClick={() => setMenuOpen((o) => !o)} className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </nav>

                {menuOpen && (
                    <div className="border-t border-gray-100 bg-white px-6 pb-5 lg:hidden">
                        <div className="flex flex-col gap-1 pt-3">
                            {['About Us', ...menus.map((m) => m.label), 'Contact Us'].map((l) => (
                                <a key={l} href="#services" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-red-50 hover:text-[#D71920]">{l}</a>
                            ))}
                            <p className="px-3 pt-3 text-sm text-gray-500">Signed in as <b className="text-gray-800">{name}</b></p>
                            <button type="button" onClick={handleLogout} disabled={busy} className="mt-2 rounded-full bg-[#D71920] px-6 py-3 font-bold text-white disabled:opacity-60">
                                {busy ? 'Logging out...' : 'Log out'}
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Hero carousel */}
            <section className={`relative overflow-hidden bg-gradient-to-br ${s.bg} pb-44 pt-16 text-white transition-all duration-700 md:pt-24`}>
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />
                <img src="/chuck-fast.png" alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[2%] hidden w-[420px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] md:block" />
                <div className="relative mx-auto max-w-6xl px-6">
                    <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">{s.tag}</span>
                    <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{s.title}</h1>
                    <p className="mt-5 max-w-md text-lg text-red-50">{s.text}</p>
                    <p className="mt-6 text-sm font-semibold text-red-100">Welcome back, {name}.</p>
                    <div className="mt-8 flex gap-2">
                        {slides.map((_, i) => (
                            <button key={i} type="button" onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} className={`h-2 rounded-full transition-all ${i === slide ? 'w-10 bg-white' : 'w-5 bg-white/40'}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick actions */}
            <section id="track" className="relative z-10 -mt-28 px-6">
                <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-300/50">
                    <div className="grid grid-cols-2 border-b border-gray-200 sm:grid-cols-4">
                        {quick.map(({ id, label, icon: Ic }) => (
                            <button key={id} type="button" onClick={() => setTab(id)} className={`flex items-center justify-between gap-2 border-r border-gray-200 px-5 py-4 text-sm font-semibold transition last:border-r-0 ${tab === id ? 'bg-red-50 text-[#D71920]' : 'text-gray-700 hover:bg-gray-50'}`}>
                                {label}
                                <Ic className="h-5 w-5 text-[#D71920]" />
                            </button>
                        ))}
                    </div>

                    <div className="p-6 sm:p-8">
                        {tab === 'track' && (
                            <>
                                <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
                                    <label htmlFor="trk" className="sr-only">Tracking number</label>
                                    <input id="trk" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Enter demo tracking number, e.g. PT-2026-000123" className="flex-1 rounded-xl border-2 border-gray-200 px-5 py-3.5 outline-none transition focus:border-[#D71920] focus:ring-4 focus:ring-red-100" />
                                    <button type="submit" className="rounded-xl bg-[#D71920] px-8 py-3.5 font-bold text-white hover:bg-[#B5121A]">Track</button>
                                </form>
                                {submitted && (
                                    <ol className="mt-6 space-y-4">
                                        <li className="text-sm text-gray-500">Tracking no. <b className="text-gray-900">{submitted}</b> · sample demo data</li>
                                        {timeline.map((t) => (
                                            <li key={t.status} className="flex gap-3">
                                                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${t.current ? 'bg-[#D71920] ring-4 ring-red-100' : 'bg-[#D71920]/60'}`} />
                                                <div>
                                                    <p className="font-bold text-gray-900">{t.status}</p>
                                                    <p className="text-sm text-gray-500">{t.place} · {t.time}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </>
                        )}

                        {tab === 'rates' && (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[420px] text-left text-sm">
                                    <thead>
                                        <tr className="bg-[#D71920] text-white">
                                            <th className="px-4 py-3">Pouch size</th><th className="px-4 py-3">Max weight</th><th className="px-4 py-3">Demo rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rates.map((r) => (
                                            <tr key={r.size} className="border-b border-gray-100">
                                                <td className="px-4 py-3 font-semibold">{r.size}</td><td className="px-4 py-3">{r.weight}</td><td className="px-4 py-3 font-bold text-[#D71920]">{r.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {tab === 'days' && (
                            <ul className="grid gap-3 text-sm sm:grid-cols-3">
                                {[['Within city', '1 day'], ['Within region', '1–2 days'], ['Island to island', '3–5 days']].map(([a, b]) => (
                                    <li key={a} className="rounded-xl bg-gray-50 p-4"><p className="text-gray-500">{a}</p><p className="mt-1 text-xl font-extrabold text-[#D71920]">{b}</p></li>
                                ))}
                            </ul>
                        )}

                        {tab === 'branches' && (
                            <div className="flex items-center gap-3">
                                <input placeholder="Search by city or province" className="flex-1 rounded-xl border-2 border-gray-200 px-5 py-3.5 outline-none focus:border-[#D71920] focus:ring-4 focus:ring-red-100" />
                                <button type="button" className="rounded-xl bg-[#D71920] px-8 py-3.5 font-bold text-white hover:bg-[#B5121A]">Find</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section id="about" className="px-6 pt-20 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Delivery Courier in the Philippines</h2>
                <span className="mx-auto mt-3 block h-1 w-10 bg-[#D71920]" />
                <p className="mx-auto mt-6 max-w-3xl leading-7 text-gray-600">
                    ParcelTrack Express is an educational courier project that demonstrates express delivery,
                    real-time shipment tracking and account management, with a nationwide-style delivery
                    experience from pickup to doorstep.
                </p>
            </section>

            {/* Services */}
            <section id="services" className="px-6 py-16">
                <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(({ icon: Ic, title, text }) => (
                        <div key={title} className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                            <Ic className="h-14 w-14 text-[#D71920]" />
                            <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{text}</p>
                            <button type="button" className="mt-5 rounded-full bg-[#D71920] px-7 py-2.5 text-sm font-bold text-white hover:bg-[#B5121A]">Read More</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* App download */}
            <section id="app" className="bg-white px-6 py-16">
                <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Get the mobile app</h2>
                        <p className="mt-4 leading-7 text-gray-600">Real-time package monitoring, easy pickups and exciting deals, all in one place.</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Google Play', 'App Store'].map((b) => (
                                <span key={b} className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white">{b}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex h-64 w-40 flex-col items-center justify-center gap-3 rounded-[2rem] border-8 border-gray-900 bg-red-50 text-[#D71920]">
                            <BoxIcon className="h-12 w-12" />
                            <span className="text-sm font-extrabold">ParcelTrack</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-[#D71920] px-6 py-12 text-white">
                <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-extrabold">ParcelTrack Express</h3>
                        <p className="mt-3 text-sm text-red-100">Fast. Reliable. Delivered.</p>
                        <p className="mt-4 text-sm font-bold">Hotline: (02) 0000-0000</p>
                    </div>
                    {[
                        ['Search', ['Track & Trace', 'Shipping Rates', 'Shipping Days', 'Find Branches']],
                        ['Services', ['Express Delivery', 'Parcel Shipping', 'Cash on Delivery']],
                        ['Information', ['FAQ', 'Terms', 'Privacy Policy']],
                    ].map(([h, links]) => (
                        <div key={h}>
                            <h4 className="text-sm font-bold uppercase tracking-wide">{h}</h4>
                            <ul className="mt-3 space-y-2 text-sm text-red-100">
                                {links.map((l) => <li key={l}><a href="#top" className="hover:text-white">{l}</a></li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="mx-auto mt-10 max-w-6xl border-t border-white/20 pt-6 text-center text-xs text-red-100">© 2026 ParcelTrack Express.</p>
            </footer>

            {/* Floating side widget */}
            <aside className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 rounded-full bg-white px-3 py-4 shadow-xl ring-1 ring-black/5 sm:flex">
                {[[MailIcon, 'E-mail', '#contact'], [PhoneIcon, 'Mobile', '#app'], [BoxIcon, 'Place Order', '#track'], [HeadsetIcon, 'Support', '#contact']].map(([Ic, label, href]) => (
                    <a key={label} href={href} className="flex flex-col items-center text-[10px] font-semibold text-gray-600 hover:text-[#D71920]">
                        <Ic className="h-6 w-6 text-[#D71920]" />{label}
                    </a>
                ))}
                <a href="#top" className="flex flex-col items-center text-[10px] font-semibold text-gray-600 hover:text-[#D71920]">
                    <UpIcon className="h-6 w-6 text-[#D71920]" />TOP
                </a>
            </aside>
        </div>
    );
}

export default Home;
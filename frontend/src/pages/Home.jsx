import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountButton from '../components/AuthNav';

/* ---------- Small inline icons (no extra packages needed) ---------- */
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

const BoxIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M21 8l-9-5-9 5 9 5 9-5z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
    </svg>
);

const TruckIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M3 6h11v10H3z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
    </svg>
);

const PinIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
    </svg>
);

const SearchIcon = ({ className = 'h-5 w-5' }) => (
    <svg {...iconProps} className={className}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
    </svg>
);

const CheckIcon = ({ className = 'h-4 w-4' }) => (
    <svg {...iconProps} strokeWidth={3} className={className}>
        <path d="M5 12l5 5 9-10" />
    </svg>
);

const MenuIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
);

const CloseIcon = ({ className = 'h-6 w-6' }) => (
    <svg {...iconProps} className={className}>
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

/* ---------- Static content ---------- */
const services = [
    {
        icon: TruckIcon,
        title: 'Express Delivery',
        text: 'Convenient delivery solutions for your packages, built for speed.',
    },
    {
        icon: BoxIcon,
        title: 'Parcel Shipping',
        text: 'Reliable shipping services for different package sizes.',
    },
    {
        icon: PinIcon,
        title: 'Shipment Tracking',
        text: 'Follow your demo shipments through their delivery journey.',
    },
];

const steps = [
    { title: 'Book a pickup', text: 'Sign in and enter your parcel details.' },
    { title: 'We move it', text: 'Your parcel travels through our sorting hubs.' },
    { title: 'Delivered', text: 'Track every update until it reaches the door.' },
];

const stats = [
    { value: '24/7', label: 'Tracking access' },
    { value: '3', label: 'Core services' },
    { value: '100%', label: 'Demo-ready' },
    { value: '1-click', label: 'Sign in' },
];

const demoTimeline = [
    { status: 'Shipment delivered', place: 'Customer address', time: 'Today, 2:15 PM', done: false },
    { status: 'Out for delivery', place: 'Local delivery hub', time: 'Today, 8:40 AM', done: true, current: true },
    { status: 'Arrived at sorting hub', place: 'Regional hub', time: 'Yesterday, 9:05 PM', done: true },
    { status: 'Parcel picked up', place: 'Sender location', time: 'Yesterday, 10:30 AM', done: true },
];

/* ---------- Page ---------- */
function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [submittedNumber, setSubmittedNumber] = useState('');

    const handleTrack = (e) => {
        e.preventDefault();
        const value = trackingNumber.trim();
        setSubmittedNumber(value);
    };

    const navLinks = [
        { label: 'Home', href: '#top' },
        { label: 'Track', href: '#track' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
    ];

    return (
        <div id="top" className="min-h-screen bg-gray-50 text-gray-800">

            {/* Top utility bar */}
            <div className="hidden bg-gray-900 text-xs text-gray-300 md:block">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
                    <span>Fast delivery you can count on</span>
                    <span>Fast. Reliable. Delivered.</span>
                </div>
            </div>

            {/* Navigation */}
            <header className="sticky top-0 z-40 bg-white shadow-sm">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D71920] text-white">
                            <BoxIcon />
                        </span>
                        <span className="text-xl font-extrabold tracking-tight text-gray-900">
                            Parcel<span className="text-[#D71920]">Track</span>
                            <span className="ml-1 text-sm font-bold uppercase text-gray-500">Express</span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-semibold text-gray-700 transition hover:text-[#D71920]"
                            >
                                {link.label}
                            </a>
                        ))}
                        <AccountButton />
                    </div>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </nav>

                {menuOpen && (
                    <div className="border-t border-gray-100 bg-white px-6 pb-5 md:hidden">
                        <div className="flex flex-col gap-1 pt-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-red-50 hover:text-[#D71920]"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <AccountButton mobile />
                        </div>
                    </div>
                )}
            </header>

            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#D71920] via-[#C4161C] to-[#8F0E13] text-white">
                {/* Decorative shapes */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-white/5" />

                {/* Hero character image: save your PNG as public/chuck-fast.png */}
                <div
                    className="pointer-events-none absolute -z-10 left-1/2 top-10 w-[420px] -translate-x-1/2 opacity-30 sm:w-[520px] md:left-auto md:right-[2%] md:top-8 md:w-[600px] md:translate-x-0 md:opacity-100"
                    aria-hidden="true"
                >
                    <img
                        src="/chuck-fast.png"
                        alt=""
                        className="relative h-auto w-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
                    />
                </div>

                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-40 pt-16 md:grid-cols-2 md:pt-24">
                    <div>
                        <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                            Your Trusted Delivery Partner
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                            Delivering Your Packages
                            <span className="block text-white">With Care.</span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg text-red-50">
                            Fast, reliable, and convenient delivery services
                            for your everyday shipping needs.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                to="/login"
                                className="rounded-full bg-white px-8 py-4 font-bold text-[#D71920] shadow-lg transition hover:-translate-y-0.5 hover:bg-red-50"
                            >
                                Get Started →
                            </Link>
                            <a
                                href="#track"
                                className="rounded-full border-2 border-white/60 px-8 py-4 font-bold text-white transition hover:bg-white/10"
                            >
                                Track a Parcel
                            </a>
                        </div>
                    </div>

                    {/* Hero illustration card */}
                    <div className="hidden items-end justify-center self-stretch pt-64 md:flex">
                        <div className="relative">
                            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-black/20" />
                            <div className="relative w-80 rounded-3xl bg-white p-6 text-gray-800 shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                        Live status
                                    </span>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                        On the way
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center gap-4">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#D71920]">
                                        <TruckIcon className="h-8 w-8" />
                                    </span>
                                    <div>
                                        <p className="text-sm text-gray-500">Parcel</p>
                                        <p className="font-extrabold tracking-wide">PT-2026-000123</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div className="h-full w-2/3 rounded-full bg-[#D71920]" />
                                    </div>
                                    <div className="mt-2 flex justify-between text-xs font-semibold text-gray-500">
                                        <span>Picked up</span>
                                        <span>Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tracking Section (overlaps hero) */}
            <section id="track" className="relative z-10 -mt-28 px-6">
                <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl shadow-gray-300/50 sm:p-10">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#D71920]">
                            <SearchIcon className="h-6 w-6" />
                        </span>
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900">
                                Track Your Shipment
                            </h2>
                            <p className="text-sm text-gray-500">
                                Enter your demo tracking number to explore the tracking experience.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleTrack} className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <label htmlFor="tracking-number" className="sr-only">
                            Tracking number
                        </label>
                        <input
                            id="tracking-number"
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            placeholder="Enter demo tracking number"
                            className="flex-1 rounded-xl border-2 border-gray-200 px-5 py-4 outline-none transition focus:border-[#D71920] focus:ring-4 focus:ring-red-100"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-[#D71920] px-8 py-4 font-bold text-white shadow-md shadow-red-200 transition hover:bg-[#B5121A]"
                        >
                            Track Package
                        </button>
                    </form>

                    {submittedNumber ? (
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm text-gray-500">
                                    Tracking no.{' '}
                                    <span className="font-extrabold text-gray-900">{submittedNumber}</span>
                                </p>
                                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#D71920]">
                                    Sample demo data
                                </span>
                            </div>

                            <ol className="mt-6 space-y-0">
                                {demoTimeline.map((item, index) => (
                                    <li key={item.status} className="relative flex gap-4 pb-6 last:pb-0">
                                        {index !== demoTimeline.length - 1 && (
                                            <span
                                                className={`absolute left-[11px] top-6 h-full w-0.5 ${
                                                    demoTimeline[index + 1].done ? 'bg-[#D71920]' : 'bg-gray-200'
                                                }`}
                                            />
                                        )}
                                        <span
                                            className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                                item.current
                                                    ? 'bg-[#D71920] text-white ring-4 ring-red-100'
                                                    : item.done
                                                    ? 'bg-[#D71920] text-white'
                                                    : 'border-2 border-gray-300 bg-white'
                                            }`}
                                        >
                                            {item.done && <CheckIcon className="h-3 w-3" />}
                                        </span>
                                        <div>
                                            <p
                                                className={`font-bold ${
                                                    item.done ? 'text-gray-900' : 'text-gray-400'
                                                }`}
                                            >
                                                {item.status}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.place} · {item.time}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ) : (
                        <p className="mt-4 text-xs text-gray-400">
                            Tip: type any number, such as PT-2026-000123, to see a sample timeline.
                        </p>
                    )}
                </div>
            </section>

            {/* Stats strip */}
            <section className="px-6 pt-14">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-extrabold text-[#D71920]">{stat.value}</p>
                            <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-[#D71920]">
                            What we offer
                        </span>
                        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Our Services
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {services.map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#D71920] transition group-hover:bg-[#D71920] group-hover:text-white">
                                    <Icon className="h-7 w-7" />
                                </span>
                                <h3 className="mt-6 text-xl font-bold text-gray-900">{title}</h3>
                                <p className="mt-3 leading-relaxed text-gray-500">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        How It Works
                    </h2>

                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.title} className="relative text-center">
                                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D71920] text-2xl font-extrabold text-white shadow-lg shadow-red-200">
                                    {index + 1}
                                </span>
                                <h3 className="mt-5 text-xl font-bold text-gray-900">{step.title}</h3>
                                <p className="mx-auto mt-2 max-w-xs text-gray-500">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="px-6 py-20">
                <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-[#D71920]">
                            About us
                        </span>
                        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            About ParcelTrack Express
                        </h2>
                        <p className="mt-5 leading-7 text-gray-600">
                            ParcelTrack Express is an educational courier website
                            project designed to demonstrate parcel delivery,
                            shipment tracking, and account management features.
                        </p>
                    </div>

                    <ul className="space-y-4">
                        {[
                            'Parcel delivery demo',
                            'Shipment tracking experience',
                            'Account sign-in flow',
                        ].map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D71920] text-white">
                                    <CheckIcon />
                                </span>
                                <span className="font-semibold text-gray-800">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA banner */}
            <section className="px-6 pb-20">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#D71920] to-[#8F0E13] px-8 py-14 text-center text-white shadow-xl">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to explore ParcelTrack?</h2>
                    <p className="mx-auto mt-3 max-w-xl text-red-100">
                        Sign in to the demo account and try the full experience.
                    </p>
                    <Link
                        to="/login"
                        className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-bold text-[#D71920] shadow-lg transition hover:-translate-y-0.5 hover:bg-red-50"
                    >
                        Sign In Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 px-6 py-12 text-gray-300">
                <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D71920] text-white">
                                <BoxIcon className="h-5 w-5" />
                            </span>
                            <h3 className="text-lg font-extrabold text-white">ParcelTrack Express</h3>
                        </div>
                        <p className="mt-4 text-sm text-gray-400">Fast. Reliable. Delivered.</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide text-white">Quick Links</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="transition hover:text-white">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wide text-white">Account</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li>
                                <Link to="/login" className="transition hover:text-white">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="transition hover:text-white">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="mx-auto mt-10 max-w-6xl border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
                    © 2026 ParcelTrack Express.
                </p>
            </footer>

        </div>
    );
}

export default Home;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { saveAuth, getErrorMessage } from '../services/api';
import {
    AuthModal,
    Field,
    FormError,
    PasswordInput,
    PrimaryButton,
    TermsCheck,
    underlineInput,
} from '../components/AuthLayout';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const canSubmit = email.trim() && password && agreed && !loading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/login', {
                email: email.trim().toLowerCase(),
                password,
            });
            saveAuth(data.token, data.user);
            navigate('/');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthModal title="Login">
            <form onSubmit={handleSubmit}>
                <div className="space-y-7">
                    <Field id="email" label="Email" required>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please enter your email"
                            className={underlineInput}
                            autoComplete="email"
                            autoFocus
                        />
                    </Field>

                    <Field id="password" label="Password" required>
                        <PasswordInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Please enter password"
                            autoComplete="current-password"
                        />
                    </Field>
                </div>

                <FormError message={error} />

                <div className="mt-8 flex items-center justify-between text-xs text-gray-500">
                    <button type="button" className="hover:text-[#D71920]">Forgot password</button>
                    <Link to="/register" className="hover:text-[#D71920]">
                        Register now
                    </Link>
                </div>

                <div className="mt-8">
                    <PrimaryButton disabled={!canSubmit} loading={loading}>Login</PrimaryButton>
                </div>

                <div className="mt-8">
                    <TermsCheck checked={agreed} onChange={setAgreed} />
                </div>
            </form>
        </AuthModal>
    );
}

export default Login;
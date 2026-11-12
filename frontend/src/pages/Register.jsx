import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const tooShort = password.length > 0 && password.length < 8;
    const mismatch = confirm.length > 0 && password !== confirm;
    const canSubmit =
        username.trim() && email.trim() && password && confirm &&
        !tooShort && !mismatch && agreed && !loading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);
        setError('');

        try {
            // Laravel expects: name, email, password, password_confirmation
            const { data } = await api.post('/register', {
                name: username.trim(),
                email: email.trim().toLowerCase(),
                password,
                password_confirmation: confirm,
            });
            saveAuth(data.token, data.user); // registration also logs the user in
            navigate('/');
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthModal title="Sign up" backTo="/login">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Field id="su-username" label="Username" required>
                    <input
                        id="su-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Please enter a username"
                        className={underlineInput}
                        autoComplete="username"
                        autoFocus
                    />
                </Field>

                <Field id="su-email" label="Email" required>
                    <input
                        id="su-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Please input Email address"
                        className={underlineInput}
                        autoComplete="email"
                    />
                </Field>

                <Field id="su-password" label="Password" required>
                    <PasswordInput
                        id="su-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Please enter password (min. 8 characters)"
                        autoComplete="new-password"
                    />
                    {tooShort && (
                        <p className="mt-1 text-xs text-[#D71920]">
                            Password must be at least 8 characters.
                        </p>
                    )}
                </Field>

                <Field id="su-confirm" label="Confirm new password" required>
                    <PasswordInput
                        id="su-confirm"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Please enter new password"
                        autoComplete="new-password"
                    />
                    {mismatch && (
                        <p className="mt-1 text-xs text-[#D71920]">Passwords do not match.</p>
                    )}
                </Field>

                <FormError message={error} />

                <div className="pt-2">
                    <PrimaryButton disabled={!canSubmit} loading={loading}>Confirm</PrimaryButton>
                </div>

                <TermsCheck checked={agreed} onChange={setAgreed} />
            </form>
        </AuthModal>
    );
}

export default Register;
import React, { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would call your API's login/signup endpoint
        console.log(`Submitting for ${isSignUp ? 'Sign Up' : 'Login'}:`, { email, password });
        alert('Check the console for mock submission data. In a real app, you would be redirected.');
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleButton}>
                    {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage; 
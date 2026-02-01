'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/admin');
            } else {
                setError(data.error || 'Giriş başarısız.');
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
            {/* Cinematic Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                {/* Logo/Branding */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-[0_0_40px_rgba(198,156,46,0.3)] mb-6 rotate-3">
                        <span className="text-black text-4xl font-bold">T</span>
                    </div>
                    <h1 className="text-3xl font-thin tracking-[0.3em] text-white uppercase mb-2">Tambursan</h1>
                    <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Yönetim Paneli Girişi</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Kullanıcı Adı</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="admin"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Şifre</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <p className="text-red-400 text-xs font-medium text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-primary text-black font-bold text-xs tracking-[0.3em] uppercase rounded-2xl shadow-[0_10px_30px_rgba(198,156,46,0.2)] hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 mt-4 overflow-hidden relative group"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Giriş Yapılıyor...
                                </span>
                            ) : (
                                <>
                                    <span className="relative z-10">Paneli Aç</span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer info */}
                <div className="text-center mt-8">
                    <p className="text-[10px] text-gray-600 font-bold tracking-[0.1em]">© 2024 Tambursan — Tüm Hakları Saklıdır</p>
                </div>
            </div>
        </div>
    );
}

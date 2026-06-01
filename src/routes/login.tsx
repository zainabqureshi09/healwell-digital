import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login | Dr. Tanveer Physiotherapy" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox to confirm, then log in.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-12 selection:bg-primary/10 overflow-hidden">
      {/* Background Medical Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "var(--pattern-medical)", backgroundSize: "100px 100px" }}
      />

      {/* Decorative Editorial Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.02] hidden lg:block" />
      <div className="absolute top-20 left-20 w-32 h-32 border border-primary/10 rotate-12 hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary/10 -rotate-12 hidden lg:block" />

      <div className="relative w-full max-w-lg z-10 animate-fade-up">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-display text-2xl">
              T
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl leading-none text-ink">
                Dr. Tanveer
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mt-1">
                Physiotherapist
              </span>
            </div>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-display font-bold text-ink mb-4">
            {mode === "login" ? "Medical Portal" : "Admin Registration"}
          </h1>
          <p className="text-muted-foreground text-sm font-medium max-w-xs mx-auto">
            Authorized access for Dr. Tanveer's healthcare administration and patient management.
          </p>
        </div>

        <div className="bg-white p-8 lg:p-12 border border-border shadow-premium relative">
          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Professional Email
              </label>
              <input
                type="email"
                required
                placeholder="name@drtanveer.pk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                Security Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border-b border-border p-4 text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-primary text-white py-5 px-8 text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-all duration-300 shadow-premium disabled:opacity-50"
              >
                {busy
                  ? "Authenticating..."
                  : mode === "login"
                    ? "Sign In to Dashboard"
                    : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-border flex flex-col items-center gap-4">
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors"
            >
              {mode === "login" ? "Request Administrative Access" : "Return to Secure Login"}
            </button>
            <Link
              to="/"
              className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-ink transition-colors"
            >
              ← Return to Clinical Site
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-tighter text-muted-foreground font-semibold">
          Secure Medical Portal · Dr. Muhammad Tanveer Physiotherapist
        </p>
      </div>
    </div>
  );
}

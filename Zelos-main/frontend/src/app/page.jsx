'use client';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Components/Layout/HeaderLogin/Header";

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const num = 130;
    const maxDist = 140;

    class P {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.3) * 2.0;
        this.vy = (Math.random() - 0.3) * 2.0;
        this.r = 2 + Math.random() * 2;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(230,0,0,0.8)";
        ctx.fill();
      }
    }

    for (let i = 0; i < num; i++) particles.push(new P());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.move();
        p.draw();
      });
      for (let i = 0; i < num; i++) {
        for (let j = i + 1; j < num; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const a = 1 - dist / maxDist;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230,0,0,${a * 0.7})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
}

export default function LoginPage() {
  const [numeroUsuario, setNumeroUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  // Checagem simples de token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/dashBoard");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: numeroUsuario, password: senha }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashBoard");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden text-white font-sans bg-cover bg-center">
      <div className="fixed top-0 left-10 flex items-center mt-[-40] z-40 rounded-br-lg">
        <img src="/senai-logo.png" alt="Logo SENAI" className="h-60 object-contain hidden lg:flex" />
        <img src="/zelos-logo.png" alt="Logo Zelos" className="h-40 object-contain hidden lg:flex" />
      </div>

      <div className="lg:hidden fixed top-0 left-0 w-full z-20 flex mt-[-20px] justify-center">
        <Header />
      </div>

      <div className="absolute inset-0 bg-cover bg-center hidden lg:block" style={{ backgroundImage: "url('/BG.jpeg')" }} />
      <div className="hidden lg:block"><ParticleBackground /></div>
      <div className="absolute inset-0 bg-cover bg-center sm:block lg:hidden" style={{ backgroundColor: "#2C2C2C" }} />

      <section className="relative bg-black/70 p-10 rounded-lg max-w-sm w-full text-center shadow-xl z-20 w-[90%] sm:max-w-sm">
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        <form className="flex flex-col gap-4 text-left" onSubmit={handleLogin}>
          <label className="font-semibold" htmlFor="numeroUsuario">Número de Usuário:</label>
          <input
            id="numeroUsuario"
            type="text"
            value={numeroUsuario}
            onChange={(e) => setNumeroUsuario(e.target.value)}
            placeholder="Digite seu número de usuário"
            className="rounded px-3 py-2 bg-black/90 border border-gray-700 focus:border-red-600 outline-none"
          />

          <label className="font-semibold" htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="rounded px-3 py-2 bg-black/90 border border-gray-700 focus:border-red-600 outline-none"
          />

          <a href="#" className="text-red-500 text-sm self-end hover:underline">
            Esqueceu sua <strong>senha?</strong>
          </a>

          <button
            type="submit"
            className="bg-black/90 border border-white rounded w-75 py-2 mt-4 hover:bg-red-700 transition cursor-pointer"
          >
            Entrar
          </button>

          {erro && <p className="text-red-500 mt-2">{erro}</p>}
        </form>

        <p className="text-red-500 text-sm mt-6">
          Não tem login? <a href="#" className="underline hover:text-red-700"><strong>cadastre-se</strong></a>
        </p>
      </section>
    </main>
  );
}

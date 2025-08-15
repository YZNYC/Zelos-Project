export default function Header() {
    return (
        <header className="flex items-center justify-center w-full max-w-md backdrop-blur-md">
            {/* Logo SENAI */}
            <div className="font-bold text-black text-lg rounded">
                <img src="/Senai-logo.png" alt="SenaiLogo" className="sm:h-10 md:h-50 md:w-full" />
            </div>

            {/* Texto Sistema de chamados*/}
            <span className="ml-5 text-white text-sm uppercase tracking-wide md:text-xl whitespace-nowrap">
                Sistema de Chamados
            </span>

        </header>
    );
}

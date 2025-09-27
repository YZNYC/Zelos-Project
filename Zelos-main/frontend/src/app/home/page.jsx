import { useAuthGuard } from "../Hooks/useAuth";


export default function DashBoard() {
    useAuthGuard(["usuario"]);
    const router = useRouter();
    const [counters, setCounters] = useState(null);
    const [pieData, setPieData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [recent, setRecent] = useState([]);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        router.push("/");
        return;
      }
  
      const fetchData = async () => {
        try {
          const headers = { Authorization: `Bearer ${token}` };
  
          const resCounters = await axios.get("http://localhost:8080/api/dashboard/counters", { headers });
          const resPie = await axios.get("http://localhost:8080/api/dashboard/pie", { headers });
          const resLine = await axios.get("http://localhost:8080/api/dashboard/line", { headers });
          const resRecent = await axios.get("http://localhost:8080/api/dashboard/recent", { headers });
  
          setCounters(resCounters.data);
          setPieData(resPie.data);
          setLineData(resLine.data);
          setRecent(resRecent.data);
        } catch (error) {
          console.error("Erro ao carregar dados do dashboard:", error);
  
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            router.push("/");
          }
        }
      };
  
      fetchData();
    }, [router]);
  
    if (!counters) return <div className="p-4">Carregando...</div>;
  
    return (
      <main className="ml-0 mt-[88px] sm:mt-[165px] p-4 overflow-y-auto">
        <div className="grid grid-cols-12 gap-6">
  
          <div className="col-span-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Chamados abertos" value={counters.abertos} />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Chamados em andamento" value={counters.andamento} />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Chamados finalizados" value={counters.finalizados} />
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3">
              <CardStat title="Tempo médio de resolução" value={counters.tempoMedioHoras} suffix="h" />
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4 min-h-[300px]">
            <CardChartPie data={pieData} />
          </div>
          <div className="col-span-12 xl:col-span-8 min-h-[300px]">
            <CardChartLine data={lineData} />
          </div>
  
          <div className="col-span-12">
            <CardTableRecent rows={recent} />
          </div>
        </div>
      </main>
    );
  }
  
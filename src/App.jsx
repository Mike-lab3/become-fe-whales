import Header from "./components/Header";
import Banners from "./components/Banners";
import LiveMarket from "./components/LiveMarket";
import RecentTrades from "./components/RecentTrades";
import BottomStats from "./components/BottomStats";

function App() {
  return (
    <div className="min-h-screen bg-bg-neutral-01 text-text-neutral-primary">
      <Header />
      <main className="max-w-[1440px] mx-auto pt-4 flex flex-col gap-4 px-8">
        <Banners />
        <LiveMarket />
        <RecentTrades />
      </main>
      <div className="max-w-[1440px] mx-auto px-8">
        <BottomStats />
      </div>
    </div>
  );
}

export default App;

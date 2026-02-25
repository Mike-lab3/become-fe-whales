import { useState } from "react";
import Header from "./components/Header";
import Banners from "./components/Banners";
import LiveMarket from "./components/LiveMarket";
import RecentTrades from "./components/RecentTrades";
import BottomStats from "./components/BottomStats";
import MarketDetailPage from "./components/MarketDetailPage";

function App() {
  const [selectedMarket, setSelectedMarket] = useState(null);

  return (
    <div className="min-h-screen bg-bg-neutral-01 text-text-neutral-primary pb-11">
      <Header onNavigateHome={() => setSelectedMarket(null)} />
      <main className="max-w-[1440px] mx-auto pt-4 flex flex-col gap-4 px-8">
        {selectedMarket ? (
          <MarketDetailPage
            market={selectedMarket}
            onBack={() => setSelectedMarket(null)}
          />
        ) : (
          <>
            <Banners />
            <LiveMarket onSelectMarket={setSelectedMarket} />
            <RecentTrades />
          </>
        )}
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-bg-neutral-01 border-t border-border-neutral-01 z-40">
        <div className="max-w-[1440px] mx-auto px-8">
          <BottomStats />
        </div>
      </div>
    </div>
  );
}

export default App;

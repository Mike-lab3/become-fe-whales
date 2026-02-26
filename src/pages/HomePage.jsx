import Banners from "../components/Banners";
import LiveMarket from "../components/LiveMarket";
import RecentTrades from "../components/RecentTrades";

function HomePage({ onSelectMarket }) {
  return (
    <>
      <Banners />
      <LiveMarket onSelectMarket={onSelectMarket} />
      <RecentTrades />
    </>
  );
}

export default HomePage;

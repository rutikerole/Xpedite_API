import SideBar from "../components/sideBar.js";
import MainDashboard from "../components/mainDashBoard.js";


function Dashboard() {

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <SideBar />
      <MainDashboard />
    </div>
  );
}

export default Dashboard;

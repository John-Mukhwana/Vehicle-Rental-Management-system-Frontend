import Stats from "../../components/stats";
import MonthtlyRevenueChart from "../../components/AdminRevenueChart"; // Import the MonthtlyRevenueChart component
import DrillDownChart from "../../components/AdminDrillDownChart";

const AdminHome = () => {
  return (
    <div className="flex flex-col  gap-10">
      <Stats/>
      <MonthtlyRevenueChart/>
      <div className="flex gap-8">
      
      <DrillDownChart />
      </div>
      
    
    </div>
  );
}

 export default  AdminHome;
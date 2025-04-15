import AdminLayout from "../components/AdminComponents/components/layout/AdminLayout";
import DashboardView from "../components/AdminComponents/components/dashboard/DashboardView";
import SetUserDataToStore from "../service/userdata/SetDataToStore";

export default function AdminDashboard() {
  return (
    <>
    
    <AdminLayout>
      <DashboardView />
    </AdminLayout>
     <SetUserDataToStore/>
    </>
  );
}


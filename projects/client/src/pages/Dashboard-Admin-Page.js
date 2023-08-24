import { Center, Flex} from "@chakra-ui/react";
import AdminSidebar from "../components/AdminSidebar";
import SalesReport from "../components/SalesReport";
import DashboradContent from "../components/DashboardContent";
import DashboardAdminContent from "../components/Dashboard-Admin-conten";

export default function DashboardAdminPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 880 ? (
        <Center borderRight={"1px solid lightgrey"}>
          <Flex
            maxWidth={"1160px"}
            w={"100%"}
            borderRight={"1px solid lightgrey"}
          >
            <AdminSidebar />
            <DashboardAdminContent />
          </Flex>
        </Center>
      ) : (
        <>
          <DashboardAdminContent />
        </>
      )}
    </>
  );
}

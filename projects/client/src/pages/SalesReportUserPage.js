import { Center, Flex} from "@chakra-ui/react";
import AdminSidebar from "../components/AdminSidebar";
import SalesReportUser from "../components/SalesReport-user";

export default function SalesReportUserPage() {
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
            <SalesReportUser />
          </Flex>
        </Center>
      ) : (
        <>
          <SalesReportUser />
        </>
      )}
    </>
  );
}

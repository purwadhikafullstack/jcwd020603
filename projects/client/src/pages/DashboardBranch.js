import { Center, Flex} from "@chakra-ui/react";
import AdminSidebar from "../components/AdminSidebar";
import AdminBranch from "../components/AdminBranch";

export default function DashboardBranch() {
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
            <AdminBranch />
          </Flex>
        </Center>
      ) : (
        <>
          <AdminBranch />
        </>
      )}
    </>
  );
}

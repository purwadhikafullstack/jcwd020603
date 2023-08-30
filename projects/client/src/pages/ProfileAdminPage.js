import { Center, Flex} from "@chakra-ui/react";
import AdminSidebar from "../components/AdminSidebar";
import ProfileAdmin from "../components/ProfileAdmin";

export default function ProfileAdminPage() {
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
            <ProfileAdmin />
          </Flex>
        </Center>
      ) : (
        <>
          <ProfileAdmin />
        </>
      )}
    </>
  );
}

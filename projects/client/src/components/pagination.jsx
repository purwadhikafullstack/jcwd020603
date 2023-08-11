import { Center, Flex } from "@chakra-ui/react";
import { GrNext } from "react-icons/gr";

export default function Pagination(props) {
  const { totalPages, pages, setShown, shown } = props;
  console.log(props);
  return (
    <>
      <Center gap={"10px"}>
        <Flex transform="rotate(180deg)">
          <GrNext />
        </Flex>
        {pages.map((val) => {
          return (
            <>
              <Center
                w={"20px"}
                h={"20px"}
                borderRadius={"5px"}
                bg={"grey"}
                onClick={() => {
                  setShown({ ...shown, page: val });
                }}
              >
                {val}
              </Center>
            </>
          );
        })}
        <GrNext />
      </Center>
    </>
  );
}

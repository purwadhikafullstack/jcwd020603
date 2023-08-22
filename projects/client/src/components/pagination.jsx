import { Center, Flex } from "@chakra-ui/react";
import { GrNext } from "react-icons/gr";

export default function Pagination(props) {
  const { totalPages, pages, setShown, shown } = props;
  const NumberBox = ({ val }) => {
    return (
      <Center
        w={"20px"}
        h={"20px"}
        borderRadius={"5px"}
        bg={Math.ceil(shown.page) == val ? "grey" : "none"}
        color={Math.ceil(shown.page) == val ? "white" : "black"}
        onClick={() => {
          setShown({ ...shown, page: val });
        }}
      >
        {val}
      </Center>
    );
  };

  return (
    <>
      <Center gap={"5px"}>
        <Flex transform="rotate(180deg)">
          <GrNext
            style={{ cursor: "pointer" }}
            display={shown.page > 1 ? "flex" : "none"}
            onClick={() => {
              if (shown.page > 1) {
                setShown({ ...shown, page: shown.page - 1 });
              }
            }}
          />
        </Flex>
        {pages.length <= 3 ? (
          pages.map((val) => (
            <NumberBox style={{ cursor: "pointer" }} val={val} />
          ))
        ) : (
          <>
            {shown.page < Math.ceil(pages.length / 3) && (
              <>
                {pages
                  .slice(
                    shown.page >= 2 ? shown.page - 2 : 0,
                    shown.page >= 2 ? shown.page + 1 : shown.page + 2
                  )
                  .map((val) => (
                    <NumberBox style={{ cursor: "pointer" }} val={val} />
                  ))}
              </>
            )}
            {shown.page >= Math.ceil(pages.length / 3) &&
              shown.page <= pages.length - 2 && (
                <>
                  {pages.slice(shown.page - 2, shown.page + 1).map((val) => (
                    <NumberBox style={{ cursor: "pointer" }} val={val} />
                  ))}
                </>
              )}
            {shown.page > pages.length - 2 && (
              <>
                {pages.slice(-3).map((val) => (
                  <NumberBox style={{ cursor: "pointer" }} val={val} />
                ))}
              </>
            )}
          </>
        )}
        <GrNext
          style={{ cursor: "pointer" }}
          display={shown.page < totalPages ? "flex" : "none"}
          onClick={() => {
            if (shown.page < totalPages) {
              setShown({ ...shown, page: shown.page + 1 });
            }
          }}
        />
      </Center>
    </>
  );
}

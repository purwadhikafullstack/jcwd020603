import {
  Stack,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
  Flex,
  Icon,
} from "@chakra-ui/react";
import "../css/indexB.css";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

export function ACardProduct(props) {
  //   const navigate = useNavigate();
  //     const handleClick = () => {
  //       navigate("/product", { state: { categoryName: props.categoryName } });
  //     };

  return (
    <>
      <Stack>
        <TableContainer id="containerTableB" justifyContent={"space-between"}>
          <Table variant="simple">
            <Thead className="tHeadB">
              <Tr id="tRowB">
                <Th>No</Th>
                <Th className="thProductB">Pic</Th>
                <Th className="thProductB">
                  <Flex alignItems="center" id="tableNameB">
                    Product Name{" "}
                    <Flex flexDirection="column">
                      <Icon id="ascendingB" as={MdArrowBackIosNew} />
                      <Icon id="descendingB" as={MdArrowBackIosNew} />
                    </Flex>
                  </Flex>
                </Th>
                <Th className="thProductB">
                  <Flex alignItems="center" id="tableNameB">
                    <Flex>Category</Flex>
                    <Flex flexDirection="column">
                      <Icon id="ascendingB" as={MdArrowBackIosNew} />
                      <Icon id="descendingB" as={MdArrowBackIosNew} />
                    </Flex>
                  </Flex>
                </Th>
                <Th className="thProductB">
                  <Flex alignItems="center" id="tableNameB">
                    Price{" "}
                    <Flex flexDirection="column">
                      <Icon id="ascendingB" as={MdArrowBackIosNew} />
                      <Icon id="descendingB" as={MdArrowBackIosNew} />
                    </Flex>
                  </Flex>
                </Th>
                <Th className="thProductB">Desc </Th>
                <Th className="thProductB">Weight </Th>
                <Th className="thProductB" isNumeric>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>{/* Render your table rows here */}</Tbody>
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}

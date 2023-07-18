import { Flex, Center, Image, Icon } from "@chakra-ui/react";
import "../css/indexB.css";
import { useState } from "react";

import { MdSearch } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

export function AdminSearchBar(props) {
  const [searchTerm, setSearchTerm] = useState(""); // Menambahkan state untuk nilai pencarian
  return (
    <>
      <Flex id="searchBarB">
        <input
          type="text"
          placeholder="Cari Disini"
          value={searchTerm}
          style={{ width: "100%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Icon id="iconSearchB" as={MdSearch} />
        <Icon
          id="iconBackSpaceB"
          as={MdArrowBackIosNew}
          onClick={() => setSearchTerm("")}
        />
      </Flex>
    </>
  );
}

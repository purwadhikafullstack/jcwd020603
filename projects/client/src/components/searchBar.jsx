import { Flex, Center, Image, Icon, Input, IconButton } from "@chakra-ui/react";
import "../css/indexB.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../redux/searchAction";

import { MdSearch } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";

export function SearchBar(props) {
  const { nearestBranch } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (search) => {
    props.onSearch(search || searchTerm);
    localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
  };

  function autoSearch(search) {
    setSearchTerm(search);
    setTimeout(() => {
      handleSearch(search);
    }, 500);
  }

  useEffect(() => {
    if (localStorage.getItem("searchTerm")) {
      const search = JSON.parse(localStorage.getItem("searchTerm"));
      console.log(search);
      if (search) {
        autoSearch(search);
      }
    }
  }, []);

  return (
    <>
      <Flex id="searchBarB">
        <input
          type="text"
          placeholder="Mau Belanja Apa?"
          value={searchTerm}
          style={{ width: "100%", border: "none", outline: "none" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Icon
          // isDisabled={searchTerm ? false : true}
          id="iconSearchB"
          as={MdSearch}
          onClick={(e) => {
            if (searchTerm) {
              navigate(`/product`, {
                state: {
                  searchTerm: e.target.values,
                  searchResults: location.state?.searchResults,
                },
              });
              handleSearch();
            }
          }}
        />
        <Icon
          id="iconBackSpaceB"
          as={MdArrowBackIosNew}
          onClick={() => setSearchTerm("")}
        />
      </Flex>
    </>
  );
}

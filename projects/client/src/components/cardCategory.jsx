import { Flex, Center, Grid, Image, Button } from "@chakra-ui/react";
import bgSS from "../assets/logo/bg.jpg";
import "../css/indexB.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function CardCategory(props) {
  const navigate = useNavigate();

  const { photo_category_url, category_name } = props;

  const handleClick = () => {
    navigate("/product", { state: { category_name: category_name } });
    props.setSelectedCategory(category_name);
  };

  useEffect(() => {
    console.log(props.photo_category_url);
  }, []);

  return (
    <>
      <Flex
        className="cardCategoryB"
        defaultValue={props.category_name}
        onClick={handleClick}
      >
        <Center flex="1">
          <Image id="categoryImageB" src={photo_category_url} />
        </Center>
        <Center id="categoryNameB">{props.category_name}</Center>
      </Flex>
    </>
  );
}

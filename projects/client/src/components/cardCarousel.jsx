import { Flex, Center, Image } from "@chakra-ui/react";
import "../css/indexB.css";

export function CardCarousel(props) {
  return (
    <>
      <Flex className="cardCarouselB" flexDir="column">
        <Center flex="1">
          <Image id="imageCarousel" src={props.photo_category_url} />
        </Center>
      </Flex>
    </>
  );
}

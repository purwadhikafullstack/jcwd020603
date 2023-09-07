import { Flex, Center, Image } from "@chakra-ui/react";
import "../css/indexB.css";
import { useNavigate } from "react-router-dom";
import default1 from "../assets/newestDefaultBanner.jpg";

export function CardCarouselDefault() {
  return (
    <>
      <div className="cardCarouselB" flexDir="column">
        <Center flex="1">
          <Image id="imageCarousel" src={default1} />
        </Center>
      </div>
    </>
  );
}

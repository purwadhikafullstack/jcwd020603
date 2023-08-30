import { Flex, Center, Image } from "@chakra-ui/react";
import "../css/indexB.css";
import { useNavigate } from "react-router-dom";

export function CardCarousel(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/promo`, {
      state: {
        discount_id: props.discount_id,
        nearestBranch: props.nearestBranch,
      },
    });
  };
  return (
    <>
      <div className="cardCarouselB" flexDir="column" onClick={handleClick}>
        <Center flex="1">
          <Image id="imageCarousel" src={props.photo_discount_url} />
        </Center>
      </div>
    </>
  );
}

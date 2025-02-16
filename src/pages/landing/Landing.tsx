import { FC } from "react";
import { Button, Container, Header, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HeaderSearch } from "../header/HeaderSearch";
import classes from "../../styles/landingPage/Landing.module.scss";

import image1 from "../../asset/Eva_Suit_Desktop_alternate_1cf9bae18e.jpg";
import image2 from "../../asset/Star12_18_021125_DSC_4851_desktop_a63e515a55.jpg";
import image3 from "../../asset/make_life_multiplanetary_desktop_3fa7cff73c.jpg";
import image4 from "../../asset/Flight_7_Website_Desktop_7_4afb3a9d9a.jpg";

const images = [
  { image: image1, link: "/login" },
  { image: image2, link: "/" },
  { image: image3, link: "/" },
  { image: image4, link: "/" },
];

const Landing: FC = () => {
  const navigate = useNavigate();

  const handleOnClick = (link: string) => {
    navigate(link);
  };

  return (
    <>
      {/* <Container className={classes.imageContainer} fluid> */}
      <div className={classes.imageContainer}>
        <HeaderSearch />

        <div className={classes.imageGrid}>
          {images.map((image, index) => (
            <div className={classes.imageWrapper} key={index}>
              <Image
                src={image.image}
                alt=""
                className={classes.responsiveImage}
              />
              <div className={classes.overlay}>
                <Button
                  className={classes.exploreButton}
                  onClick={() => handleOnClick(image.link)}
                >
                  Explore
                </Button>
                <Text className={classes.exploreText}>
                  Explore more about the program
                </Text>
              </div>
            </div>
          ))}
        </div>

        <div className={classes.footer}>
          <p>@Copyright reserved @mySpaceX 2025</p>
        </div>
      </div>
    </>
  );
};

export default Landing;

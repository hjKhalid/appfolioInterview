import { FC, useCallback, useRef } from "react";
import { Button, Image, Loader, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import HeaderSearch from "../header/HeaderSearch";
import classes from "../../styles/landingPage/Landing.module.scss";
import image1 from "../../asset/Eva_Suit_Desktop_alternate_1cf9bae18e.jpg";
import image2 from "../../asset/Flight_7_Website_Desktop_7_4afb3a9d9a.jpg";
import image3 from "../../asset/Star12_18_021125_DSC_4851_desktop_a63e515a55.jpg";
import image4 from "../../asset/make_life_multiplanetary_desktop_3fa7cff73c.jpg";

// Static images array moved outside component to prevent re-render recreation
const IMAGES = [
  {
    image: image1,
    link: "/login",
  },
  {
    image: image2,
    link: "/",
  },
  {
    image: image3,
    link: "/",
  },
  {
    image: image4,
    link: "/",
  },
];

const Landing: FC = () => {
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement>(null);

  // Memoized click handler to prevent unnecessary re-renders
  const handleExploreClick = useCallback(
    (link: string) => () => navigate(link),
    [navigate]
  );

  return (
    <div className={classes.imageContainer}>
      <HeaderSearch />

      <div className={classes.imageGrid}>
        {IMAGES.map(({ image, link }, index) => (
          <div className={classes.imageWrapper} key={image}>
            <Image
              src={image}
              alt={`SpaceX mission ${index + 1}`}
              imageRef={imageRef}
              className={classes.responsiveImage}
              placeholder={<div className={classes.imagePlaceholder} />}
            />
            <div className={classes.overlay}>
              <Button
                className={classes.exploreButton}
                onClick={handleExploreClick(link)}
                aria-label={`Explore mission ${index + 1}`}
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

      <footer className={classes.footer}>
        <p>@Copyright reserved @mySpaceX 2025</p>
      </footer>
    </div>
  );
};

export default Landing;

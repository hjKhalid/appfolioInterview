import { Burger, Drawer, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import logo from "../../asset/images-removebg-preview.png";
import classes from "../../styles/header/HeaderSearch.module.scss";

interface NavLink {
  link: string;
  label: string;
}

const links: NavLink[] = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export default function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path);
    close();
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image
            src={logo}
            height={40}
            width={100}
            className={classes.logo}
            alt="Website logo"
          />
        </Group>

        <Group className={classes.links} visibleFrom="md">
          {links.map((link) => (
            <a
              key={link.label}
              onClick={() => handleNavigate(link.link)}
              className={classes.link}
              role="button"
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          hiddenFrom="md"
          color="white"
          aria-label="Toggle navigation"
        />

        <Drawer
          opened={opened}
          onClose={close}
          padding="md"
          size="60%"
          className={classes.drawer}
          bg="blue"
          title="Menu"
          zIndex={1000000}
        >
          {links.map((link) => (
            <a
              key={link.label}
              onClick={() => handleNavigate(link.link)}
              className={classes.mobileLink}
              role="button"
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
        </Drawer>
      </div>
    </header>
  );
}
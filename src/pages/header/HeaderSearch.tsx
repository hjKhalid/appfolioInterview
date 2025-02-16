import { useState } from "react";
import { Autocomplete, Burger, Drawer, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import logo from "../../asset/images-removebg-preview.png";
import classes from "../../styles/header/HeaderSearch.module.scss";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function HeaderSearch() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    close(); // Close drawer after clicking a link
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Image src={logo} height={"40px"} width={"100px"}   className={classes.logo} />
        </Group>

        {/* Desktop Navigation */}
        <Group className={classes.links} visibleFrom="md">
          {links.map((link) => (
            <a
              key={link.label}
              onClick={() => handleNavigate(link.link)}
              className={classes.link}
            >
              {link.label}
            </a>
          ))}
        </Group>

        {/* Mobile Burger Menu */}
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          hiddenFrom="md"
          color="white"
        />

        {/* Mobile Drawer Menu */}
        <Drawer
          opened={opened}
          onClose={close}
          padding="md"
          size="60%"
          className={classes.drawer}
          bg={"blue"}
           >
          {links.map((link) => (
            <a
              key={link.label}
              onClick={() => handleNavigate(link.link)}
              className={classes.mobileLink}
            >
              {link.label}
            </a>
          ))}
        </Drawer>
      </div>
    </header>
  );
}

// src/pages/ResourceList.tsx
import { useQuery } from "@tanstack/react-query";
import {
  TextInput,
  Loader,
  Container,
  Title,
  Text,
  Image,
  Button,
  Grid,
  Flex,
} from "@mantine/core";
import { Link, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./ResourceList.module.scss";

interface Rocket {
  id: string;
  name: string;
  type: string;
  cost_per_launch: number;
  description: string;
  flickr_images: string[];
}

const fetchResources = async (): Promise<Rocket[]> => {
  const res = await fetch("https://api.spacexdata.com/v4/rockets");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export function ResourceList(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useQuery<Rocket[]>(
    ["rockets"],
    fetchResources
  );

  const searchTerm = searchParams.get("search") || "";
  const filteredData = (data || []).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  if (isLoading)
    return (
      <Container
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Loader variant="bars" color="white" size="xl" />
        <Text ml={2}>Loading ....</Text>
      </Container>
    );

  if (isError) return <div>Error loading data.</div>;

  return (
    <Container bg={"black"} className={classes.resourceListContainer} fluid>
      <Title order={2} mb="md" align="center" color="white">
        MySpaceX Rockets
      </Title>

      <Container mt={"20px"} mb={"20px"} px={isSmallScreen ? "md" : "lg"}>
        <TextInput
          placeholder="Search rockets..."
          value={searchTerm}
          onChange={(e) => setSearchParams({ search: e.target.value })}
          mb="md"
          size="md"
        />
      </Container>

      <Grid gutter="xl">
        {filteredData.map((rocket) => (
          <Grid.Col span={isSmallScreen ? 12 : 6} key={rocket.id}>
            <Container
              style={{
                position: "relative",
                padding: isSmallScreen ? "10px" : "20px",
                textAlign: isSmallScreen ? "center" : "left",
                borderRadius: "10px",
                backgroundColor: "#1a1a1a",
                color: "white",
              }}
            >
              <Image
                src={rocket.flickr_images[0]}
                height={isSmallScreen ? 250 : 400}
                radius="md"
              />

              <Flex
                direction="column"
                align={isSmallScreen ? "center" : "flex-start"}
                mt="md"
              >
                <Title order={3} color="white">
                  {rocket.name}
                </Title>
                <Text size={isSmallScreen ? "sm" : "md"} mb="sm">
                  {rocket.description.slice(0, 150)}...
                </Text>
                <Link to={`/resources/${rocket.id}`}>
                  <Button size={isSmallScreen ? "sm" : "md"}>
                    Learn More...
                  </Button>
                </Link>
              </Flex>
            </Container>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

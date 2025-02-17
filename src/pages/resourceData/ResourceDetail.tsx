// src/pages/ResourceDetail.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Image,
  Text,
  List,
  Tabs,
  Skeleton,
  Alert,
  Title,
} from "@mantine/core";
// import { IconInfoCircle } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";

interface Rocket {
  id: string;
  name: string;
  first_flight: string;
  cost_per_launch: number;
  success_rate_pct: number;
  height: { meters: number };
  diameter: { meters: number };
  flickr_images: string[];
}

interface Launch {
  id: string;
  name: string;
  date_utc: string;
}

const fetchRocket = async (id: string): Promise<Rocket> => {
  const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  if (!res.ok) throw new Error("Failed to fetch rocket data");
  return res.json();
};

const fetchLaunches = async (rocketId: string): Promise<Launch[]> => {
  const res = await fetch(
    `https://api.spacexdata.com/v4/launches?rocket=${rocketId}`
  );
  if (!res.ok) throw new Error("Failed to fetch launch data");
  return res.json();
};

export default function ResourceDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const {
    data: rocket,
    isLoading,
    isError,
  } = useQuery<Rocket>(["rocket", id], () => fetchRocket(id!), {
    enabled: !!id,
  });

  const { data: launches } = useQuery<Launch[]>(
    ["launches", rocket?.id],
    () => fetchLaunches(rocket!.id),
    { enabled: !!rocket?.id }
  );

  if (isLoading)
    return (
      <div style={{ padding: 20 }}>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </div>
    );

  if (isError)
    return (
      <Alert
        variant="filled"
        color="red"
        title="Error"
        // icon={<IconInfoCircle />}
      >
        Failed to load rocket details
      </Alert>
    );

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 20,
        background: "black",
        color: "white",
        height: "auto",
      }}
    >
      <Title order={1} mb="lg" align="center">
        {rocket?.name}
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder bg={"black"}>
        <Carousel withIndicators height={400}>
          {rocket?.flickr_images.map((image, index) => (
            <Carousel.Slide key={index}>
              <Image src={image} height={400} alt={rocket?.name} />
            </Carousel.Slide>
          ))}
        </Carousel>

        <Tabs defaultValue="details" mt="md">
          <Tabs.List>
            <Tabs.Tab value="details" style={{ color: "white" }}>
              Specifications
            </Tabs.Tab>
            <Tabs.Tab value="launches" style={{ color: "white" }}>
              Launches ({launches?.length || 0})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="details" pt="xs">
            <List spacing="xs" mt="md" style={{ color: "white" }}>
              <List.Item>
                <Text fw={500}>First Flight:</Text> {rocket?.first_flight}
              </List.Item>
              <List.Item>
                <Text fw={500}>Cost per Launch:</Text> $
                {rocket?.cost_per_launch
                  ? rocket.cost_per_launch.toLocaleString()
                  : "N/A"}
              </List.Item>
              <List.Item>
                <Text fw={500}>Success Rate:</Text> {rocket?.success_rate_pct}%
              </List.Item>
              <List.Item>
                <Text fw={500}>Height:</Text> {rocket?.height.meters}m
              </List.Item>
              <List.Item>
                <Text fw={500}>Diameter:</Text> {rocket?.diameter.meters}m
              </List.Item>
            </List>
          </Tabs.Panel>

          <Tabs.Panel value="launches" pt="xs">
            <List
              type="ordered"
              spacing="xs"
              mt="md"
              style={{ color: "white" }}
            >
              {launches?.length ? (
                launches.map((launch) => (
                  <List.Item key={launch.id}>
                    {launch.name} (
                    {new Date(launch.date_utc).toLocaleDateString()})
                  </List.Item>
                ))
              ) : (
                <Text color="dimmed">No launches found</Text>
              )}
            </List>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}

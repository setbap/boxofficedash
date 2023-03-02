import { Box, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import BarGraph from "lib/components/charts/BarGraph";
import { Top50Type } from "pages/top50";

const colors = [
  "#4caf50",
  "#f44336",
  "#03a9f4",
  "#ff5722",
  "#ffc107",
  "#00bcd4",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#009688",
  "#607d8b",
];

const Top500 = ({ data: { top50 } }: Top50Type): JSX.Element => {
  return (
    <>
      <NextSeo title={`Top 50 Box Office`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title={`Top 50 Box Office`} />

        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={top50.top50Info._sum.worldwidebox_office ?? ""}
            comment={"according total sale"}
            title={`Sum Top 50 Worldwidebox Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top50.top50Info._sum.domesticbox_office ?? ""}
            comment={"according total sale"}
            title={`Sum Top 50 Domestic Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top50.top50Info._sum.international_box ?? ""}
            comment={"according total sale"}
            title={`Sum Top 50 International Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top50.top50Info._avg.worldwidebox_office ?? ""}
            comment={"according total sale"}
            title={`Average Top 50 Worldwidebox Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top50.top50Info._avg.domesticbox_office ?? ""}
            comment={"according total sale"}
            title={`Average Top 50 Domestic Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top50.top50Info._avg.international_box ?? ""}
            comment={"according total sale"}
            title={`Average Top 50 International Box Office`}
            status="inc"
            unit={"$"}
          />
        </SimpleGrid>

        <SimpleGrid
          position={"relative"}
          transition={"all 0.9s ease-in-out"}
          pb={"6"}
          gap={4}
          zIndex={100}
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >
          <HeaderSection title="Top 50 Movie in Box Office">{``}</HeaderSection>

          {[
            { title: "Domestic", keyword: "domesticbox_office" },
            { title: "International", keyword: "international_box" },
            { title: "Worldwidebox", keyword: "worldwidebox_office" },
          ].map((item) => (
            <BarGraph
              key={item.title}
              isNotDate
              extraInfoToTooltip=""
              modalInfo=""
              values={top50.first50Domestic}
              title={`Top 50 ${item.title} Movies`}
              dataKey="movie"
              oyLabel="$USD"
              oxLabel=""
              baseSpan={3}
              labels={[
                {
                  color: colors[4],
                  key: item.keyword,
                },
              ]}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Top500;

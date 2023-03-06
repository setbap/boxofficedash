import {
  chakra,
  Box,
  Button,
  SimpleGrid,
  Text,
  useColorMode,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";
import BarGraph from "lib/components/charts/BarGraph";
import { YearType } from "pages/year-by-year";
import CandleChart from "lib/components/charts/CandleChart";
import CalendarChart from "lib/components/charts/CalendarChart";
import LineChartWithBar from "lib/components/charts/LineChartWithBar";
import { useState } from "react";

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

const Company = ({ data: { totalData, years } }: YearType): JSX.Element => {
  const [selectedYear, setSelectedYear] = useState(2018);
  const { colorMode } = useColorMode();
  const selectedData = totalData.filter((row) => row.year == selectedYear);
  return (
    <>
      <NextSeo title={`Box Office According year`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title={`Box Office According year`} />
        <Box
          mt="4"
          p={"4"}
          bgColor={useColorModeValue("white", "#191919")}
          shadow="base"
          transition={"all 0.5s "}
          border={"2px solid transparent"}
          _hover={{
            boxShadow: "var(--chakra-shadows-lg)",
            borderColor: "#444",
          }}
          borderRadius={"2xl"}
          className={
            colorMode === "dark" ? "gradient-box" : "gradient-box-light"
          }
        >
          <Heading size={"md"} ms={"4"}>
            Select Year:
          </Heading>
          {years.sort().map((year, index) => (
            <Button
              mt={"2"}
              ms="2"
              size={"sm"}
              _hover={{
                bg: useColorModeValue("#2224", "#a9a9a92b"),
              }}
              borderWidth="1px"
              borderColor={useColorModeValue("#1114", "#a9a9a91b")}
              bg={selectedYear === year ? "#9993" : "transparent"}
              onClick={() => {
                setSelectedYear(year);
              }}
              key={year}
            >
              {year}
            </Button>
          ))}
        </Box>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={selectedYear.toString()}
            title={`Selected Year`}
            status="inc"
          />

          <StatsCard
            stat={selectedData.length.toString()}
            title={`Number movie in top 500`}
            status="inc"
          />
        </SimpleGrid>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={Math.max(
              ...selectedData.map((row) => row.domesticbox_office)
            )}
            title={`Max Domesticbox Box Office`}
            status="inc"
          />
          <StatsCard
            stat={Math.max(...selectedData.map((row) => row.international_box))}
            title={`Max International Box Office`}
            status="inc"
          />
          <StatsCard
            stat={Math.max(
              ...selectedData.map((row) => row.worldwidebox_office)
            )}
            title={`Max Worldwide Box Office`}
            status="inc"
          />

          <StatsCard
            stat={selectedData.reduce((a, b) => a + b.domesticbox_office, 0)}
            title={`Sum Domesticbox Box Office`}
            status="inc"
          />
          <StatsCard
            stat={selectedData.reduce((a, b) => a + b.international_box, 0)}
            title={`Sum International Box Office`}
            status="inc"
          />
          <StatsCard
            stat={selectedData.reduce((a, b) => a + b.worldwidebox_office, 0)}
            title={`Sum Worldwide Box Office`}
            status="inc"
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
          <HeaderSection title="Revenue of each movie">
            {`
In this section, you can see the revenue of each movie.
            `}
          </HeaderSection>

          <BarGraph
            key={selectedYear}
            isNotDate
            extraInfoToTooltip=""
            modalInfo=""
            values={selectedData}
            title={`Movies in top 500 in year ${selectedYear}`}
            dataKey="movie"
            oyLabel="$USD"
            oxLabel=""
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "international_box",
              },

              {
                color: colors[0],
                key: "domesticbox_office",
              },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Company;

import { Box, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";
import BarGraph from "lib/components/charts/BarGraph";
import { YearsType } from "pages/years";
import CandleChart from "lib/components/charts/CandleChart";
import CalendarChart from "lib/components/charts/CalendarChart";
import LineChartWithBar from "lib/components/charts/LineChartWithBar";

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

const Company = ({ data: { yearInfo } }: YearsType): JSX.Element => {
  return (
    <>
      <NextSeo title={`Box Office According years`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title={`Box Office According years`} />

        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={"1939"}
            title={`Oldest movie in box office`}
            status="inc"
          />
          <StatsCard
            stat={"2018"}
            title={`Year with highest movie in top 500`}
            status="inc"
          />
          <StatsCard
            stat={"38"}
            title={`count movie in top 500 2018`}
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
          <HeaderSection title="Total Volume each month">
            {`
In this section, you can see the total volume of a stock every month.
            `}
          </HeaderSection>
          <LineChartWithBar
            isNotDate
            hideLine
            data={yearInfo.first50Worldwide}
            title={`Number of moive and total sale  box office from 500 in each year`}
            showSeprate
            baseSpan={3}
            xAxisDataKey={"year"}
            lineDataKey={""}
            barDataKey={"worldwidebox_office_sum"}
            additionalLineKey={["count"]}
            barColor={colors[4]}
          />

          <HeaderSection title="Average volume per month">
            {`
In this section, you can see the highest and lowest daily volume of a stock in each month. The average daily volume in each month is also shown.
            `}
          </HeaderSection>

          <StackedAreaChart
            isNotDate
            extraInfoToTooltip=""
            modalInfo=""
            values={yearInfo.first50Worldwide}
            title={`Sum Yearly Box Office Income from top 500`}
            dataKey="year"
            oyLabel="$USD"
            oxLabel=""
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "international_box_sum",
              },

              {
                color: colors[0],
                key: "domesticbox_office_sum",
              },
            ]}
          />

          <StackedAreaChart
            isNotDate
            extraInfoToTooltip=""
            modalInfo=""
            values={yearInfo.first50Worldwide}
            title={`Average Yearly Box Office Income from top 500`}
            dataKey="year"
            oyLabel="$USD"
            oxLabel=""
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "international_box_avg",
              },
              {
                color: colors[0],
                key: "domesticbox_office_avg",
              },
            ]}
          />

          <StackedAreaChart
            isNotDate
            extraInfoToTooltip=""
            modalInfo=""
            values={yearInfo.first50Worldwide}
            title={`Max Yearly Box Office Income from top 500`}
            dataKey="year"
            oyLabel="$USD"
            oxLabel=""
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "international_box_max",
              },

              {
                color: colors[0],
                key: "domesticbox_office_max",
              },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Company;

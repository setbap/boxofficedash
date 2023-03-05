import { Box, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import BarGraph from "lib/components/charts/BarGraph";
import { McuType } from "pages/mcu";
import TableBox from "lib/components/charts/TableBox";
import { box_office, mcu } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import millify from "millify";

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

const Top500 = ({
  data: { allData, dataByPhase, allDataSummerize },
}: McuType): JSX.Element => {
  return (
    <>
      <NextSeo title={`MCU Data`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title={`MCU Box Office`}>
          {`
The Marvel Cinematic Universe (MCU) is a massive media franchise that includes a series of superhero films produced by Marvel Studios and based on characters from Marvel Comics. The franchise began with the 2008 release of Iron Man and has since grown to include several sequels and spin-offs, as well as a range of television shows, video games and other media. The MCU is one of the highest grossing film franchises of all time, and its characters and stories have become an integral part of popular culture. The MCU is known for its strong continuity between films and its focus on character development, as well as its signature blend of action, comedy, and adventure.
          `}
        </HeaderSection>

        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={4}
            comment="at time of collecting this data"
            title={`Number of Phase`}
            status="inc"
            unit={""}
          />
          <StatsCard
            stat={allData.length}
            title={`Number of movies`}
            status="inc"
            unit={""}
          />

          <StatsCard
            stat={allDataSummerize._avg.tomato_meter!}
            title={`Average tomato score`}
            status="inc"
            unit={""}
          />
          <StatsCard
            stat={allDataSummerize._avg.movie_duration! / 1000000}
            title={`Average movie duration`}
            status="inc"
            unit={""}
          />
          <StatsCard
            stat={allDataSummerize._avg.production_budget!}
            title={`Average production budget`}
            status="dec"
            unit={""}
          />

          <StatsCard
            stat={allDataSummerize._avg.domestic_box_office!}
            title={`Average domestic box office`}
            status="inc"
            unit={""}
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
          <HeaderSection title="MCU Movies By Phase">{``}</HeaderSection>
          {[
            { title: "avg audience score", keyword: "avg_audience_score" },
            {
              title: "Average domestic box office",
              keyword: "avg_domestic_box_office",
            },
            { title: "Average movie duration", keyword: "avg_movie_duration" },
            {
              title: "Average production budget",
              keyword: "avg_production_budget",
            },
            { title: "Average tomato_meter", keyword: "avg_tomato_meter" },
            {
              title: "Sum domestic box office",
              keyword: "sum_domestic_box_office",
            },
          ].map((item) => (
            <BarGraph
              key={item.title}
              isNotDate
              extraInfoToTooltip=""
              modalInfo=""
              values={dataByPhase}
              title={`${item.title} Info by phase`}
              dataKey="phase"
              oyLabel="$USD"
              oxLabel=""
              baseSpan={1}
              labels={[
                {
                  color: colors[4],
                  key: item.keyword,
                },
              ]}
            />
          ))}
          <HeaderSection title="MCU Movies Info">{``}</HeaderSection>

          <TableBox
            customHeaderColor={colors[2]}
            title={"MCU Box Office "}
            baseSpan={3}
            tablePageSize={10}
            modalInfo={``}
            data={allData}
            columnsDef={colDef}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

const colDef: ColumnDef<mcu>[] = [
  {
    accessorFn: (row) => row.mcu_phase,
    enableSorting: true,
    id: "mcu_phase",
    cell: (info) => info.getValue(),
    header: () => <span>mcu_phase</span>,
  },
  {
    accessorFn: (row) => row.movie_title,
    enableSorting: true,
    id: "movie_title",
    cell: (info) => info.getValue(),
    header: () => <span>movie_title</span>,
  },
  {
    accessorFn: (row) => row.production_budget,
    enableSorting: true,
    id: "production_budget",
    cell: (info) =>
      millify(info.getValue() as number, {
        decimalSeparator: ".",
        precision: 2,
      }),
    header: () => <span>production_budget </span>,
  },
  {
    accessorFn: (row) => row.domestic_box_office,
    enableSorting: true,
    id: "domestic_box_office",
    cell: (info) =>
      millify(info.getValue() as number, {
        decimalSeparator: ".",
        precision: 2,
      }),
    header: () => <span>domestic_box_office</span>,
  },
  {
    accessorFn: (row) => row.movie_duration,
    enableSorting: true,
    id: "movie_duration",
    cell: (info) => +info.getValue()! / 1000000,
    header: () => <span>movie_duration</span>,
  },
  {
    accessorFn: (row) => row.release_date,
    enableSorting: true,
    id: "release_date",
    cell: (info) => info.getValue()!,
    header: () => <span>release_date</span>,
  },
  {
    accessorFn: (row) => row.tomato_meter,
    enableSorting: true,
    id: "tomato_meter",
    cell: (info) => +info.getValue()!,
    header: () => <span>tomato_meter</span>,
  },

  {
    accessorFn: (row) => row.audience_score,
    enableSorting: true,
    id: "audience_score",
    cell: (info) => +info.getValue()! / 1000,
    header: () => <span>audience_score</span>,
  },
];

export default Top500;

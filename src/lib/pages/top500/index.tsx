import { Box, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import BarGraph from "lib/components/charts/BarGraph";
import { Top500Type } from "pages/top500";
import TableBox from "lib/components/charts/TableBox";
import { box_office } from "@prisma/client";
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

const Top500 = ({ data: { top500 } }: Top500Type): JSX.Element => {
  return (
    <>
      <NextSeo title={`Revenue`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title={`Revenue`}>
          {`
This section contains revenue information of the top 500 movies in terms of worldwide sales.
          `}
        </HeaderSection>

        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={top500?.top500Info?._sum?.worldwidebox_office ?? ""}
            comment={"according total sale"}
            title={`Sum Top 500 Worldwidebox Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._sum.domesticbox_office ?? ""}
            comment={"according total sale"}
            title={`Sum Top 500 Domestic Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._sum.international_box ?? ""}
            comment={"according total sale"}
            title={`Sum Top 500 International Box Office`}
            status="inc"
            unit={"$"}
          />
        </SimpleGrid>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={top500.top500Info._avg.worldwidebox_office ?? ""}
            comment={"according total sale"}
            title={`Average Top 500 Worldwidebox Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._avg.domesticbox_office ?? ""}
            comment={"according total sale"}
            title={`Average Top 500 Domestic Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._avg.international_box ?? ""}
            comment={"according total sale"}
            title={`Average Top 500 International Box Office`}
            status="inc"
            unit={"$"}
          />
        </SimpleGrid>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 3 }}
        >
          <StatsCard
            stat={top500.top500Info._max.worldwidebox_office ?? ""}
            comment={"according total sale"}
            title={`Max Top 500 Worldwidebox Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._max.domesticbox_office ?? ""}
            comment={"according total sale"}
            title={`Max Top 500 Domestic Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._max.international_box ?? ""}
            comment={"according total sale"}
            title={`Max Top 500 International Box Office`}
            status="inc"
            unit={"$"}
          />
        </SimpleGrid>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <StatsCard
            stat={top500.top500Info._min.worldwidebox_office ?? ""}
            comment={"according total sale"}
            title={`Min Top 500 Worldwidebox Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._min.domesticbox_office ?? ""}
            comment={"according total sale"}
            title={`Min Top 500 Domestic Box Office`}
            status="inc"
            unit={"$"}
          />
          <StatsCard
            stat={top500.top500Info._min.international_box ?? ""}
            comment={"according total sale"}
            title={`Min Top 500 International Box Office`}
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
          <HeaderSection title="Revenue of Top 500 Movies">{``}</HeaderSection>

          <TableBox
            customHeaderColor={colors[2]}
            title={"Revenue of Top 500 Movies"}
            baseSpan={3}
            tablePageSize={10}
            modalInfo={``}
            data={top500.top500Table}
            columnsDef={colDef}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

const colDef: ColumnDef<box_office>[] = [
  {
    accessorFn: (row) => row.rank,
    enableSorting: true,
    id: "rank",
    cell: (info) => info.getValue(),
    header: () => <span>rank</span>,
  },
  {
    accessorFn: (row) => row.movie,
    enableSorting: true,
    id: "movie",
    cell: (info) => info.getValue(),
    header: () => <span>movie</span>,
  },
  {
    accessorFn: (row) => row.year,
    enableSorting: true,
    id: "year",
    cell: (info) => info.getValue(),
    header: () => <span>year</span>,
  },
  {
    accessorFn: (row) => row.domesticbox_office,
    enableSorting: true,
    id: "domesticbox_office",
    cell: (info) =>
      millify(info.getValue() as number, {
        decimalSeparator: ".",
      }),
    header: () => <span>domesticbox_office</span>,
  },
  {
    accessorFn: (row) => row.international_box,
    enableSorting: true,
    id: "international_box",
    cell: (info) =>
      millify(info.getValue() as number, {
        decimalSeparator: ".",
      }),
    header: () => <span>international_box</span>,
  },
  {
    accessorFn: (row) => row.worldwidebox_office,
    enableSorting: true,
    id: "worldwidebox_office",
    cell: (info) =>
      millify(info.getValue() as number, {
        decimalSeparator: ".",
      }),
    header: () => <span>worldwidebox_office</span>,
  },
];

export default Top500;

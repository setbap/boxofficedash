import { Box, SimpleGrid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import CompanyLinkBox from "lib/components/basic/LinkBox";
import { FaAmazon, FaGoogle } from "react-icons/fa";
import { BsApple, BsFacebook } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";

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

const Home = (): JSX.Element => {
  return (
    <>
      <NextSeo title={`Box Office`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"5"}
          columns={{ base: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 3, lg: 4 }}
        >
          <HeaderSection title={`Box Office`}>
            {`

`}
          </HeaderSection>
          <HeaderSection title={`DataSets`}>
            {`

1. The 'All Time Worldwide Box Office' dataset from Kaggle provides an extensive overview of the highest grossing films worldwide. This dataset contains information on over 4,000 movies released between 1920 and 2020, including their title, release year, production company/studio name and total box office revenue. All data is sourced from reliable sources such as IMDb and Box Office Mojo for accuracy. The data can be used for a variety of purposes such as analyzing trends in movie genres or predicting which movies will have the most success at the box office before they are released.

  

2. The Marvel Cinematic Universe Box Office Dataset from Kaggle is a comprehensive collection of data on the box office performance of all films released in the Marvel Cinematic Universe (MCU). This dataset includes information such as domestic and international gross, opening weekend numbers, release date, production budget and more. With this dataset you can analyze trends across MCU releases to gain insights into how different factors affect its success at the box office.
`}
          </HeaderSection>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;

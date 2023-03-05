import Year from "lib/pages/year";
import { getTotalData } from "lib/requests/home";

export async function getStaticProps() {
  const { years, data } = await getTotalData();
  return {
    props: {
      data: {
        totalData: data,
        years,
      },
    },
    revalidate: 10 * 60,
  };
}
export default Year;
export type YearType = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];

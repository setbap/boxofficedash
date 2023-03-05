import Years from "lib/pages/years";
import { getYearlyInfo } from "lib/requests/home";

export async function getStaticProps() {
  const yearInfo = await getYearlyInfo();
  return {
    props: {
      data: {
        yearInfo,
      },
    },
    revalidate: 10 * 60,
  };
}
export default Years;
export type YearsType = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];

import Top500 from "lib/pages/top500";
import { getTop500 } from "lib/requests/home";

export async function getStaticProps() {
  const [top500] = await Promise.all([getTop500()]);
  return {
    props: {
      data: {
        top500: top500,
      },
    },
    revalidate: 10 * 60,
  };
}
export default Top500;

export type Top500Type = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];

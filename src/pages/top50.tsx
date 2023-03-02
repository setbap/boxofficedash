import Top50 from "lib/pages/top50";
import { getTop50 } from "lib/requests/home";

export async function getStaticProps() {
  const [top50] = await Promise.all([getTop50()]);
  return {
    props: {
      data: {
        top50: top50,
      },
    },
    revalidate: 10 * 60,
  };
}
export default Top50;

export type Top50Type = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];

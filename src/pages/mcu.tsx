import Mcu from "lib/pages/mcu";
import { mcuData } from "lib/requests/mcu";

export async function getStaticProps() {
  const data = await mcuData();
  return {
    props: {
      data,
    },
    revalidate: 10 * 60,
  };
}
export default Mcu;
export type McuType = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];

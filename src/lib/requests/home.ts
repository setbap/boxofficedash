import { Prisma, PrismaClient, box_office } from "@prisma/client";
import prisma from "lib/requests/prisma";

export const getTop50 = async () => {
  const first50Worldwide = await prisma.box_office.findMany({
    orderBy: {
      worldwidebox_office: "desc",
    },
    take: 50,
  });

  const first50Domestic = await prisma.box_office.findMany({
    orderBy: {
      domesticbox_office: "desc",
    },
    take: 50,
  });

  const first50International = await prisma.box_office.findMany({
    orderBy: {
      international_box: "desc",
    },
    take: 50,
  });

  const top50Info = await prisma.box_office.aggregate({
    _avg: {
      domesticbox_office: true,
      worldwidebox_office: true,
      international_box: true
    },
    _sum: {
      domesticbox_office: true,
      worldwidebox_office: true,
      international_box: true
    },
    orderBy: {
      rank: "asc",
    },
    take: 50,
  });

  return {
    top50Info,
    first50Worldwide: first50Worldwide.sort(
      (a, b) => a.worldwidebox_office - b.worldwidebox_office
    ),
    first50Domestic: first50Domestic.sort(
      (a, b) => a.domesticbox_office - b.domesticbox_office
    ),
    first50International: first50International.sort(
      (a, b) => a.international_box - b.international_box
    ),
  };
};

export const getTop500 = async () => {
  const top500Table = await prisma.box_office.findMany({
    where: {
      rank: {
        lte: 500
      }
    }
  })

  const top500Info = await prisma.box_office.aggregate({
    _avg: {
      domesticbox_office: true,
      worldwidebox_office: true,
      international_box: true
    },
    _sum: {
      domesticbox_office: true,
      worldwidebox_office: true,
      international_box: true
    },
    _min: {
      domesticbox_office: true,
      worldwidebox_office: true,
      international_box: true
    },
    _max: {
      domesticbox_office: true,
      worldwidebox_office: true,
      international_box: true
    },
    where: {
      rank: {
        lte: 500
      }
    }
  })

  return { top500Info, top500Table }
}
// export const getMonthlyVolume = async (company: string = "Facebook") => {
//   const data: MonthlyVolume[] = await prisma.$queryRaw`
//  	SELECT
// 		company,
// 		avg(volume) as "average volume",
// 		min(volume) as "min volume",
// 		max(volume) as "max volume",
// 		sum(volume) as "Total Volume",
// 		strftime ('%Y',date) AS year,
// 		strftime ('%m',date) AS month,
//     printf('%s-%s',strftime ('%Y',date),strftime ('%m',date)) as "yearMonth"
// 	from faang
//   where company=${company}
// 	GROUP BY
// 		company,
// 		year,
// 		month

// 	ORDER BY
// 		date,
// 		company`;
//   return {
//     data, companies: ['Facebook', 'Apple', 'Amazon', 'Netflix', 'Google'], monthlyInfoKey: [
//       "max volume",
//       "average volume",
//       "min volume",
//     ]
//   }
// }

export const getYearlyInfo = async () => {
  const first50WorldwideTemp = await prisma.box_office.groupBy({
    by: ["year"],
    _sum: {
      domesticbox_office: true,
      international_box: true,
      worldwidebox_office: true,
    },
    _count: {
      movie: true,
    },
    _avg: {
      domesticbox_office: true,
      international_box: true,
      worldwidebox_office: true,
    },
    _max: {
      domesticbox_office: true,
      international_box: true,
      worldwidebox_office: true,
    },
  });

  const first50Worldwide = first50WorldwideTemp.map(y => ({
    year: y.year,
    count: y._count.movie,
    domesticbox_office_sum: y._sum.domesticbox_office,
    international_box_sum: y._sum.international_box,
    worldwidebox_office_sum: y._sum.worldwidebox_office,
    domesticbox_office_avg: y._avg.domesticbox_office,
    international_box_avg: y._avg.international_box,
    worldwidebox_office_avg: y._avg.worldwidebox_office,
    domesticbox_office_max: y._max.domesticbox_office,
    international_box_max: y._max.international_box,
    worldwidebox_office_max: y._max.worldwidebox_office,
  }))


  return { first50Worldwide };
};

import { Prisma, PrismaClient, box_office } from "@prisma/client";
import prisma from "lib/requests/prisma";

export const mcuData = async () => {
  const allData = await prisma.mcu.findMany();
  const allDataSummerize = await prisma.mcu.aggregate({
    _avg: {
      'tomato_meter': true,
      production_budget: true,
      domestic_box_office: true,
      movie_duration: true,

    }
  });
  const dataByPhaseComplex = await prisma.mcu.groupBy({
    by: ['mcu_phase'],
    _count: {
      '_all': true
    },
    _sum: {
      'domestic_box_office': true,
    },
    _avg: {
      'audience_score': true,
      domestic_box_office: true,
      movie_duration: true,
      production_budget: true,
      tomato_meter: true,
    }
  })
  const dataByPhase = dataByPhaseComplex.map(phase => ({
    avg_audience_score: phase._avg.audience_score,
    avg_domestic_box_office: phase._avg.domestic_box_office,
    avg_movie_duration: phase._avg.movie_duration,
    avg_production_budget: phase._avg.production_budget,
    avg_tomato_meter: phase._avg.tomato_meter,
    sum_domestic_box_office: phase._sum.domestic_box_office,
    count: phase._count._all,
    phase: phase.mcu_phase
  }))

  return { allData, dataByPhase, allDataSummerize }
};

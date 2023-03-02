import prisma from "./prisma"

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
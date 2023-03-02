import prisma from "lib/requests/prisma"



export const getDayWithMaxVolume = async (year: number = 2020) => {
	const yearMovies = await prisma.box_office.findMany({
		where: {
			year
		},
	});
	const yearInfo = await prisma.box_office.aggregate({
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
		_sum: {
			domesticbox_office: true,
			international_box: true,
			worldwidebox_office: true,
		},
		where: {
			year
		},
	});
	return { yearInfo, yearMovies }
}




export const getMonthlyCandleInfo = async (company: string = "Facebook") => {
	const queryRes: CandlePureInfo[] = await prisma.$queryRaw`
WITH end_month_data AS (
	SELECT
		company,
		close,
		strftime ('%Y',
			date) AS year,
		strftime ('%m',
			date) AS month
	FROM
		faang
	GROUP BY
		company,
		year,
		month
	HAVING
		date = max(date)
	ORDER BY
		date,
		company
),
start_month_data AS (
	SELECT
		company,
		open,
		strftime ('%Y',
			date) AS year,
		strftime ('%m',
			date) AS month
	FROM
		faang
	GROUP BY
		company,
		year,
		month
	HAVING
		date = min(date)
	ORDER BY
		date,
		company
) , month_data AS (
	SELECT
		company,		
		max(high) as "high",
		min(low) as "low",
		strftime ('%Y',
			date) AS year,
		strftime ('%m',
			date) AS month
	FROM
		faang
	GROUP BY
		company,
		year,
		month
	
	ORDER BY
		date,
		company
) select 
	a.company,
	a.year,
	a.month,
  printf('%s-%s',a.year,a.month) as "yearMonth",
	low,
	open,
	close,
	high
  from start_month_data a , end_month_data b, month_data c
  where 
  	a.year = b.year and
  	c.year = b.year and 
  	c.month = b.month and
  	a.month = b.month and
    a.company = ${company} and
  	a.company = b.company and
  	b.company = c.company 
    
  order by 
  	a.company, a.year , a.month;
  `;

	const data = queryRes.filter(row => row.year > 2011 && row.year < 2020).map(({ close, high, low, open, yearMonth }) => [yearMonth, low, open, close, high]);
	data.unshift(["Month", company, "", "", ""],);
	return {
		data
	}
}

export interface CandlePureInfo {
	"company": string,
	"year": number,
	"month": number,
	yearMonth: string,
	low: number;
	open: number;
	close: number;
	high: number;
}
import { NextRequest, NextResponse } from "next/server";
import { jobGeoValues, industryValues } from "@/libs/filters";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const jobGeoParam = url.searchParams.get("geo");
  const industryParam = url.searchParams.get("industry");

  const params = new URLSearchParams();

  if (jobGeoParam) {
    if (!jobGeoValues.includes(jobGeoParam)) {
      return NextResponse.json(
        { error: `Invalid geo value: ${jobGeoParam}` },
        { status: 400 }
      );
    }
    params.append("geo", jobGeoParam);
  }

  if (industryParam) {
    if (!industryValues.includes(industryParam)) {
      return NextResponse.json(
        { error: `Invalid industry value: ${industryParam}` },
        { status: 400 }
      );
    }
    params.append("industry", industryParam);
  }

  const queryString = params.toString();

  //Probably would put this url in an ENV variable, but for this task I will keep it here
  const fetchUrl = `https://jobicy.com/api/v2/remote-jobs?${queryString}`;

  try {
    const res = await fetch(fetchUrl);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const results = await res.json();

    if (!results.success || !Array.isArray(results.jobs)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(results.jobs);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

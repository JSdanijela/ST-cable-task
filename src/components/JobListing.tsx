"use client";
import { useMemo } from "react";
import { Job, JobListingProps } from "../types/jobs";
import JobCard from "../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jobGeoValues, industryValues } from "@/libs/filters";
import { SkeletonJobCards } from "./Skeletons";

export default function JobListing({
  initialJobGeo = "",
  initialIndustry = "",
}: JobListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter state
  const [jobGeo, setJobGeo] = useState(
    initialJobGeo || searchParams.get("geo") || ""
  );
  const [industry, setIndustry] = useState(
    initialIndustry || searchParams.get("industry") || ""
  );

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (jobGeo) params.set("geo", jobGeo);
    if (industry) params.set("industry", industry);
    router.push(`?${params.toString()}`);
  }, [jobGeo, industry, router]);

  // Handle Reset
  function handleReset() {
    setJobGeo("");
    setIndustry("");
    router.push("/");
  }

  // Fetch jobs
  async function fetchJobs(): Promise<Job[]> {
    const params = new URLSearchParams();
    if (jobGeo) params.append("geo", jobGeo);
    if (industry) params.append("industry", industry);

    const res = await fetch(`/api/jobs?${params.toString()}`);

    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  }

  const {
    data: jobs,
    isLoading,
    isError,
    refetch,
  } = useQuery<Job[], Error>({
    queryKey: ["jobs", jobGeo, industry],
    queryFn: fetchJobs as () => Promise<Job[]>,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Calculate decorations
  const totalJobs = jobs?.length || 0;

  const decorations = useMemo(() => {
    const trending = new Set<number>();
    const recommended = new Set<number>();

    // Assign badges randomly (mutually exclusive)
    for (let i = 0; i < totalJobs; i++) {
      const rand = Math.random();
      if (rand > 0.9) {
        trending.add(i);
      } else if (rand > 0.8 && rand <= 0.9) {
        recommended.add(i);
      }
    }

    return { trending, recommended };
  }, [totalJobs]);

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonJobCards />;
    }

    const isErrorOrEmpty = isError || (jobs !== undefined && jobs.length === 0);

    const contentWrapperClass = `w-full min-h-[150vh] ${
      isErrorOrEmpty ? "bg-white" : ""
    }`;

    return (
      <div className={contentWrapperClass}>
        <div className="mx-auto px-6 py-10 font-sans max-w-[1280px]">
          {isError ? (
            <div className="min-h-[50vh] w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 font-semibold mb-4">
                  Failed to load jobs.
                </p>
                <button
                  onClick={() => refetch()}
                  className="mx-auto block bg-red-50 text-red-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : jobs?.length === 0 ? (
            <div className="min-h-[50vh] w-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-5">
                  Sorry, no jobs available
                </p>
                <button
                  onClick={() => refetch()}
                  className="mx-auto bg-gray-100 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Reload
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center w-full">
              {jobs?.map((job: Job, index: number) => (
                <JobCard
                  key={job.id}
                  data={job}
                  isTrending={decorations.trending.has(index)}
                  isRecommended={decorations.recommended.has(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white">
        <div className="mx-auto px-6 pt-8 font-sans max-w-[1280px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-[1280px]">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-2.5 min-w-[240px]">
                <label
                  htmlFor="location"
                  className="text-[12px] font-normal text-gray-600"
                >
                  Company location:
                </label>
                <select
                  id="location"
                  className="w-full h-[36px] appearance-none bg-white border border-gray-200 rounded-xl px-2 text-sm font-medium text-gray-900 cursor-pointer"
                  value={jobGeo}
                  onChange={(e) => setJobGeo(e.target.value)}
                >
                  <option className="h-[36px]" value="">
                    Worldwide
                  </option>
                  {jobGeoValues.map((g) => (
                    <option className="h-[36px]" key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2.5 min-w-[240px]">
                <label
                  htmlFor="industry"
                  className="text-[12px] font-normal text-gray-600"
                >
                  Industries:
                </label>
                <select
                  id="industry"
                  className="w-full h-[36px] appearance-none bg-white border border-gray-200 rounded-xl px-2 text-sm font-medium text-gray-900 cursor-pointer"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option className="h-[36px]" value="">
                    All industries
                  </option>
                  {industryValues.map((indValue) => (
                    <option
                      className="h-[36px]"
                      key={indValue}
                      value={indValue}
                    >
                      {indValue.charAt(0).toUpperCase() +
                        indValue.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end h-[48px] w-full md:w-auto">
              <button
                onClick={handleReset}
                className="bg-transparent border-none text-black text-sm font-medium leading-tight tracking-normal cursor-pointer px-4 hover:underline transition-all align-middle font-sans"
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

import JobListing from "../components/JobListing";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const initialJobGeo =
    typeof resolvedParams.geo === "string" ? resolvedParams.geo : "";
  const initialIndustry =
    typeof resolvedParams.industry === "string" ? resolvedParams.industry : "";

  return (
    <div
      id="job-listings"
      className="text-black min-h-screen flex items-start justify-center font-sans"
    >
      <JobListing
        initialJobGeo={initialJobGeo}
        initialIndustry={initialIndustry}
      />
    </div>
  );
}

import JobCard from "./JobCard";

export const SkeletonJobCards = () => {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="mx-auto px-6 py-10 font-sans max-w-[1280px]">
        <div className="flex flex-wrap gap-4 justify-center">
          {[...Array(12)].map((_, index) => (
            <JobCard key={index} data={null} />
          ))}
        </div>
      </div>
    </div>
  );
};

import { JobItemProps } from "../types/jobs";
import Image from "next/image";
import he from "he";

export default function JobCard({
  data,
  isTrending,
  isRecommended,
}: JobItemProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-[14px] p-4 md:p-6 flex flex-col relative w-[328px] h-[372px] md:w-[296px] md:h-[388px] border border-gray-100 pointer-events-none box-content md:box-border">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-[14px] bg-gray-100 relative overflow-hidden animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <div className="h-6 w-4/5 bg-gray-100 rounded mb-2 animate-pulse" />
            <div className="h-4 w-2/5 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-6 w-12 bg-gray-100 rounded-md animate-pulse" />
            <div className="h-6 w-20 bg-gray-100 rounded-md animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-3/5 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
        <div className="mt-4">
          <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  // Determine highlight style
  const isHighlighted = isTrending || isRecommended;

  // Determine background style
  const getCardStyle = () => {
    if (isHighlighted) {
      return "bg-gradient-to-b from-[#008CFF] to-[#3605FB] text-white";
    }
    return "bg-white border-neutral-200";
  };

  const tagClassName = `text-[12px] rounded-full font-medium inline-flex items-center justify-center transition-colors box-border ${
    isHighlighted
      ? "h-[20px] px-3 gap-[4px] bg-badge-bg border-t border-badge-border text-badge-text"
      : "h-5 px-2 py-0.5 gap-1 bg-white text-neutral-600 border border-[#E5E7EB]"
  }`;

  return (
    <div
      className={`
      rounded-[14px] p-4 md:p-6 flex flex-col relative w-[328px] h-[372px] md:w-[296px] md:h-[388px] transition-all 
      hover:-translate-y-1 
      ${!isHighlighted ? "border" : ""}
      ${
        isHighlighted
          ? "hover:shadow-[0_20px_25px_-5px_rgba(54,5,251,0.4)]"
          : "hover:shadow-xl"
      }
      ${getCardStyle()}
      box-content md:box-border
    `}
    >
      {/* Trending or Recommended badge */}
      {isTrending && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white  z-10 text-gray-900">
          <span>😎</span>
          <span>Trending</span>
        </div>
      )}
      {isRecommended && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white  z-10 text-gray-900">
          <span>😎</span>
          <span>Recommended</span>
        </div>
      )}

      {/* Logo */}
      <div className="mb-4">
        <div
          className={`w-12 h-12 rounded-[14px] overflow-hidden flex items-center justify-center ${
            isHighlighted ? "bg-white/20" : "bg-gray-50"
          }`}
        >
          {data.companyLogo ? (
            <Image
              loading="lazy"
              src={data.companyLogo}
              alt={`${data.companyName} logo`}
              height={48}
              width={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:8px_8px]" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <h3
            className={`text-lg font-bold leading-tight tracking-normal line-clamp-2 mb-2 ${
              isHighlighted ? "text-white" : "text-black"
            }`}
          >
            {he.decode(he.decode(data.jobTitle))}
          </h3>
          <div
            className={`text-sm font-semibold leading-normal tracking-normal ${
              isHighlighted ? "text-white/80" : "text-neutral-500"
            }`}
          >
            {he.decode(he.decode(data.companyName))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 max-h-[44px] overflow-hidden">
          {/* Limit to only 2 rows of tags */}
          {data.jobType?.map((t) => (
            <span key={t} className={tagClassName}>
              {he.decode(he.decode(t))}
            </span>
          ))}
          {data.jobGeo &&
            data.jobGeo.split(",").map((geo, index) => (
              <span key={index} className={tagClassName}>
                {he.decode(he.decode(geo.trim()))}
              </span>
            ))}
          {data.jobLevel && (
            <span className={tagClassName}>
              {he.decode(he.decode(data.jobLevel))}
            </span>
          )}
          {data.jobIndustry?.slice(0, 2).map((ind) => (
            <span key={ind} className={tagClassName}>
              {he.decode(he.decode(ind))}
            </span>
          ))}
        </div>

        {/* Description */}
        <div
          className={`text-sm leading-relaxed line-clamp-3 ${
            isHighlighted ? "text-white/90" : "text-black"
          }`}
          dangerouslySetInnerHTML={{
            __html: he.decode(he.decode(data.jobExcerpt)),
          }}
        />
      </div>

      <div className="mt-4 flex justify-center md:justify-end">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            inline-flex items-center justify-center w-[296px] h-10 py-2 px-6 rounded-md md:w-auto md:h-11 md:px-8 md:rounded-xl font-semibold text-sm transition-all gap-2 whitespace-nowrap
            ${
              isHighlighted
                ? "bg-white text-blue-600 hover:bg-gray-50"
                : "bg-[#2D2D2D] text-white hover:bg-black"
            }
          `}
        >
          View job
        </a>
      </div>
    </div>
  );
}

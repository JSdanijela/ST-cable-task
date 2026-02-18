import heroImage from "@/assets/hero-image.png";
import Image from "next/image";

export default function Header() {
  return (
    <main className="bg-white px-5 pt-8 pb-4 md:px-20 md:pt-15 md:pb-4">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 mb-10 md:mb-15">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 mb-5 md:mb-6 text-sm w-68 h-7 px-1 opacity-100 rounded-full border border-gray-200">
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <circle cx="3" cy="3" r="3" fill="#22C55E" />
              </svg>
              <span className="text-blue-700">Remote jobs</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">200+ new jobs today</span>
            </div>

            <h1 className="text-[36px] lg:text-[60px] font-semibold leading-[1.1] text-blue-700 tracking-tight mb-5 md:mb-0">
              Remote IT Jobs
              <br />
              Without Borders
            </h1>
          </div>
          <div className="flex flex-col justify-end items-center md:justify-self-end md:items-start text-center md:text-left">
            <p className="hidden md:flex text-lg text-gray-500 mb-6 max-w-full md:max-w-none md:pr-10">
              Work on global IT projects from anywhere.
            </p>
            <p className="flex md:hidden text-lg text-gray-500 mb-6 max-w-full md:max-w-none">
              Follow with one or two sentences that expand on your value
              proposition and focus on key benefits.
            </p>

            <a
              href="#job-listings"
              className="bg-primary text-white border-none pl-4 md:pr-6 pr-4 py-2 text-sm font-normal rounded-lg cursor-pointer transition-colors hover:bg-gray-800 inline-flex items-center justify-center gap-2 w-auto"
            >
              Discover jobs
              <svg
                className="hidden md:flex"
                width="12"
                height="16"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33164 0.664993V9.99833M5.33164 9.99833L9.99831 5.33166M5.33164 9.99833L0.664978 5.33166"
                  stroke="white"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <Image
          loading="eager"
          className="w-full aspect-video bg-neutral-100 rounded-2xl md:rounded-xl overflow-hidden"
          src={heroImage}
          alt="Footer"
        />
      </div>
    </main>
  );
}

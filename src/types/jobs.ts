export interface Job {
  id: number;
  url: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string[];
  jobType: string[];
  jobGeo: string;
  jobLevel: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
  salaryCurrency?: string;
}

export interface JobItemProps {
  data: Job | null;
  isHighlighted?: boolean;
  isTrending?: boolean;
  isRecommended?: boolean;
}

export interface JobListingProps {
  initialJobGeo?: string;
  initialIndustry?: string;
}

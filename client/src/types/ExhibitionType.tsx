export interface Info {
  totalrecordsperquery: number;
  totalrecords: number;
  pages: number;
  page: number;
  next: string;
  responsetime: string;
}
export interface Exhibition {
  objectid: number; // unique identifier for the object
  title: string;
  date?: string;
  copyright?: string;
  imageid?: number;
  idsid?: number;
  format?: string;
  description?: string | null;
  technique?: string | null;
  renditionnumber?: string;
  displayorder?: number;
  baseimageurl?: string;
  alttext?: string | null;
  width?: number;
  publiccaption?: string | null;
  iiifbaseuri?: string;
  height?: number;
  primaryimageurl?: string; // often used for displaying images
  dimensions?: string;
  // Add any other fields you use in your components
}

export interface ExhibitionData {
  info: Info;
  records: Exhibition[];
}

export interface WorkType {
  worktypeid: string;
  worktype: string;
}
export interface SeeAlso {
  id: string;
  type: string;
  format: string;
  profile: string;
}

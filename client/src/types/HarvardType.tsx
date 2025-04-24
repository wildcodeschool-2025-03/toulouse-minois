export interface Info {
  totalrecordsperquery: number;
  totalrecords: number;
  pages: number;
  page: number;
  next: string;
  responsetime: string;
}

export interface Image {
  date: string;
  copyright: string;
  imageid: number;
  idsid: number;
  format: string;
  description: string | null;
  technique: string | null;
  renditionnumber: string;
  displayorder: number;
  baseimageurl: string;
  alttext: string | null;
  width: number;
  publiccaption: string | null;
  iiifbaseuri: string;
  height: number;
}

export interface WorkType {
  worktypeid: string;
  worktype: string;
}

export interface Color {
  color: string;
  spectrum: string;
  hue: string;
  percent: number;
  css3: string;
}

export interface Person {
  role: string;
  birthplace: string | null;
  gender: string;
  displaydate: string | null;
  prefix: string | null;
  culture: string | null;
  displayname: string;
  alphasort: string;
  name: string;
  personid: number;
  deathplace: string | null;
  displayorder: number;
}

export interface SeeAlso {
  id: string;
  type: string;
  format: string;
  profile: string;
}

export interface Record {
  copyright: string | null;
  contextualtextcount: number;
  creditline: string;
  accesslevel: number;
  createdate: string;
  dateoflastpageview: string;
  classificationid: number;
  division: string;
  markscount: number;
  publicationcount: number;
  totaluniquepageviews: number;
  contact: string;
  colorcount: number;
  rank: number;
  id: number;
  state: string | null;
  verificationleveldescription: string;
  period: string | null;
  images?: Image[];
  worktypes?: WorkType[];
  imagecount: number;
  totalpageviews: number;
  accessionyear: number;
  standardreferencenumber: string | null;
  signed: string | null;
  classification: string;
  relatedcount: number;
  verificationlevel: number;
  primaryimageurl: string;
  titlescount: number;
  peoplecount: number;
  style: string | null;
  lastupdate: string;
  commentary: string | null;
  periodid: string | null;
  technique: string | null;
  edition: string | null;
  description: string | null;
  medium: string | null;
  lendingpermissionlevel: number;
  title: string;
  accessionmethod: string;
  colors?: Color[];
  provenance: string | null;
  groupcount: number;
  dated: string;
  department: string;
  dateend: number | null;
  people?: Person[];
  url: string;
  dateoffirstpageview: string;
  century: string | null;
  objectnumber: string;
  labeltext: string | null;
  datebegin: number | null;
  culture: string | null;
  exhibitioncount: number;
  imagepermissionlevel: number;
  mediacount: number;
  objectid: number;
  techniqueid: number | null;
  dimensions: string | null;
  seeAlso?: SeeAlso[];
  details?: {
    technical?: [{ text?: string; formattedtext?: string; type?: string }];
  }; //optional property
}

export interface ApiResponse {
  info: Info;
  records: Record[];
}

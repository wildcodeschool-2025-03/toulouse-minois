import type { Record } from "./HarvardType.tsx";

export interface CategoryOptions {
  category: (string | null | undefined)[];
  classification?: (string | null | undefined)[];
  artist?: (string | null | undefined)[];
  century?: (string | null | undefined)[];
  medium?: (string | null | undefined)[];
  culture?: (string | null | undefined)[];
  [key: string]: (string | null | undefined)[] | undefined;
}

export interface FilterGalleryProps {
  artMemo: Record[];
}

export interface CheckboxStates {
  [key: string]: boolean;
}

export interface MonComposantProps {
  checkboxLabels: string[];
}

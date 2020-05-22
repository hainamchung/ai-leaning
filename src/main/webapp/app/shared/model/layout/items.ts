interface IDropdownItem {
  link?: string;
  icon?: string;
  iconSmall?: string;
  label: string;
  value?: any;
  text?: string;
  selectAction?: (value) => void;
}
interface IPagingItem {
  label?: string;
  value: number;
}

interface IRouteItem {
  path: string;
  icon: string;
  label: string;
  splitContent?: boolean;
  badge?: number;
  disable?: boolean;
}

interface ISelectItem {
  label: string;
  value: string;
  image?: string;
  priority?: number;
  isEntry?: boolean;
  type?: number;
  code?: string;
  nextSteps?: string[];
  selectionStatus?: string[];
  availableCurrentSteps?: string[];
  isInternal?: boolean;
}

export { IPagingItem, IDropdownItem, IRouteItem, ISelectItem };

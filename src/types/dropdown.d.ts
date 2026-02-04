export type Option = { label: string; value: string };

export type Options = {
  title?: string;
  type?: string;
  groupKey?: string;
  options: Option[];
  children?: Options[];
};

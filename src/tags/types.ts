export interface ITag {
  _id: string;
  type: string;
  name: string;
  colorCode: string;
  objectCount?: number;
  order?: string;
  parentId?: string;
}

export interface Comment {
  key?: string;
  uid: string;
  content: string;
  date: number;
  like?: string[];
  unlike?: string[];
}

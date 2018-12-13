import {Feedback} from './feedback';
import {Comment} from './comment';

export interface Post {
  key?: string;
  title: string;
  content: string;
  uid: string;
  expired: number;
  category: string;
  like?: string[];
  unlike?: string[];
  feedback?: Feedback;
  comments?: Comment[];
}

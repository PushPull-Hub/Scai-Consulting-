type Liker = { id: string };
export class Post extends Object {
  userId: string;
  postId: string;
  created_time: any;
  text: string;
  description: string;
  comments: Array<{ commenterId: string; comment: string }>;
  likes: Liker[];
  image: [];
  can_reply: boolean;
  can_share: boolean;
  is_hidden: boolean;
  location: string;
}
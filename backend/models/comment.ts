export interface Comment {
  id: string;
  userId: string;
  header: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

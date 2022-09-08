export default interface Task {
  category: string;
  title: string;
  details: string;
  location: string;
  budget: number;
  date: string;
  photos: File;
  timeOfArrival: string;
  timeEstimate: string;
}

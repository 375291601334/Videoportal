export interface ICourse {
  id: string;
  title: string;
  date: Date;
  description: string;
  duration: number;
  authors: { id: string, name: string }[];
  topRated: boolean;
}

export class Course implements ICourse {
  id: string;
  title: string;
  date: Date;
  description: string;
  duration: number;
  authors: { id: string, name: string }[];
  topRated: boolean;

  constructor(
    id: string,
    title: string,
    date: Date,
    description: string,
    duration: number,
    topRated: boolean = false,
    authors: { id: string, name: string }[] = [],
  ) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.description = description;
    this.duration = duration;
    this.topRated = topRated;
    this.authors = authors;
  }
}

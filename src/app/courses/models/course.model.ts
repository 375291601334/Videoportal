export interface ICourse {
  id: string;
  title: string;
  date: Date;
  description: string;
  duration: number;
}

export class Course implements ICourse {
  id: string;
  title: string;
  date: Date;
  description: string;
  duration: number;

  constructor(id: string, title: string, date: Date, description: string, duration: number) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.description = description;
    this.duration = duration;
  }
}

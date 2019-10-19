import { Component, OnInit, Input } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }
}

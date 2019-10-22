import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;

  @Output() deleteCourse = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onEdit() {
    console.log('Edit');
  }

  onDelete() {
    console.log('Delete');

    this.deleteCourse.emit(this.course.id);
  }
}

import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ICourse } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input() course: ICourse;

  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  constructor() {}

  onEdit() {
    this.editCourse.emit(this.course);
  }

  onDelete() {
    this.deleteCourse.emit(this.course);
  }
}

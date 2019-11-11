import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
 } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() course: Course;

  @Output() deleteCourse = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    console.log('OnDestroy');
  }

  ngOnChanges() {
    console.log('OnChanges');
  }

  onEdit() {
    console.log('Edit');
  }

  onDelete() {
    console.log('Delete');

    this.deleteCourse.emit(this.course.id);
  }
}

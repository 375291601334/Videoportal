import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ICourse } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent implements OnInit {
  currentLang: string;

  @Input() course: ICourse;

  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();

  constructor(
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang;
  }

  onEdit() {
    this.editCourse.emit(this.course.id);
  }

  onDelete() {
    this.deleteCourse.emit(this.course);
  }
}

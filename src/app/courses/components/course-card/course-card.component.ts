import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  DoCheck,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  OnDestroy,
 } from '@angular/core';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit,OnChanges, DoCheck, AfterViewInit,
  AfterViewChecked, AfterContentInit, AfterContentChecked, OnDestroy {
  @Input() course: Course;

  @Output() deleteCourse = new EventEmitter<string>();

  constructor() {
    console.log('Constructor');
  }

  ngOnInit() {
    console.log('OnInit');
  }

  ngOnDestroy() {
    console.log('OnDestroy');
  }

  ngOnChanges() {
    console.log('OnChanges');
  }

  ngDoCheck() {
    console.log('DoCheck');
  }

  ngAfterContentInit() {
    console.log('AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked');
  }

  onEdit() {
    console.log('Edit');
  }

  onDelete() {
    console.log('Delete');

    this.deleteCourse.emit(this.course.id);
  }
}

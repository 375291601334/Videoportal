import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

const initialState = {
  courses: {
    isCoursesFetched: false,
    start: 0,
    count: 4,
    sort: '',
    textFragment: '',
    authors: [],
    items: [],
  },
};

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule],
      providers: provideMockStore({ initialState }),
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change search term once clicking Search', () => {
    component.searchTearm = 'test';

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(component.searchTearm).toEqual('test');
  });
});

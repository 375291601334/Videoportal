import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

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

  it('should not change search term once typing less than 3 chars', fakeAsync(() => {
    component.searchTearm = '';

    component.onChangeSearchTerm('te');
    tick(2100);
    fixture.detectChanges();

    expect(component.searchTearm).toEqual('');
  }));

  it('should change search term once typing more than 2 chars', fakeAsync(() => {
    component.searchTearm = '';

    component.onChangeSearchTerm('test');
    tick(2100);
    fixture.detectChanges();

    expect(component.searchTearm).toEqual('test');
  }));
});

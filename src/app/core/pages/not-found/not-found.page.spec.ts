import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { NotFoundPageComponent } from './not-found.page';

class MockRouter {
  navigate() {}
}

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundPageComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
      ],
      imports: [
        TranslateTestingModule
          .withTranslations('en', require('../../../../assets/i18n/en.json'))
          .withTranslations('ru', require('../../../../assets/i18n/ru.json')),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to courses page once clicking Home button', () => {
    spyOn(router, 'navigate');

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});

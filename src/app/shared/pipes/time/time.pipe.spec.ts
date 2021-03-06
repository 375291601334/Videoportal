import { inject, TestBed, async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { TimePipe } from './time.pipe';

class MockTranslateService {
  instant(value: string) {
    return value;
  }
}

describe('TimePipe', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useClass: MockTranslateService}],
    })
    .compileComponents();
  }));

  it('create an instance', inject([TranslateService], (translate: TranslateService) => {
    const pipe = new TimePipe(translate);

    expect(pipe).toBeTruthy();
  }));

  it('should return 109h 5min', inject([TranslateService], (translate: TranslateService) => {
    const pipe = new TimePipe(translate);
    const result = pipe.transform(6545);

    expect(result).toEqual('109h 5min');
  }));

  it('should return 45 min', inject([TranslateService], (translate: TranslateService) => {
    const pipe = new TimePipe(translate);
    const result = pipe.transform(45);

    expect(result).toEqual('45min');
  }));

  it('should return 2h', inject([TranslateService], (translate: TranslateService) => {
    const pipe = new TimePipe(translate);
    const result = pipe.transform(120);

    expect(result).toEqual('2h');
  }));
});

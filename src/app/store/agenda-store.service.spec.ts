import { TestBed } from '@angular/core/testing';

import { AgendaStoreService } from './agenda-store.service';

describe('AgendaStoreService', () => {
  let service: AgendaStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BackendMessagesService } from './backend-messages.service';

describe('WebsocketService', () => {
  let service: BackendMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BackendMessengerService } from './backend-messenger.service';

describe('WebsocketService', () => {
  let service: BackendMessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendMessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

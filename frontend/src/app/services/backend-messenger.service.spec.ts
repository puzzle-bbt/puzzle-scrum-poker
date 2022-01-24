import { Subject } from 'rxjs';

import { BackendMessengerService } from './backend-messenger.service';

const callback = function() {
  console.log('This is the callback function for the Subscription');
};

describe('BackendMessengerService', () => {
  let service: BackendMessengerService;

  let fakeSocket: Subject<any>;
  const fakeSocketCtor = jasmine
    .createSpy('WEBSOCKET_CTOR')
    .and.callFake(() => fakeSocket); // need to call fake so we can keep re-assigning to fakeSocket

  beforeEach(() => {
    fakeSocket = new Subject<any>();
    spyOn(fakeSocket, 'next').and.callThrough();
    spyOn(fakeSocket, 'subscribe').and.callThrough();
    spyOn(fakeSocket, 'complete').and.callThrough();
    fakeSocketCtor.calls.reset();

    service = new BackendMessengerService(fakeSocketCtor);
  });

  it('should be created and initialize a WebSocket Subject', () => {
    expect(service).toBeTruthy();
  });

  it('should send message', () => {
    service.sendMessage('Test Send Message');
    expect(fakeSocket.next).toHaveBeenCalledOnceWith('Test Send Message');
  });

});

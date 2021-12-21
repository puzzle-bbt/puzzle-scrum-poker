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

  it('should subscribe and add this Subscrition to the wsSubscriptions Array', () => {
    expect(service.wsSubscriptions.length).toBe(0);
    service.subscribe(() => callback);
    expect(fakeSocket.subscribe).toHaveBeenCalledTimes(1);
    expect(service.wsSubscriptions.length).toBe(1);
  });

  it('should complete the subject when destroy the service', () => {
    service.subscribe(() => callback);
    service.ngOnDestroy();
    expect(fakeSocket.complete).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if zero Subscription exists', () => {
    service.ngOnDestroy();
    expect(fakeSocket.complete).not.toHaveBeenCalled();
  });
});

export default function mockStorage() {
  sessionStorage.getItem = jest.fn((): string => 'token');
  sessionStorage.setItem = jest.fn((key: string, payload: string) => {
    console.debug(`sessionStorage setItem: ${key}: ${payload}`);
  });

  sessionStorage.removeItem = jest.fn(() => {
    console.debug('sessionStorage removeItem');
  });

  sessionStorage.clear = jest.fn(() => {
    console.debug('sessionStorage clear');
  });

  localStorage.getItem = jest.fn((): string => 'token');
  localStorage.setItem = jest.fn((key: string, payload: string) => {
    console.debug(`localStorage setItem: ${key}: ${payload}`);
  });

  localStorage.removeItem = jest.fn(() => {
    console.debug('localStorage removeItem');
  });

  localStorage.clear = jest.fn(() => {
    console.debug('localStorage clear');
  });
}

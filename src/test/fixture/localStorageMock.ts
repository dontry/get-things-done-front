export default function storageMock() {
  const storage: any = {};

  return {
    setItem(key: string, value: string): void {
      storage[key] = value || "";
    },
    getItem(key: string): string {
      return key in storage ? storage[key] : null;
    },
    removeItem(key: string): void {
      delete storage[key];
    },
    get length(): number {
      return Object.keys(storage).length;
    },
    key(i: number): string | null {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

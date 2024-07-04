export function getValues<T extends object>(data: T[]): any[][] {
    return data.map(row => Object.values(row));
  }
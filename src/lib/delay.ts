export function delay<T>(ms: number, callback: () => T): Promise<T> {
  console.log('delay called with ms:', ms);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('delay timeout completed, executing callback');
      try {
        resolve(callback());
      } catch (err) {
        reject(err);
      }
    }, ms);
  });
}

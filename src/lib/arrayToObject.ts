export default function arrayToObject(array: any[]) {
  return array.reduce((acc, task) => ({
      ...acc,
      [task.id]: task
    }));
}

export default function arrayToObject(array: any[]) {
  return array.reduce((acc, task) => {
    return {
      ...acc,
      [task.id]: task
    };
  });
}

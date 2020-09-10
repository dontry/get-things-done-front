export default function mapToObject<V>(map: Map<any, V>) {
  let obj: Record<string, unknown> = {};
  for (const [key, value] of map.entries()) {
    obj = {
      ...obj,
      [key]: value
    };
  }
  return obj;
}

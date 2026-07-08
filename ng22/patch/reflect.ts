export function reflect(obj: unknown) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const target = obj as Record<string | symbol, unknown>

  return new Proxy(target, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has: (target, prop) => prop in target,
    deleteProperty: (target, prop) => delete target[prop],
    ownKeys: target => Reflect.ownKeys(target)
  });
}

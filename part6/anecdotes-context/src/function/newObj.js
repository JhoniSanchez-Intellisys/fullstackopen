export function newObj(keys) {
    let obj = {};
    for (let i = 0; i < keys; i++) {
      let key = i;
      let value = 0;
      obj[key] = value;
    }
    return obj;
  }
  
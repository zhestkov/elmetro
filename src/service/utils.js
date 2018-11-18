// @flow

export const convertUnicode = (input: string) => {
  // alternative method to convert unicode to string:
  // const signal = decodeURIComponent(
  //   JSON.parse(
  //     '"' +
  //       regInfo.DeviceInfo[chInfoArrayName][Source.Index].Name.replace(
  //         /\"/g,
  //         '\\"'
  //       ) +
  //       '"'
  //   )
  // );
  return input.replace(/\\u(\w\w\w\w)/g, (a, b) => {
    const charCode = parseInt(b, 16);
    return String.fromCharCode(charCode);
  });
};

export const deepCloneObject = obj => {
  const clone = {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i) && obj[i] != null) {
      if (Array.isArray(obj[i])) {
        clone[i] = obj[i].slice();
      } else if (typeof obj[i] === "object") {
        clone[i] = deepCloneObject(obj[i]);
      } else clone[i] = obj[i];
    }
  }
  return clone;
};

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export const countFields = (formData: any) =>
  Object.keys(formData.sections).reduce(
    (acc, section) => acc + formData.sections[section].length,
    0,
  );

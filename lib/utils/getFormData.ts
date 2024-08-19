export function getFormData(object: Record<string, any>): FormData {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined || object[key] === null) return;
    formData.append(key, object[key]);
  });
  return formData;
}

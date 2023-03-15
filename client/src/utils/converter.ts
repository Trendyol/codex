export const decodeBase64 = (base64?: string) => {
  if (!base64) return '';

  const buff = Buffer.from(base64, 'base64');
  return buff.toString('ascii');
};

export const encodeBase64 = (text?: string) => {
  if (!text) return '';

  const buff = Buffer.from(text, 'ascii');
  return buff.toString('base64');
};

export const jsonToFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};

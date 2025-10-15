export const createFileArray = (imageURLs: string[]) => {
  const filePromises = imageURLs.map(async (imageURL) => {
    const response = await fetch(imageURL);
    const blob = await response.blob();
    const fileName = imageURL.split('/').pop();
    return new File([blob], fileName as string);
  });

  return Promise.all(filePromises);
};

export const rotateImageFile = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Устанавливаем размеры canvas
        canvas.width = img.height;
        canvas.height = img.width;

        // Поворачиваем canvas на 90 градусов
        ctx?.translate(canvas.width / 2, canvas.height / 2);
        ctx?.rotate((-90 * Math.PI) / 180);
        ctx?.drawImage(img, -img.width / 2, -img.height / 2);

        // Создаем новый файл из canvas
        canvas.toBlob((blob) => {
          if (blob) {
            const rotatedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(rotatedFile);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, file.type);
      };
      img.onerror = (error) => reject(error);
      img.src = event.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

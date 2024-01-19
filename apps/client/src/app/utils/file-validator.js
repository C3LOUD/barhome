export default (files) => {
  if (files.length > 1) return { message: 'Please only upload 1 image.' };

  const file = files[0];
  const fileType = ['image/png', 'image/jpg', 'image/jpeg'];
  if (!fileType.some((type) => type === file.type)) {
    return { message: 'Please upload .png/.jpg/.jpeg file.' };
  }

  if (file.size / 1024 >= 2048) {
    return { message: 'Please upload image under 2 MB.' };
  }

  const imageSrc = URL.createObjectURL(file);
  return { imageSrc };
};

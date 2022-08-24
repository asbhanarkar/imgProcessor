import sharp from 'sharp';

// sharp is The typical use case for this high speed Node.
// js module is to convert large images in common formats to smaller,
// web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.
// As well as image resizing, operations such as rotation, extraction,
// compositing and gamma correction
// create modify function to resize img
const modify = async (
  width: number,
  height: number,
  lattest: string,
  origin: string,
): Promise<sharp.OutputInfo> => {
  return await sharp(origin).resize(width, height).toFile(lattest);
};
// export the modify function
export default modify;

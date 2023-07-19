import fs from 'fs'
export const convertToBase64 = async (imagePath: string): Promise<string> => {
  const imageBuffer = await fs.promises.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');
  return base64Image;
}
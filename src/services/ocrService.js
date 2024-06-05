import Tesseract from 'tesseract.js';


//function to convert image to text
export const imageToText = async (image) => {
    const { data: { text } } = await Tesseract.recognize(Buffer.from(image, 'base64','eng'));
    return text;   
}


//function to get bounding boxes
export const getBBoxesFromImageAndType = async (image, type) => {
    const result = await Tesseract.recognize(Buffer.from(image, 'base64'));
      const elements = result.data[type + 's'];
    if(type!="page"){
      return elements.map(element => ({
        x0: element.bbox.x0,
        y0: element.bbox.y0,
        x1: element.bbox.x1,
        y1: element.bbox.y1,
        text: element.text
      }));}
      if (type === 'page') {
        // For type 'page', we manually create an array with one element
        return  {
          bbox: {
            x0: 0,
            y0: 0,
            x1: result.data.text.length,
            y1: result.data.text.length
          },
          text: result.data.text
        };
      }
    

}



// export const getBBoxesFromImageAndType = async (image, type) => {
//     const { data: { [type + 's']: elements } } = await Tesseract.recognize(Buffer.from(image, 'base64'));
//     return elements;
// }
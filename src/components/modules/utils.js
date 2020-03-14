export const getImages = (array) => array.map((item) => ({ src: item.fields.file.url, alt: 'training' }));

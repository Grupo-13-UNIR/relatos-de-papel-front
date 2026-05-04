export enum BookCategory {
  ADVENTURE = 'ADVENTURE',
  SCIENCE_FICTION = 'SCIENCE_FICTION',
  HORROR = 'HORROR',
  THRILLER = 'THRILLER',
  DRAMA = 'DRAMA ',
  ROMANCE = 'ROMANCE',
  FANTASY = 'FANTASY',
}

export interface Book {
  id: number;
  title: string;
  summary: string;
  author: string;
  category: BookCategory;
  stock: number;
  image: string;
  releaseDate: Date;
  rating: number;
  price: number;
}

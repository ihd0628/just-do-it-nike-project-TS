interface Content {
  id: number;
  styleCode: string;
  thumbnail: string;
  productName: string;
  description: string;
  brandName: string;
  color: string;
  discountPrice: number;
  retailPrice: number;
  releaseDate: string;
}
type ContentsMock = Array<Content>;

const CONTENTS_MOCK: ContentsMock = [
  {
    id: 1,
    styleCode: 'a',
    thumbnail: './image/itemList/shoesImage/nikeShoes0.jpeg',
    productName: '나이키 리액트 13',
    description: '성인 남성 신발',
    brandName: 'Nike',
    color: '3 컬러',
    discountPrice: 168400,
    retailPrice: 259900,
    releaseDate: '2022-09-01',
  },
  {
    id: 2,
    styleCode: 'b',
    thumbnail: './image/itemList/shoesImage/nikeShoes1.webp',
    productName: '나이키 리액트 13',
    description: '성인 남성 신발',
    brandName: 'NikeLab',
    color: '3 컬러',
    discountPrice: 100400,
    retailPrice: 259900,
    releaseDate: '2022-09-01',
  },
  {
    id: 3,
    styleCode: 'c',
    thumbnail: './image/itemList/shoesImage/nikeShoes2.webp',
    productName: '나이키 리액트 13',
    description: '성인 남성 신발',
    brandName: 'ACG',
    color: '3 컬러',
    discountPrice: 168400,
    retailPrice: 259900,
    releaseDate: '2022-09-01',
  },
  {
    id: 4,
    styleCode: 'd',
    thumbnail: './image/itemList/shoesImage/nikeShoes3.webp',
    productName: '나이키 리액트 13',
    description: '성인 남성 신발',
    brandName: 'Nike',
    color: '3 컬러',
    discountPrice: 168400,
    retailPrice: 259900,
    releaseDate: '2022-09-01',
  },
  {
    id: 5,
    styleCode: 'e',
    thumbnail: './image/itemList/shoesImage/nikeShoes4.webp',
    productName: '나이키 리액트 13',
    description: '성인 남성 신발',
    brandName: 'Nike',
    color: '3 컬러',
    discountPrice: 168400,
    retailPrice: 259900,
    releaseDate: '2022-09-01',
  },
  {
    id: 6,
    styleCode: 'f',
    thumbnail: './image/itemList/shoesImage/nikeShoes5.webp',
    productName: '나이키 리액트 13',
    description: '성인 남성 신발',
    brandName: 'NikeLab',
    color: '3 컬러',
    discountPrice: 168400,
    retailPrice: 259900,
    releaseDate: '2022-09-01',
  },
];

export default CONTENTS_MOCK;
export const products = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "Sofa",
    description: "Short description",
    price: "RS.2999",
    brand: "apple",
    category: "Sofa",
    inStock: true,
    images: [
      {
        color: "White",
        colorCode: "#FFFFFF",
        image: "/assets/table-1.jpg",
        picture: "/assets/table-6.jpg",
      },
    ],
    reviews: [],
  },
  {
    id: "64a4ebe300900d44bb50628a",
    name: "Table",
    description: "PERFECT STROKE KEYS",
    price: "RS.102.99",
    brand: "table",
    category: "Accesories",
    inStock: true,
    images: [
      {
        color: "Black",
        colorCode: "#000000",
        image: "/assets/sofa.jpg",
        picture: "/assets/chair.jpg",
      },
    ],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4ebe300900d44bb50628a",
        rating: 5,
        comment: "good",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image: "/assets/table-1.jpg",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
];

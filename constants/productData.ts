export const productImages = [
    "https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1605619082574-e92eee603b95?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1676748933022-e1183e997436?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  
  type Product = {
    id: string;
    name: string;
    slug: string;
    images: string[];
    price: number;
  };
  
  const productsData: Product[] = [
  
    {
      id: "1",
      name: "Cassava Flour",
      slug: "cassava-flour",
      images: [
        "/assets/images/products/Cassava Flour.jpeg",
        "/assets/images/products/Cassava Flour2.jpeg",
  
      ],
      price: 102.00
    },
    {
      id: "2",
      name: "Cassava Starch",
      slug: "cassava-starch",
      images: [
        "/assets/images/products/Starch 01.jpg",
        "/assets/images/products/Starch 02.jpg",
       
      ],
      price: 99.99,
    },
    {
      id: "3",
      name: "Water FUFU",
      slug: "water-fufu",
      images: [
        "/assets/images/products/FuFu.jpg",
        "/assets/images/products/FuFu 02.jpg",
       
      ],
      price: 149.99,
    },
    {
      id: "4",
      name: "Corn Porridge",
      slug: "corn-porridge",
      images: [
        "/assets/images/products/Corn Porridge.jpg",
        "/assets/images/products/Corn Porridge 02.jpg",
       
      ],
      price: 1299.99,
    },
    
  ];
  
  export default productsData;
  
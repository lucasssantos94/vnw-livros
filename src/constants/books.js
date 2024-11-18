export const books = [
  {
    title: "O Protagonista",
    category: "Ficção",
    author: "Susanne Andrade",
    urlImage: "https://m.media-amazon.com/images/I/71AcihoiMzL._SL1500_.jpg",
  },
  {
    title: "As coisas que você só vê quando desacelera",
    category: "Artesanato, Casa e Estilo de Vida",
    author: "Haemin Sunim",
    urlImage: "https://m.media-amazon.com/images/I/61F6T1at-nL._SL1367_.jpg",
  },
  {
    title:
      "Quebrando o hábito de ser você mesmo: Como reconstruir sua mente e criar um novo eu",
    category: "Autoajuda",
    author: "Joe Dispenza",
    urlImage: "https://m.media-amazon.com/images/I/61me0V6JIKL._SL1360_.jpg",
  },
];

export const categoriesBooks = [
  "Arte, Cinema e Fotografia",
  "Artesanato, Casa e Estilo de Vida",
  "Autoajuda",
  "Biografia e Casos Verdadeiros",
  "Crime, Suspense e Mistério",
  "Educação e Referêncial",
  "Esportes e Lazer",
  "Fantasia e Ficção Científica",
  "Gastronomia e Culinária",
  "Historia",
  "HQ e Mangás",
  "Humor e Entretenimento",
  "Infantil e InfantoJuvenil",
  "LGBT/GLS",
  "Literatura",
  "Profissional e Técnico",
  "Religião e Espiritualidade",
  "Romance",
  "Saude e Bem-Estar",
  "Turismo e Viagem",
  "Idiomas",
];

export const addBook = (title, category, author, urlImage) => {
  const book = {
    title: title,
    category: category,
    author: author,
    urlImage: urlImage,
  };
  books.push(book);
};

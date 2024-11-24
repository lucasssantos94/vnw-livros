export const books = [
  {
    title: "Python Levado a Sério",
    category: "Tecnologia, Programação",
    author: "Julien Danjou",
    urlImage:
      "https://books.google.com.br/books/publisher/content?id=3DPlDwAAQBAJ&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U2hn7C7BjCvsESnrp7PpMLOAkmOGw&w=1280",
  },
  {
    title: "Estruturas de dados e algoritmos com JavaScript",
    category: "Tecnologia, Programação",
    author: "Loiane Groner",
    urlImage:
      "https://books.google.com.br/books/publisher/content?id=0nWKDwAAQBAJ&hl=pt-BR&pg=PA4&img=1&zoom=3&bul=1&sig=ACfU3U1Rntr1z1ysc0uIvTy9xDJw7YvgKQ&w=1280",
  },
  {
    title: "Código Limpo",
    category: "Tecnologia, Programação",
    author: "Robert C. Martin",
    urlImage:
      "https://http2.mlstatic.com/D_NQ_NP_677433-MLU72592365557_102023-O.webp",
  },
  {
    title: "A menina que roubava livros",
    category: " Romance, Ficção juvenil, Ficção histórica,",
    author: "Markus Zusak",
    urlImage:
      "https://books.google.com.br/books/content?id=-_MMbijUmTEC&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U1tp8sOMKZud7hUmlJIIg9fwj8yZA&w=1280",
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
  "Tecnologia, Programação",
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

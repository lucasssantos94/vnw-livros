// AdminDashboard.jsx
import { useState, useEffect } from "react";
import { adminApiServices } from "../../../services/admin";
import Book from "@components/Book";
import "./styles.scss";

const AdminDashboard = () => {
  const [view, setView] = useState("usuarios");
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const getUsers = async () => {
    const response = await adminApiServices.getUsers();
    setUsers(response);
  };

  const getBooks = async () => {
    const response = await adminApiServices.getBooks();
    setBooks(response);
  };

  useEffect(() => {
    getUsers();
    getBooks();
  }, []);

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Painel Admin</h2>
        <nav>
          <ul>
            <li>
              <button onClick={() => setView("usuarios")}>Usuários</button>
            </li>
            <li>
              <button onClick={() => setView("livros")}>Livros</button>
            </li>
            <li>
              <button onClick={handleLogout}>Sair</button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        {view === "usuarios" && (
          <div>
            <h2>Lista de Usuários</h2>
            <ul>
              {users &&
                users.map((user) => <li key={user.id}>{user.nickname}</li>)}
            </ul>
          </div>
        )}
        {view === "livros" && (
          <div>
            <h2>Lista de Livros</h2>

            <div className="books-list">
              {books && books.map((book) => <Book key={book.id} book={book} />)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

<button>Adicionar Livro</button>;

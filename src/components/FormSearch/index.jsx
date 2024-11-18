import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Search from "@assets/images/icons/search.png";

import styles from "./style.module.scss";

const FormSearch = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pesquisa/${e.target[0].value.trim()}`);
    setSearch("");
  };
  return (
    <form className={styles["form-search"]} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="O que você procura ?"
        required
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className={styles["btn-search"]}>
        <img src={Search} alt="lupa para realizar pesquisa" />
      </button>
    </form>
  );
};

export default FormSearch;

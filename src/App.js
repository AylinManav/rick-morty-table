import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: "", status: "", species: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // API'den veri çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://rickandmortyapi.com/api/character");
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
      } catch (error) {
        setError("Veriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtreleme
  const handleFilter = () => {
    let updatedCharacters = characters;

    if (filters.name) {
      updatedCharacters = updatedCharacters.filter((character) =>
        character.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.status) {
      updatedCharacters = updatedCharacters.filter(
        (character) => character.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    if (filters.species) {
      updatedCharacters = updatedCharacters.filter((character) =>
        character.species.toLowerCase().includes(filters.species.toLowerCase())
      );
    }

    if (updatedCharacters.length === 0) {
      setError("Hiç sonuç bulunamadı.");
    } else {
      setError(null);
    }

    setFilteredCharacters(updatedCharacters);
    setSelectedCharacter(null); // Yeni filtreleme yapıldığında seçili karakteri temizle
    setCurrentPage(1); // Filtreleme sonrası sayfayı başa al
  };

  // Sayfa değiştirme
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
      <h1>Rick and Morty Karakter Tablosu</h1>
      <div>
        <input
          type="text"
          placeholder="İsme göre filtrele"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Durum</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          type="text"
          placeholder="Türe göre filtrele"
          value={filters.species}
          onChange={(e) => setFilters({ ...filters, species: e.target.value })}
        />
        <button onClick={handleFilter}>Filtrele</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredCharacters.length > 0 ? (
        <>
          <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "10px" }}>İsim</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Durum</th>
                <th style={{ border: "1px solid black", padding: "10px" }}>Tür</th>
              </tr>
            </thead>
            <tbody>
              {currentCharacters.map((character) => (
                <tr
                  key={character.id}
                  onClick={() => setSelectedCharacter(character)}
                  style={{ cursor: "pointer" }}
                >
                  <td style={{ border: "1px solid black", padding: "10px" }}>{character.name}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{character.status}</td>
                  <td style={{ border: "1px solid black", padding: "10px" }}>{character.species}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              Önceki
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{ fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
              Sonraki
            </button>
            <p>Sayfa {currentPage} / {totalPages}</p>
          </div>
        </>
      ) : null}
      {selectedCharacter && (
        <div style={{ marginTop: "20px", border: "1px solid black", padding: "20px" }}>
          <h3>Karakter Detayları</h3>
          <p><strong>İsim:</strong> {selectedCharacter.name}</p>
          <p><strong>Durum:</strong> {selectedCharacter.status}</p>
          <p><strong>Tür:</strong> {selectedCharacter.species}</p>
          <p><strong>Lokasyon:</strong> {selectedCharacter.location.name}</p>
        </div>
      )}
    </div>
  );
};

export default App;
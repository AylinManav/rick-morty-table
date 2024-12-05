import React, { useState } from "react";

const Table = ({ data, totalItems, itemsPerPage, currentPage, changePage }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Sayfa başına karakter sayısını hesapla
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Görüntülenecek sayfa aralığını belirleme (örneğin 5 sayfa görünmesini sağlamak)
  const visiblePageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePageRange / 2));
  const endPage = Math.min(totalPages, startPage + visiblePageRange - 1);
  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div>
      {/* Tabloyu oluşturuyoruz */}
      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Durum</th>
            <th>Tür</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((character) => (
              // Karakter tıklandığında detayları göstermek için state güncelleniyor
              <tr key={character.id} onClick={() => setSelectedCharacter(character)}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.species}</td>
              </tr>
            ))
          ) : (
            // Eğer veri bulunamazsa, kullanıcıya mesaj gösteriyoruz
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Veri bulunamadı
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Sayfalama butonları */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: "white",
            border: "1px solid black",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Önceki
        </button>

        {visiblePages.map((number) => (
          <button
            key={number}
            onClick={() => changePage(number)}
            style={{
              margin: "5px",
              padding: "5px 10px",
              backgroundColor: number === currentPage ? "lightblue" : "white",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: "white",
            border: "1px solid black",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Sonraki
        </button>
      </div>

      {/* Sayfa numarası bilgisi */}
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Sayfa {currentPage} / {totalPages}
      </p>

      {/* Seçilen karakterin detayları */}
      {selectedCharacter && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h2>Karakter Detayları</h2>
          <p><strong>İsim:</strong> {selectedCharacter.name}</p>
          <p><strong>Durum:</strong> {selectedCharacter.status}</p>
          <p><strong>Tür:</strong> {selectedCharacter.species}</p>
          <p><strong>Lokasyon:</strong> {selectedCharacter.location.name}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
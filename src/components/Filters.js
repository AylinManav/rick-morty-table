import React, { useState } from "react";

// Filters bileşeni, karakterleri filtrelemek için kullanılan bir arayüz sağlar.
// 'characters' prop'u tüm karakterlerin listesini alır ve
// 'setFilteredCharacters' prop'u filtrelenmiş karakter listesini günceller.
const Filters = ({ characters, setFilteredCharacters }) => {
  // Filtreleme için state'ler: isim, durum ve tür.
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  // Filtreleme işlemini gerçekleştiren fonksiyon
  const handleFilter = () => {
    // Orijinal karakter listesinin bir kopyasını alın
    let filtered = [...characters];

    // İsim filtresi: Girilen isim metni, karakterin ismi içinde geçiyor mu kontrol edilir
    if (nameFilter.trim()) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Durum filtresi: Alive, Dead veya unknown değerine göre filtreler
    if (statusFilter) {
      filtered = filtered.filter((character) => character.status === statusFilter);
    }

    // Tür filtresi: Girilen tür metni, karakterin türü içinde geçiyor mu kontrol edilir
    if (speciesFilter.trim()) {
      filtered = filtered.filter((character) =>
        character.species.toLowerCase().includes(speciesFilter.toLowerCase())
      );
    }

    // Filtre sonuçlarını konsola yazdırır (debugging için)
    console.log("Filtre Sonucu:", filtered);

    // Eğer filtreleme sonucunda liste boşsa kullanıcıya bilgi ver
    if (filtered.length === 0) {
      alert("Filtre sonucunda hiçbir karakter bulunamadı.");
    }

    // Filtrelenmiş karakterleri üst bileşene gönder
    setFilteredCharacters(filtered);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* İsme göre filtreleme input'u */}
      <input
        type="text"
        placeholder="İsme göre filtrele"
        value={nameFilter} // Input'un mevcut değeri
        onChange={(e) => setNameFilter(e.target.value)} // Kullanıcı input değerini günceller
        style={{ marginRight: "10px" }}
      />

      {/* Duruma göre filtreleme dropdown'u */}
      <select
        onChange={(e) => setStatusFilter(e.target.value)} // Kullanıcı seçimini günceller
        style={{ marginRight: "10px" }}
      >
        <option value="">Durum</option> {/* Varsayılan boş seçenek */}
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      {/* Türe göre filtreleme input'u */}
      <input
        type="text"
        placeholder="Türe göre filtrele"
        value={speciesFilter} // Input'un mevcut değeri
        onChange={(e) => setSpeciesFilter(e.target.value)} // Kullanıcı input değerini günceller
        style={{ marginRight: "10px" }}
      />

      {/* Filtreleme butonu */}
      <button onClick={handleFilter}>Filtrele</button>
    </div>
  );
};

// Filters bileşeni dışa aktarılır, böylece diğer bileşenlerde kullanılabilir.
export default Filters;
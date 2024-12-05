import React from "react";

// CharacterDetail bileşeni, seçilen bir karakterin detaylarını göstermek için kullanılır.
// 'character' prop'u ile seçilen karakterin bilgilerini alır.
const CharacterDetail = ({ character }) => {
  // Eğer bir karakter seçilmediyse (character null ya da undefined ise), hiçbir şey render edilmez.
  if (!character) return null;

  // Eğer bir karakter seçilmişse, bu bileşen karakterin detaylarını bir kutu içerisinde gösterir.
  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
      {/* Başlık */}
      <h2>Karakter Detayları</h2>
      {/* Karakterin ismi */}
      <p><strong>İsim:</strong> {character.name}</p>
      {/* Karakterin durumu (Alive, Dead, Unknown) */}
      <p><strong>Durum:</strong> {character.status}</p>
      {/* Karakterin türü (Human, Alien, vb.) */}
      <p><strong>Tür:</strong> {character.species}</p>
      {/* Karakterin bulunduğu lokasyon */}
      <p><strong>Lokasyon:</strong> {character.location.name}</p>
    </div>
  );
};

// Bileşen dışa aktarılır, böylece başka dosyalarda kullanılabilir.
export default CharacterDetail;
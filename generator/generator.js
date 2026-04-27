let linkHasil = "";

function capitalizeNama(nama) {
  return nama.toLowerCase().replace(/\b\w/g, huruf => huruf.toUpperCase());
}

function generateLink() {
  let nama = document.getElementById("nama").value.trim();

  if (!nama) {
    alert("Masukkan nama dulu!");
    return;
  }
function Prm(){
  const prm = document.getElementById("prm").checked
  if (prm){
    return "Ibu"
  }else{
    return "Bapak"
  }
}


  nama = capitalizeNama(nama);
  const gender = Prm()
  const formatNama = `YTH. ${gender} ${nama} `;
  const encoded = encodeURIComponent(formatNama);

  linkHasil = `https://zulfikar2208.github.io/wedding/?to=${encoded}`;

  document.getElementById("hasil").innerText = linkHasil;
}

function copyLink() {
  if (!linkHasil) {
    alert("Buat link dulu!");
    return;
  }

  // Coba modern clipboard API dulu
  if (navigator.clipboard) {
    navigator.clipboard.writeText(linkHasil)
      .then(() => alert("Link berhasil disalin!"))
      .catch(() => fallbackCopy(linkHasil)); // ← kalau gagal, pakai fallback
  } else {
    fallbackCopy(linkHasil);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Wajib: posisi harus visible & dalam viewport di iOS/Android
  textarea.style.position = "fixed";
  textarea.style.left = "0";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  textarea.setAttribute("readonly", ""); // cegah keyboard muncul di HP
  
  document.body.appendChild(textarea);
  
  // Khusus iOS Safari
  const range = document.createRange();
  range.selectNodeContents(textarea);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  textarea.setSelectionRange(0, 999999); // ← kunci untuk iOS

  const berhasil = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (berhasil) {
    alert("Link berhasil disalin!");
  } else {
    alert("Gagal menyalin. Coba salin manual.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const nama = new URLSearchParams(window.location.search).get("to");
  const guestEl = document.getElementById("guestName");

  guestEl.textContent = nama 
    ? decodeURIComponent(nama) 
    : "Nama Tamu";
});
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

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(linkHasil).then(() => {
      alert("Link berhasil disalin!");
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = linkHasil;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const berhasil = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (berhasil) {
      alert("Link berhasil disalin!");
    } else {
      alert("Gagal menyalin. Coba salin manual.");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const nama = new URLSearchParams(window.location.search).get("to");
  const guestEl = document.getElementById("guestName");

  guestEl.textContent = nama 
    ? decodeURIComponent(nama) 
    : "Nama Tamu";
});
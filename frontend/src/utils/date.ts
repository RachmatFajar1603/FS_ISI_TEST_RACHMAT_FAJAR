export const formatDate = (dateString: string) => {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateString);

  const offsetMs = 7 * 60 * 60 * 1000;
  const dateWIB = new Date(date.getTime() + offsetMs);

  const tanggal = dateWIB.getDate();
  const bulanNama = bulan[dateWIB.getMonth()];
  const tahun = dateWIB.getFullYear();
  const jam = dateWIB.getHours().toString().padStart(2, "0");
  const menit = dateWIB.getMinutes().toString().padStart(2, "0");

  return `${tanggal} ${bulanNama} ${tahun} ${jam}.${menit}`;
};

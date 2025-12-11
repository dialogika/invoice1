document.getElementById("uploadForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const whatsapp = document.getElementById("whatsapps").value;
  // Mengambil referensi elemen form untuk task dan notes
  const name = document.getElementById("names").value; // Nama untuk task
  const note = document.getElementById("messages").value.trim(); // Notes untuk task
  const program = document.getElementById("programs").value;
  const locations = document.getElementById("locations").value;

  // API Token dan List ID ClickUp
  const apiToken = "pk_276677813_5LZTC2L1TYHRVBRRRK5BKXBZDVUU2X7E";
  const listId = "14355106";

  const whatsappUrl = `https://wa.me/62${whatsapp}`;

  try {
    // Membuat task baru di ClickUp
    const createTaskResponse = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: "POST",
      headers: {
        Authorization: apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name, // Nama task
        custom_fields: [
          {
            id: "856f5a4e-fe7b-4ca3-8f2a-82ba0a1816b2",
            value: note,
          },
          {
            id: "1ea48bee-9f93-421e-a9e9-b140b8144891",
            value: [program],
          },
          {
            id: "0928d307-37dc-47e3-9ed4-ddc1bf73e4e7", // Channelnya dari website
            value: ["03a4d146-a239-4156-b368-ba620c3a0dd4"], // Value channel = website
          },
          {
            id: "cebb3fac-770a-4d4d-9056-1cab027bf9e1",
            value: locations,
          },
          {
            id: "76680f29-6988-4d55-ab67-508f051c2ed9", // Custom field ID for WhatsApp URL
            value: whatsappUrl,
          },
        ],
      }),
    });
console.log("DAta sudah dikirim !!!!")
    // Memeriksa apakah request berhasil
    if (!createTaskResponse.ok) {
      const error = await createTaskResponse.json();
      throw new Error("Kesalahan saat membuat tugas: " + (error.err || "Kesalahan tidak diketahui"));
    }

    alert("Anda Akan Segera Terhubung Ke Whatsapp!");
  } catch (error) {
    console.error("Kesalahan:", error);
    alert("Terjadi kesalahan. Silakan coba lagi.");
  }
});
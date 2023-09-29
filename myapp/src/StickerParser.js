import React from "react";
import axios from "axios";

const StickerParser = () => {
  const parseStickers = async () => {
    let stickerData = [];
    let startSize = 0;
    for (let i = 0; i < 70; i++) {
      const proxyUrl = "http://localhost:3001";
      const steamUrl = `https://steamcommunity.com/market/search/render/?query=&start=${startSize}&count=100&search_descriptions=0&norender=1&sort_column=price&sort_dir=asc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Type%5B%5D=tag_CSGO_Tool_Sticker
      `;

      try {
        const response = await axios.get(proxyUrl + "/" + steamUrl);

        if (response.status === 200 && response.data.results) {
          const parsedStickers = response.data.results.map((sticker) => ({
            name: sticker.name,
            price: sticker.sell_price_text,
          }));

          stickerData.push(...parsedStickers);

          if (response.data.total_count !== 0) {
            startSize += 100;
          }

          if (parsedStickers.length < 100 && response.data.total_count !== 0) {
            const fileContent = JSON.stringify(stickerData, null, 2); // Convert to JSON

            const blob = new Blob([fileContent], { type: "application/json" }); // Change content type to JSON
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "sticker_data.json"; // Change the filename
            a.click();
            URL.revokeObjectURL(url);
          }

          const delay = (ms) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          console.log("задержка 10 секунд");
          await delay(10000);
        } else {
          console.error("Ошибка при получении данных:", response.status);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={parseStickers}>Парсить стикеры</button>
    </div>
  );
};

export default StickerParser;

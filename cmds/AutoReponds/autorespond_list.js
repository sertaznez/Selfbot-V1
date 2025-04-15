const fs = require("fs");
const path = require("path");
const dataDir = path.join(__dirname, "../../data"); // Dẫn đến thư mục "data"
const responseFile = path.join(dataDir, "responses.json"); // Dẫn đến file "responses.json"
const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn tới file AllowUserIDs.js

module.exports = {
  name: "listautorespond",
  description: "Hiển thị tất cả các câu trả lời tự động hiện có.",
  async execute(message) {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ | Bạn không có quyền thực hiện lệnh này.');
    }

    // Đọc dữ liệu từ file responses.json
    fs.readFile(responseFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return message.reply('❌ | Đã xảy ra lỗi khi tải dữ liệu câu trả lời tự động.');
      }

      let responses;
      try {
        responses = JSON.parse(data);
      } catch (error) {
        console.error(error);
        return message.reply('❌ | Dữ liệu không hợp lệ.');
      }

      // Kiểm tra xem có câu trả lời nào hay không
      if (!responses || Object.keys(responses).length === 0) {
        return message.reply('❌ | Hiện tại chưa có câu trả lời tự động nào.');
      }

      // Tạo một danh sách các câu trả lời tự động
      const responseList = Object.keys(responses).map((trigger) => {
        return `**Trigger:** ${trigger} | **Reply:** ${responses[trigger]}`;
      }).join('\n');

      // Gửi danh sách câu trả lời tự động
      message.reply(`**Danh sách AutoReponds:**\n\n${responseList}`);
    });
  }
};

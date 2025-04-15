const fs = require("fs");
const path = require("path");
const dataDir = path.join(__dirname, "../../data");
const responseFile = path.join(dataDir, "responses.json");
const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn tới file AllowUserIDs.js

module.exports = {
  name: "editautorespond",
  description: "Chỉnh sửa phản hồi tự động.",
  execute: async (message, args) => {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply("❌ | Bạn không có quyền thực hiện lệnh này.");
    }

    if (args.length < 2) {
      return message.reply("❌ | Dùng: `editautorespond <trigger> <new response>`");
    }

    const trigger = args[0].toLowerCase();
    const newResponse = args.slice(1).join(" ");

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Đảm bảo file tồn tại
    if (!fs.existsSync(responseFile)) {
      fs.writeFileSync(responseFile, JSON.stringify({}, null, 2));
    }

    // Đọc dữ liệu từ responses.json
    let responses = JSON.parse(fs.readFileSync(responseFile, "utf8"));

    // Kiểm tra xem phản hồi có tồn tại không
    if (!responses[trigger]) {
      return message.reply("❌ | Không tìm thấy phản hồi để chỉnh sửa.");
    }

    // Cập nhật phản hồi mới
    responses[trigger] = newResponse;

    // Ghi lại file JSON
    fs.writeFileSync(responseFile, JSON.stringify(responses, null, 2));

    message.reply(`✅ | Đã cập nhật **"${trigger}"** thành **"${newResponse}"**.`);
  },
};

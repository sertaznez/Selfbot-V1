const fs = require("fs");
const path = require("path");
const dataDir = path.join(__dirname, "../../data");
const responseFile = path.join(dataDir, "responses.json");
const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn tới file AllowUserIDs.js

module.exports = {
  name: "removeautorespond",
  description: "Xóa một phản hồi tự động.",
  execute: async (message, args) => {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply("❌ | Bạn không có quyền thực hiện lệnh này.");
    }

    if (args.length < 1) {
      return message.reply("❌ | Dùng: `removeautorespond [trigger]`");
    }

    const trigger = args[0].toLowerCase();

    // Kiểm tra nếu thư mục hoặc file không tồn tại
    if (!fs.existsSync(responseFile)) {
      return message.reply("❌ | Không có phản hồi nào để xóa.");
    }

    // Đọc dữ liệu từ responses.json
    let responses = JSON.parse(fs.readFileSync(responseFile, "utf8"));

    // Kiểm tra xem phản hồi có tồn tại không
    if (!responses[trigger]) {
      return message.reply("❌ | Không tìm thấy phản hồi để xóa.");
    }

    // Xóa phản hồi
    delete responses[trigger];

    // Ghi lại file JSON
    fs.writeFileSync(responseFile, JSON.stringify(responses, null, 2));

    message.reply(`✅ | Đã xóa: **"${trigger}"**.`);
  },
};

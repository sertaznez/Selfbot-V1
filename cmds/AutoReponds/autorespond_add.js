const fs = require('fs');
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

// Đảm bảo file responses.json tồn tại
const responsesFile = './data/responses.json';
if (!fs.existsSync(responsesFile)) {
    fs.writeFileSync(responsesFile, JSON.stringify({}, null, 2)); // Tạo file nếu chưa có
}

module.exports = {
    name: 'autorespond',
    description: 'Thêm câu trả lời tự động',

    async execute(message, args) {
        // Kiểm tra nếu người gửi lệnh có trong danh sách AllowUserIDs
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra cú pháp lệnh
        if (args[0] !== 'add') {
            return message.reply('❌ Cú pháp không hợp lệ! Sử dụng `autorespond add <trigger> <response>`');
        }

        // Câu lệnh phải có trigger và response
        if (args.length < 3) {
            return message.reply('❌ Cú pháp sai! Cần cung cấp trigger và câu trả lời.');
        }

        // Tách trigger và response
        const trigger = args[1].toLowerCase();  // Chuyển thành chữ thường để dễ dàng tìm kiếm
        const response = args.slice(2).join(' ');

        // Đọc dữ liệu từ file responses.json
        const responses = JSON.parse(fs.readFileSync(responsesFile, 'utf8'));

        // Thêm trigger và response vào dữ liệu
        if (responses[trigger]) {
            return message.reply('❌ Trigger này đã tồn tại!');
        }

        responses[trigger] = response;
        fs.writeFileSync(responsesFile, JSON.stringify(responses, null, 2));

        message.reply(`✅ Đã Thêm trigger "${trigger}":\n Respond:${response}`);
    }
};

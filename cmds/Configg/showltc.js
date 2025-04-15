const config = require('../../data/config.json'); // Đảm bảo đường dẫn đúng đến config.json
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'showltc',
    description: 'Hiển thị LTC key đã được cài đặt.',
    async execute(message, args) {
        // Kiểm tra nếu người dùng không có quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra nếu LTC key không tồn tại
        if (!config.ltc_key) {
            return message.reply('Chưa có LTC key được thiết lập!');
        }

        // Gửi tin nhắn với LTC key
        return message.reply(`LTC Key hiện tại là: \`${config.ltc_key}\``);
    }
};

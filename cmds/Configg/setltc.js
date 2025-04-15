const fs = require('fs');
const path = require('path'); // Đảm bảo sử dụng path để làm việc với đường dẫn chính xác
const configPath = path.join(__dirname, '../../data/config.json'); // Đảm bảo đường dẫn chính xác đến file config.json
const config = require(configPath);
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'setltc',
    description: 'Cài đặt LTC key.',
    async execute(message, args) {
        // Kiểm tra nếu người dùng không có quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra nếu không có key nào được nhập
        if (args.length === 0) {
            return message.reply('Vui lòng nhập LTC key sau lệnh setltc.');
        }

        // Lưu LTC key vào config.json
        const ltcKey = args.join(' ');

        config.ltc_key = ltcKey;  // Gán giá trị LTC key vào object config

        // Ghi lại config vào file
        fs.writeFile(configPath, JSON.stringify(config, null, 4), (err) => {
            if (err) {
                console.error('Lỗi khi ghi vào config.json:', err);  // Log lỗi ra console
                return message.reply('Đã xảy ra lỗi khi lưu LTC key!');
            }

            console.log('Cập nhật LTC key thành công:', ltcKey);  // Log thành công ra console
            return message.reply(`LTC key đã được cài đặt thành công: \`${ltcKey}\``);
        });
    }
};

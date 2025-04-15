const fs = require('fs');

const responsesFile = './data/responses.json';

// Đảm bảo file responses.json tồn tại
if (!fs.existsSync(responsesFile)) {
    fs.writeFileSync(responsesFile, JSON.stringify({}, null, 2));
}

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        console.log(`[DEBUG] Tin nhắn nhận được từ ${message.author.username}: ${message.content}`);

        // Không phản hồi tin nhắn từ bot
        if (message.author.bot) return;

        // Đọc dữ liệu từ file responses.json
        const responses = JSON.parse(fs.readFileSync(responsesFile, 'utf8'));

        // Kiểm tra nếu tin nhắn khớp với bất kỳ trigger nào trong responses
        const trigger = message.content.toLowerCase();
        if (responses[trigger]) {
            console.log(`[DEBUG] Phát hiện trigger: ${trigger}`);
            await message.reply(responses[trigger]); // Gửi phản hồi
        } else {
            console.log(`[DEBUG] Không tìm thấy trigger nào khớp.`);
        }
    }
};

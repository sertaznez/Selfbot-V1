const fs = require('fs');
const { setTimeout } = require('timers/promises');
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

module.exports = {
    name: 'abuse',
    description: 'Spam người dùng liên tục với delay ngẫu nhiên.',
    execute(message, args) {
        // Kiểm tra nếu người gửi lệnh có trong danh sách AllowUserIDs
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        if (!args[0]) return message.reply('Bạn cần mention một người để abuse!');

        const target = message.mentions.users.first();
        if (!target) return message.reply('Bạn cần mention một người hợp lệ!');

        if (!fs.existsSync('abuse.txt')) {
            return message.reply('Không tìm thấy file `abuse.txt`! Hãy tạo file này và nhập nội dung spam.');
        }

        const spamMessages = fs.readFileSync('abuse.txt', 'utf8').split('\n').filter(line => line.trim() !== '');
        if (spamMessages.length === 0) {
            return message.reply('File `abuse.txt` đang trống, hãy thêm nội dung spam!');
        }

        if (!message.client.abuseChannels) {
            message.client.abuseChannels = new Set();
        }

        if (message.client.abuseChannels.has(message.channel.id)) {
            return message.reply('Lệnh abuse đã chạy trong kênh này!');
        }

        message.client.abuseChannels.add(message.channel.id);
        message.reply(`**Bắt đầu abuse ${target}!**`);

        async function startAbuse() {
            while (message.client.abuseChannels.has(message.channel.id)) {
                const randomMessage = spamMessages[Math.floor(Math.random() * spamMessages.length)];
                await message.channel.send(`${randomMessage} ${target}`);

                const delay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
                await setTimeout(delay);
            }
        }

        startAbuse();
    }
};

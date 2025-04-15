const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'fakenitro',
    description: 'Gửi link Fake Nitro Discord!',
  
    async execute(message) {
        // Kiểm tra quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        // Tạo một link fake nitro
        const fakeNitroLink = 'https://discord.gift/abcd-efgh-ijkl';  // Thay đổi đường link tùy ý

        // Gửi thông báo tới người dùng với link fake nitro
        message.channel.send({
            content: `🎉 Chúc mừng bạn nhận được **Nitro Discord**! 🎉\n\nNhấn vào link sau để kích hoạt: [${fakeNitroLink}](${fakeNitroLink})`
        });

        // Xóa tin nhắn lệnh sau khi gửi thông báo
        message.delete().catch(err => console.error('Không thể xóa tin nhắn: ', err));
    },
};

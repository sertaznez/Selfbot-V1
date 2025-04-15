const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'watching',
    description: 'Thay đổi trạng thái bot thành Watching <title>',
    async execute(message, args) {
        // Kiểm tra nếu user không có quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        const statusMessage = args.join(" ");
        if (!statusMessage) {
            return message.reply('Bạn cần cung cấp thông điệp trạng thái!');
        }

        try {
            await message.client.user.setActivity(statusMessage, { type: 'WATCHING' });
            message.reply(`✅ Trạng thái bot đã được thay đổi thành: **Watching ${statusMessage}**`);
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái:', error);
            message.reply('⚠️ Đã có lỗi xảy ra khi thay đổi trạng thái của bot.');
        }
    },
};

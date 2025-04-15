const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'fakethread',
    description: 'Tạo một thread giả để troll bạn bè!',
  
    async execute(message) {
        // Kiểm tra quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        try {
            // Lấy tên người dùng hoặc nội dung từ lệnh
            const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
            const threadName = args.slice(1).join(' ') || 'Thread giả';

            // Gửi thông báo về thread giả
            message.channel.send(`🎉 **${message.author.username}** đã tạo thread giả: **${threadName}**!`);
            
            // Xóa tin nhắn lệnh để không làm spam kênh
            message.delete();
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi tạo thread giả!');
        }
    },
};

const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

module.exports = {
    name: 'stopabuse',
    description: 'Dừng spam abuse',
    execute(message) {
        // Kiểm tra xem người dùng có quyền dừng abuse không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền dừng spam abuse!');
        }

        // Kiểm tra xem có abuse nào đang chạy trong kênh hiện tại không
        if (!message.client.abuseChannels || !message.client.abuseChannels.has(message.channel.id)) {
            return message.react('❌'); // React với emoji ❌ nếu không có abuse nào đang chạy
        }
        
        // Xóa kênh khỏi abuseChannels (ngừng abuse)
        message.client.abuseChannels.delete(message.channel.id);

        // Gửi phản hồi với emoji ✅ khi đã dừng abuse thành công
        message.react('✅');
    }
};

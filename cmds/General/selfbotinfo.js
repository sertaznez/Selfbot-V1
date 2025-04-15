const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'selfbotinfo',  // Tên lệnh
    description: 'Hiển thị thông tin về Selfbot.',
  
    async execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        const { client } = message;  // Lấy thông tin client của bot
  
        // Lấy thông tin bot
        const selfbotInfo = {
            username: client.user.username,  // Tên người dùng bot
            id: client.user.id,  // ID của bot
            status: client.user.presence.status,  // Trạng thái hiện tại của bot
            createdAt: client.user.createdAt.toLocaleString(),  // Ngày tạo tài khoản bot
        };
  
        // Tạo thông báo dạng text
        const selfbotInfoMessage = `
        **Selfbot Name**: ${selfbotInfo.username}
        **Selfbot ID**: ${selfbotInfo.id}
        **Status**: ${selfbotInfo.status}
        **Account Created At**: ${selfbotInfo.createdAt}
        `;
  
        // Gửi thông báo dạng text
        message.channel.send(selfbotInfoMessage);
    },
};

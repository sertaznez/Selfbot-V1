const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

module.exports = {
    name: 'userinfo',  // Tên lệnh
    description: 'Hiển thị thông tin về người dùng.',
  
    async execute(message, args) {
        // Kiểm tra quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền xem thông tin người dùng!');
        }

        // Nếu không có người dùng được chỉ định, lấy thông tin của người gửi lệnh
        const user = args.length > 0 ? message.mentions.users.first() : message.author;
    
        if (!user) {
            return message.reply("Không tìm thấy người dùng.");
        }
    
        // Lấy thông tin người dùng
        const userInfo = {
            username: user.username,  // Tên người dùng
            discriminator: user.discriminator,  // Mã phân biệt (tag) của người dùng
            id: user.id,  // ID của người dùng
            createdAt: user.createdAt.toLocaleString(),  // Ngày tạo tài khoản người dùng
            joinedAt: message.guild.members.cache.get(user.id).joinedAt.toLocaleString(),  // Ngày gia nhập server
        };
    
        // Kiểm tra trạng thái trực tuyến của người dùng
        const member = message.guild.members.cache.get(user.id);
        if (member && member.presence) {
            userInfo.status = member.presence.status;  // 'online', 'offline', 'idle', or 'dnd'
        }

        // Thêm emoji vào tin nhắn
        const onlineEmoji = ':green_heart:'; // Emoji khi người dùng online
        const offlineEmoji = ':red_circle:'; // Emoji khi người dùng offline
        const statusEmoji = userInfo.status === 'online' ? onlineEmoji : offlineEmoji;
    
        // Tạo thông báo dạng text
        const userInfoMessage = `
        **Username**: ${userInfo.username}#${userInfo.discriminator}
        **User ID**: ${userInfo.id}
        **Account Created At**: ${userInfo.createdAt}
        **Joined Server At**: ${userInfo.joinedAt}
        `;
    
        // Gửi thông báo dạng text
        message.channel.send(userInfoMessage);
    },
};

const { AllowUserIDs } = require('../../AllowUserIDs');  // Đảm bảo đường dẫn đúng đến file chứa danh sách AllowUserIDs

module.exports = {
    name: 'serverinfo',  // Tên lệnh
    description: 'Hiển thị thông tin về server Discord.',
  
    async execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        const guild = message.guild;  // Lấy thông tin server (guild)
  
        try {
            // Lấy thông tin chủ sở hữu server thông qua guild.fetchOwner()
            const owner = await guild.fetchOwner();
  
            // Lấy thông tin cơ bản về server
            const serverInfo = {
                name: guild.name,  // Tên server
                id: guild.id,  // ID server
                memberCount: guild.memberCount,  // Tổng số thành viên
                owner: owner.user.tag,  // Chủ sở hữu server
                createdAt: guild.createdAt.toLocaleString(),  // Ngày tạo server
                region: guild.region,  // Vị trí server
                iconURL: guild.iconURL() || 'https://via.placeholder.com/150'  // URL ảnh đại diện của server (fallback nếu không có ảnh)
            };
  
            // Tạo thông báo dạng text
            const serverInfoMessage = `
            **Server Name**: ${serverInfo.name}
            **Server ID**: ${serverInfo.id}
            **Owner**: ${serverInfo.owner}
            **Member Count**: ${serverInfo.memberCount}
            **Created At**: ${serverInfo.createdAt}
            **Region**: ${serverInfo.region}
            `;
  
            // Gửi thông báo dạng text
            message.channel.send(serverInfoMessage);
  
        } catch (error) {
            console.error('Error fetching server owner:', error);
            message.channel.send('Không thể lấy thông tin chủ sở hữu server.');
        }
    },
};

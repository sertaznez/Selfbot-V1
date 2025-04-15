const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'unban',
    description: 'Gỡ cấm user nếu bạn là chủ server hoặc admin',
    async execute(message, args) {
        if (!message.guild) return message.reply('❌ Lệnh này chỉ hoạt động trong server!');

        // Kiểm tra xem người dùng có trong danh sách AllowUserIDs không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền thực hiện hành động này!');
        }

        const owner = message.guild.ownerId === message.author.id; // Kiểm tra chủ server
        const admin = message.member.permissions.has('ADMINISTRATOR'); // Kiểm tra admin

        if (!owner && !admin) {
            return message.reply('❌ Bạn không có quyền unban!');
        }

        if (!args[0]) {
            return message.reply('⚠️ Vui lòng nhập ID của người cần unban!');
        }

        const userId = args[0];
        const guildId = message.guild.id;
        const token = message.client.token; // Lấy token từ selfbot

        try {
            await axios({
                method: 'DELETE',
                url: `https://discord.com/api/v9/guilds/${guildId}/bans/${userId}`,
                headers: {
                    Authorization: token,
                },
            });

            message.react('✅'); // React khi unban thành công
        } catch (error) {
            message.reply('❌ Không thể unban user! Kiểm tra ID hoặc thử lại sau.');
        }
    }
};

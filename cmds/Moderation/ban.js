const { AllowUserIDs } = require('../../AllowUserIDs');
const axios = require('axios');

module.exports = {
  name: 'ban',
  description: 'Ban user nếu bạn là chủ server hoặc admin',
  async execute(message, args) {
    // Kiểm tra nếu người dùng có quyền sử dụng lệnh
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
    }

    if (!message.guild) return message.reply('❌ Lệnh này chỉ hoạt động trong server!');

    const owner = message.guild.ownerId === message.author.id; // Kiểm tra chủ server
    const admin = message.member.permissions.has('ADMINISTRATOR'); // Kiểm tra admin

    if (!owner && !admin) {
      return message.reply('❌ Bạn không có quyền ban!');
    }

    let user;
    if (message.mentions.users.size) {
      user = message.mentions.users.first();
    } else if (args[0]) {
      user = message.client.users.cache.get(args[0]);
    }

    if (!user) {
      return message.reply('⚠️ Vui lòng tag người dùng hoặc nhập ID hợp lệ!');
    }

    const guildId = message.guild.id;
    const userId = user.id;
    const token = message.client.token; // Lấy token từ selfbot

    try {
      await axios({
        method: 'PUT',
        url: `https://discord.com/api/v9/guilds/${guildId}/bans/${userId}`,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        data: {
          delete_message_days: 7, // Xóa tin nhắn 7 ngày gần đây
          reason: 'Vi phạm quy tắc',
        },
      });

      message.react('✅'); // React khi ban thành công
    } catch (error) {
      message.reply('❌ Không thể ban user! Kiểm tra quyền hạn hoặc thử lại sau.');
    }
  }
};

const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn đến file AllowUserIDs.js

module.exports = {
  name: 'voicekick',
  description: 'Kick người dùng khỏi kênh thoại.',
  aliases: ['vckick'],
  async execute(message, args) {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('Bạn không có quyền thực hiện lệnh này.');
    }

    // Kiểm tra quyền của người dùng
    if (!message.guild.members.cache.get(message.author.id).permissions.has('MOVE_MEMBERS')) {
      return message.reply('Bạn không có quyền di chuyển thành viên.');
    }

    // Lấy người dùng được mention
    const member = message.mentions.members.first();

    if (!member) {
      return message.reply('Vui lòng mention người dùng bạn muốn kick khỏi kênh thoại.');
    }

    // Kiểm tra người dùng có đang ở trong kênh thoại không
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return message.reply(`${member.user.tag} không đang ở trong kênh thoại.`);
    }

    // Disconnect người dùng khỏi kênh thoại
    try {
      await member.voice.disconnect();
      message.channel.send(`**${member.user.tag}** đã bị kick khỏi kênh thoại.`);
    } catch (err) {
      console.error(err);
      message.reply('Đã xảy ra lỗi khi kick người dùng khỏi kênh thoại.');
    }
  }
};

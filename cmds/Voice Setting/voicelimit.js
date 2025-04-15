const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn tới file AllowUserIDs.js

module.exports = {
  name: 'voicelimit',
  description: 'Đặt số người giới hạn trong kênh voice hoặc mở khóa voice channel.',
  aliases: ['vclimit'],
  async execute(message, args) {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('Bạn không có quyền thực hiện lệnh này.');
    }

    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('Bạn cần quyền **Quản lý Kênh** để sử dụng lệnh này.');
    }

    // Kiểm tra quyền của bot
    if (!message.guild.members.me.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('Bot không có quyền **Quản lý Kênh** trong server này.');
    }

    // Lấy ID của kênh voice
    const channelId = args[1]; // Tham số thứ hai là ID kênh voice
    const voiceChannel = message.guild.channels.cache.get(channelId);

    if (!voiceChannel || voiceChannel.type !== 'GUILD_VOICE') {
      return message.reply('ID kênh không hợp lệ hoặc kênh không phải là kênh voice.');
    }

    if (args[0].toLowerCase() === 'vocuc') {
      // Nếu từ khóa là "vocuc", mở khóa kênh voice
      try {
        await voiceChannel.setUserLimit(0);  // Mở khóa kênh, không giới hạn người vào
        message.reply(`Kênh voice **${voiceChannel.name}** đã được **mở khóa (không giới hạn người vào)**.`);
      } catch (error) {
        console.error(error);
        message.reply('Đã xảy ra lỗi khi mở khóa kênh voice.');
      }
    } else {
      // Nếu là số giới hạn
      const limit = parseInt(args[0], 10);
      if (isNaN(limit) || limit < 1 || limit > 99) {
        return message.reply('Số giới hạn phải là một số từ 1 đến 99.');
      }

      try {
        await voiceChannel.setUserLimit(limit);  // Thiết lập số người tối đa
        message.reply(`Kênh voice **${voiceChannel.name}** đã được đặt giới hạn tối đa là **${limit} người.**`);
      } catch (error) {
        console.error(error);
        message.reply('Đã xảy ra lỗi khi thiết lập giới hạn người vào kênh voice.');
      }
    }
  }
};

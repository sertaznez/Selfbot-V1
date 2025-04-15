const mutedUsers = require('./mutedUsers'); // Import biến mutedUsers
const { AllowUserIDs } = require('../../AllowUserIDs'); // Import danh sách AllowUserIDs từ file

module.exports = {
  name: 'voiceunmute',
  description: 'Mở tiếng cho người dùng trong voice channel.',
  aliases: ['vcunmute'],
  async execute(message, args) {
    // Kiểm tra nếu người dùng có quyền thực hiện lệnh (kiểm tra trong danh sách AllowUserIDs)
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('Bạn không có quyền sử dụng lệnh này.');
    }

    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply('Bạn cần quyền **MUTE_MEMBERS** để sử dụng lệnh này.');
    }

    // Kiểm tra cú pháp lệnh: unmute <@user hoặc user_id>
    let user;
    if (message.mentions.members.size > 0) {
      user = message.mentions.members.first(); // Nếu là mention
    } else if (args[0]) {
      // Nếu là ID
      user = await message.guild.members.fetch(args[0]).catch(() => null);
    }

    if (!user) {
      return message.reply('Vui lòng cung cấp người dùng để unmute. Cú pháp: `>unmute @user` hoặc `>unmute <user_id>`');
    }

    if (!user.voice.channel) {
      return message.reply('Người dùng không có mặt trong kênh voice để mở tiếng.');
    }

    try {
      await user.voice.setMute(false);  // Mở tiếng người dùng
      mutedUsers.delete(user.id);  // Xóa người dùng khỏi danh sách mute
      message.reply(`**${user.user.tag}** đã được unmute**.`);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi unmute người dùng.');
    }
  },
};

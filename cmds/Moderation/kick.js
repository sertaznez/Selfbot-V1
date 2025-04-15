const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'kick',
  description: 'Kick người dùng',
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ Bạn không có quyền kick người dùng trong server này!');
    }

    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!target) {
      return message.reply('Bạn cần chỉ định một người dùng để kick!');
    }

    // Kiểm tra quyền của bot
    if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
      return message.reply('Bot không có quyền kick thành viên!');
    }

    // Kiểm tra quyền của người gọi lệnh
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      return message.reply('Bạn không có quyền để kick người dùng!');
    }

    // Kiểm tra xem bot có quyền kick thành viên này không
    if (target.roles.highest.position >= message.guild.me.roles.highest.position) {
      return message.reply('Bot không có quyền kick người dùng này, vì role của họ cao hơn hoặc bằng bot!');
    }

    try {
      await target.kick();
      message.reply(`${target.user.tag} đã bị kick khỏi server!`);
    } catch (error) {
      console.error(error);
      message.reply('Không thể kick người dùng này!');
    }
  }
};

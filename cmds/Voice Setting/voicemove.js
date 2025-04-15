const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn tới file AllowUserIDs.js

module.exports = {
  name: 'voicemove',
  description: 'Di chuyển người dùng từ một kênh voice này sang kênh voice khác bằng ID.',
  aliases: ['vcmove'],
  async execute(message, args) {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('Bạn không có quyền thực hiện lệnh này.');
    }

    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has('MOVE_MEMBERS')) {
      return message.reply('Bạn cần quyền **Di chuyển Thành viên** để sử dụng lệnh này.');
    }

    // Kiểm tra cú pháp lệnh: vcmove <@user> <voice1_id> to <voice2_id>
    const user = message.mentions.members.first();
    if (!user) {
      return message.reply('Bạn cần chỉ định người dùng cần di chuyển.');
    }

    const voice1Id = args[1];  // ID của kênh voice nguồn
    const voice2Id = args[3];  // ID của kênh voice đích

    if (!voice1Id || !voice2Id) {
      return message.reply('Bạn cần cung cấp cả ID của kênh voice nguồn và kênh voice đích.');
    }

    // Lấy kênh voice từ ID
    const voice1 = message.guild.channels.cache.get(voice1Id);
    const voice2 = message.guild.channels.cache.get(voice2Id);

    if (!voice1 || voice1.type !== 'GUILD_VOICE') {
      return message.reply('ID của kênh voice nguồn không hợp lệ.');
    }

    if (!voice2 || voice2.type !== 'GUILD_VOICE') {
      return message.reply('ID của kênh voice đích không hợp lệ.');
    }

    // Kiểm tra xem người dùng có ở trong kênh voice1 hay không
    if (user.voice.channel !== voice1) {
      return message.reply(`${user.user.tag} không có mặt trong kênh voice ${voice1.name}.`);
    }

    // Di chuyển người dùng
    try {
      await user.voice.setChannel(voice2);  // Di chuyển người dùng sang voice2
      message.reply(`${user.user.tag} đã được di chuyển từ kênh **voice ${voice1.name}** sang **${voice2.name}**.`);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi di chuyển người dùng.');
    }
  },
};

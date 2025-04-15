const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đúng đường dẫn tới file AllowUserIDs.js

module.exports = {
  name: 'voicecmoveall',
  description: 'Di chuyển tất cả người dùng từ một kênh voice này sang kênh voice khác.',
  aliases: ['vcmoveall'],
  async execute(message, args) {
    // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('Bạn không có quyền thực hiện lệnh này.');
    }

    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has('MOVE_MEMBERS')) {
      return message.reply('Bạn cần quyền **Di chuyển Thành viên** để sử dụng lệnh này.');
    }

    // Kiểm tra cú pháp lệnh: vcmoveall <voice1> to <voice2>
    const voice1Id = args[0].replace(/[<#>]/g, ''); // ID của kênh voice nguồn (có thể là <#id>)
    const voice2Id = args[2].replace(/[<#>]/g, ''); // ID của kênh voice đích (có thể là <#id>)

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

    // Lấy tất cả người dùng trong kênh voice1
    const members = voice1.members;

    if (members.size === 0) {
      return message.reply('Không có người dùng nào trong kênh voice này để di chuyển.');
    }

    // Di chuyển tất cả người dùng sang kênh voice2
    try {
      members.forEach(async (member) => {
        await member.voice.setChannel(voice2);  // Di chuyển từng người dùng sang voice2
      });

      message.reply(`Đã di chuyển tất cả người dùng từ kênh **voice ${voice1.name}** sang **${voice2.name}**.`);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi di chuyển người dùng.');
    }
  },
};

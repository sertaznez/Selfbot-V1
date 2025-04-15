const { joinVoiceChannel } = require('@discordjs/voice');
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'voicejoin',
  description: 'Bot tham gia vào kênh thoại từ ID kênh.',
  aliases: ['vcjoin'],
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs hay không
    if (!AllowUserIDs.includes(message.author.id)) {
      // Nếu người dùng không có trong danh sách, react bằng dấu X và không phản hồi
      await message.react('❌');
      return; // Không phản hồi gì nữa
    }

    // Kiểm tra nếu người dùng cung cấp ID kênh
    const channelId = args[0];
    if (!channelId) {
      return message.reply('Bạn phải cung cấp ID kênh thoại.');
    }

    // Tìm kênh thoại theo ID
    const voiceChannel = message.guild.channels.cache.get(channelId);

    // Kiểm tra nếu kênh thoại tồn tại
    if (!voiceChannel || voiceChannel.type !== 'GUILD_VOICE') {
      return message.reply('ID kênh không hợp lệ hoặc không phải là kênh thoại.');
    }

    // Tham gia vào kênh thoại
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    message.reply(`tui đã tham gia kênh thoại: **${voiceChannel.name}**`);
    console.log(`tui đã tham gia kênh thoại: ${voiceChannel.name}`);
  }
};

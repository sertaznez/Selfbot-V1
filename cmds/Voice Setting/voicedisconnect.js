const { getVoiceConnection } = require('@discordjs/voice');  // Thêm để lấy kết nối voice
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'voicedisconnect',
  description: 'Bot sẽ rời khỏi kênh voice.',
  aliases: ['vcdisc'],
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs hay không
    if (!AllowUserIDs.includes(message.author.id)) {
      // Nếu người dùng không có trong danh sách, react bằng dấu X và không phản hồi
      await message.react('❌');
      return; // Không phản hồi gì nữa
    }

    const member = message.guild.members.me;  // Bot user in the guild
    const voiceChannel = member.voice.channel;  // Kiểm tra kênh mà bot đang tham gia

    if (!voiceChannel) {
      return message.reply('tui không đang trong kênh voice nào!');
    }

    // Sử dụng getVoiceConnection để lấy voice connection
    const connection = getVoiceConnection(message.guild.id);  // Truy cập kết nối voice của guild

    if (!connection) {
      return message.reply('tui không có kết nối với kênh voice!');
    }

    try {
      // Ngắt kết nối bot ra khỏi kênh
      connection.destroy();  // Sử dụng destroy() để ngắt kết nối và rời khỏi kênh
      message.reply('**tui đã rời khỏi kênh voice.**');
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi bot cố gắng rời khỏi kênh voice.');
    }
  }
};

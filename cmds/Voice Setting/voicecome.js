const { joinVoiceChannel } = require('@discordjs/voice');
const { AllowUserIDs } = require('../../AllowUserIDs');




module.exports = {
  name: 'voicecome',
  description: 'Bot tham gia vào kênh thoại.',
  aliases: ['vccome'],
  async execute(message) {
    // Kiểm tra nếu người dùng có trong danh sách AllowUserIDs
    if (!AllowUserIDs.includes(message.author.id)) {
      // Nếu không có trong danh sách, react bằng dấu X và không phản hồi
      await message.react('❌');
      return; // Không phản hồi gì nữa
    }

    // Kiểm tra nếu người dùng đã ở trong một kênh thoại
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.reply('Bạn phải ở trong một kênh thoại để tôi tham gia!');
    }

    // Bot sẽ tham gia vào kênh thoại mà người dùng đang ở
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    message.reply('Tui đã tham gia kênh thoại!');
    console.log('Tui đã tham gia kênh thoại');
  }
};

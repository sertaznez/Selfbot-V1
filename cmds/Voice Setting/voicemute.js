const mutedUsers = require('./mutedUsers'); // Import biến mutedUsers
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs từ file

module.exports = {
  name: 'voicemute',
  description: 'Mute người dùng trong voice channel.',
  aliases: ['vcmute'],
  async execute(message, args) {
    // Kiểm tra nếu người dùng có quyền thực hiện lệnh (kiểm tra trong danh sách AllowUserIDs)
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('Bạn không có quyền sử dụng lệnh này.');
    }

    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
      return message.reply('Bạn cần quyền **MUTE_MEMBERS** để sử dụng lệnh này.');
    }

    // Kiểm tra cú pháp lệnh: mute <@user hoặc user_id> <time>
    let user;
    if (message.mentions.members.size > 0) {
      user = message.mentions.members.first(); // Nếu là mention
    } else if (args[0]) {
      // Nếu là ID
      user = await message.guild.members.fetch(args[0]).catch(() => null);
    }

    let time = args[1]; // Thời gian mute tính bằng giây

    if (!user || !time) {
      return message.reply('Vui lòng cung cấp người dùng và thời gian để mute. Cú pháp: `>mute @user <time>` hoặc `>mute <user_id> <time>`');
    }

    if (!user.voice.channel) {
      return message.reply('Người dùng không có mặt trong kênh voice.');
    }

    // Kiểm tra và xử lý thời gian nếu có ký tự 's'
    if (time.endsWith('s')) {
      time = time.slice(0, -1); // Loại bỏ ký tự 's'
    }

    // Kiểm tra nếu time là một số hợp lệ
    time = parseInt(time, 10);
    if (isNaN(time)) {
      return message.reply('Vui lòng cung cấp thời gian hợp lệ (số giây).');
    }

    try {
      await user.voice.setMute(true);  // Mute người dùng
      message.reply(`**${user.user.tag}** đã bị mute trong kênh voice trong ${time} giây.`);

      // Lưu người dùng vào map với thời gian hết hạn
      mutedUsers.set(user.id, Date.now() + time * 1000);

      // Tạo một setTimeout để tự động unmute sau thời gian
      setTimeout(async () => {
        if (mutedUsers.has(user.id) && Date.now() >= mutedUsers.get(user.id)) {
          await user.voice.setMute(false);  // Mở tiếng
          mutedUsers.delete(user.id);  // Xóa người dùng khỏi danh sách mute
          message.channel.send(`**${user.user.tag}** đã hết thời gian mute.`);
        }
      }, time * 1000);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi mute người dùng.');
    }
  },
};

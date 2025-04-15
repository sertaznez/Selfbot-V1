const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'leaveallgroup',
  description: 'Bot sẽ rời tất cả nhóm trong DM',
  async execute(message, args) {
    // Kiểm tra quyền của người dùng
    if (!AllowUserIDs.includes(message.author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
    }

    try {
      // Lấy tất cả các kênh DM của bot (gồm cả nhóm và các DM riêng)
      const dmChannels = await message.client.channels.cache.filter(ch => ch.type === 'dm');

      // Lọc ra những nhóm chat mà bot là thành viên
      const groupDMs = dmChannels.filter(ch => ch.members.size > 2);

      if (groupDMs.size === 0) {
        return message.reply("Bot không tham gia nhóm DM nào.");
      }

      // Rời khỏi tất cả nhóm DM
      groupDMs.forEach(async (dmChannel) => {
        try {
          await dmChannel.leave(); // Rời khỏi nhóm DM
          console.log(`Đã rời khỏi nhóm DM với ID: ${dmChannel.id}`);
        } catch (err) {
          console.error(`Không thể rời khỏi nhóm DM với ID: ${dmChannel.id}`, err);
        }
      });

      message.reply("Bot đã rời tất cả nhóm DM.");

    } catch (error) {
      console.error(error);
      message.reply("Đã xảy ra lỗi khi bot cố gắng rời khỏi nhóm DM.");
    }
  }
};

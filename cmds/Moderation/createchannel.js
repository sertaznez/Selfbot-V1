const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'createchannel',
  description: 'Tạo một kênh mới trong danh mục cụ thể.',
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ Bạn không có quyền tạo kênh trong server này!');
    }

    // Kiểm tra quyền admin hoặc chủ sở hữu server
    const owner = message.guild.ownerId === message.author.id;
    const admin = message.member.permissions.has('ADMINISTRATOR');

    if (!owner && !admin) {
      return message.reply('❌ Bạn không có quyền tạo kênh trong server này!').catch(console.error);
    }

    // Kiểm tra nếu tên kênh không được nhập
    if (!args.length) {
      return message.reply('❌ Bạn phải cung cấp tên kênh cần tạo!').catch(console.error);
    }

    const channelName = args.join(' ');

    // Lấy danh mục hiện tại (category) mà bot đang đứng
    const category = message.channel.parent;

    if (!category) {
      return message.reply('❌ Kênh hiện tại không thuộc một danh mục nào để tạo kênh trong đó!').catch(console.error);
    }

    try {
      // Tạo kênh mới trong danh mục hiện tại
      const newChannel = await message.guild.channels.create(channelName, {
        type: 'text',  // Hoặc 'voice' nếu bạn muốn tạo kênh voice
        parent: category.id,  // Gán kênh vào danh mục hiện tại
        reason: 'Kênh được tạo bởi lệnh bot',  // Lý do tạo kênh
      });

      // Gửi thông báo thành công với định dạng #channel-name
      message.reply(`✅ Kênh ${newChannel.name} đã được tạo thành công trong danh mục ${category.name}!`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Đã có lỗi xảy ra khi tạo kênh!').catch(console.error);
    }
  },
};

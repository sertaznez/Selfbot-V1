const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'deleterole',
  description: 'Xóa một role trong server.',
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ Bạn không có quyền xóa role trong server này!');
    }

    // Kiểm tra quyền admin hoặc chủ sở hữu server
    const owner = message.guild.ownerId === message.author.id;
    const admin = message.member.permissions.has('ADMINISTRATOR');

    if (!owner && !admin) {
      return message.reply('❌ Bạn không có quyền xóa role trong server này!').catch(console.error);
    }

    // Kiểm tra nếu tên role không được nhập
    if (args.length < 1) {
      return message.reply('❌ Bạn phải cung cấp tên role cần xóa!').catch(console.error);
    }

    // Tìm role theo tên
    const roleName = args.join(' ');
    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());

    if (!role) {
      return message.reply('❌ Không tìm thấy role với tên này!').catch(console.error);
    }

    // Kiểm tra nếu role là @everyone hoặc là role hệ thống
    if (role.name === '@everyone') {
      return message.reply('❌ Không thể xóa role @everyone!').catch(console.error);
    }

    try {
      // Xóa role
      await role.delete({ reason: 'Role bị xóa bởi bot' });

      // Gửi thông báo thành công
      message.reply(`✅ Role **${role.name}** đã được xóa thành công!`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Đã có lỗi xảy ra khi xóa role!').catch(console.error);
    }
  },
};

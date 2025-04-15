const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'createrole',
  description: 'Tạo một role mới trong server với màu sắc tùy chỉnh.',
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ Bạn không có quyền tạo role trong server này!');
    }

    // Kiểm tra quyền admin hoặc chủ sở hữu server
    const owner = message.guild.ownerId === message.author.id;
    const admin = message.member.permissions.has('ADMINISTRATOR');

    if (!owner && !admin) {
      return message.reply('❌ Bạn không có quyền tạo role trong server này!').catch(console.error);
    }

    // Kiểm tra nếu tên role không được nhập
    if (args.length < 1) {
      return message.reply('❌ Bạn phải cung cấp tên role cần tạo!').catch(console.error);
    }

    // Tách tên role và mã màu
    const roleName = args.slice(0, args.length - 1).join(' '); // Tên role là tất cả phần trước mã màu
    const colorHex = args[args.length - 1]; // Mã màu là phần cuối cùng

    // Kiểm tra xem mã màu có hợp lệ không
    if (!/^#[0-9A-F]{6}$/i.test(colorHex)) {
      return message.reply('❌ Mã màu không hợp lệ! Đảm bảo bạn nhập đúng định dạng #RRGGBB.').catch(console.error);
    }

    try {
      // Tạo role mới với tên và màu đã chỉ định
      const newRole = await message.guild.roles.create({
        name: roleName,
        color: colorHex,  // Mã màu người dùng nhập vào
        reason: 'Role được tạo bởi lệnh bot',  // Lý do tạo role
      });

      // Gửi thông báo thành công với tên role và mã màu
      message.reply(`✅ Role **${newRole.name}** với màu **${newRole.hexColor}** đã được tạo thành công!`);
    } catch (error) {
      console.error(error);
      message.reply('❌ Đã có lỗi xảy ra khi tạo role!').catch(console.error);
    }
  },
};

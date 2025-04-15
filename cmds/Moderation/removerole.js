const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'removerole',
  description: 'Gỡ vai trò khỏi người dùng',
  async execute(message, args) {
    // Kiểm tra xem người dùng có trong danh sách AllowUserIDs không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply('❌ Bạn không có quyền thực hiện hành động này!');
    }

    // Kiểm tra xem người dùng có quyền sử dụng lệnh không
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.reply("Bạn không có quyền để thực hiện hành động này!");
    }

    // Kiểm tra nếu thiếu tham số
    if (args.length < 2) {
      return message.reply("Vui lòng cung cấp người dùng và vai trò!");
    }

    // Lấy người dùng và vai trò
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    const role = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));

    if (!user) {
      return message.reply("Không tìm thấy người dùng!");
    }
    if (!role) {
      return message.reply("Không tìm thấy vai trò!");
    }

    // Gỡ vai trò khỏi người dùng
    try {
      await message.guild.members.cache.get(user.id).roles.remove(role);
      message.reply(`Đã gỡ vai trò **${role.name}** khỏi người dùng **${user.tag}**.`);
    } catch (error) {
      console.error(error);
      message.reply("Đã xảy ra lỗi khi gỡ vai trò.");
    }
  },
};

const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: 'addrole',
  description: 'Thêm vai trò cho người dùng',
  async execute(message, args) {
    // Kiểm tra nếu người dùng không có quyền
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply("Bạn không có quyền sử dụng lệnh này!");
    }

    // Kiểm tra quyền của người dùng
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.reply("Bạn không có quyền để thực hiện hành động này!");
    }

    // Kiểm tra nếu thiếu tham số
    if (args.length < 2) {
      return message.reply("Vui lòng cung cấp người dùng và vai trò!");
    }

    // Lấy người dùng và vai trò
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
    // Tìm role theo ID, tên, hoặc ping
    const roleArg = args.slice(1).join(" "); // lấy phần role từ args
    const role = message.guild.roles.cache.get(roleArg) 
                || message.guild.roles.cache.find(r => r.name === roleArg) 
                || message.guild.roles.cache.get(roleArg.match(/\d+/)?.[0]);

    if (!user) {
      return message.reply("Không tìm thấy người dùng!");
    }
    if (!role) {
      return message.reply("Không tìm thấy vai trò!");
    }

    // Kiểm tra nếu bot có quyền thêm vai trò này
    if (role.position >= message.guild.members.cache.get(message.client.user.id).roles.highest.position) {
      return message.reply("Tôi không có quyền cấp vai trò này!");
    }

    // Thêm vai trò cho người dùng
    try {
      await message.guild.members.cache.get(user.id).roles.add(role);
      message.reply(`Đã thêm vai trò **${role.name}** cho người dùng **${user.tag}**.`);
    } catch (error) {
      console.error(error);
      message.reply("Đã xảy ra lỗi khi thêm vai trò.");
    }
  },
};

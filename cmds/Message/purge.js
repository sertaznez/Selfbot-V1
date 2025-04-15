const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: "purge",
  description: "Xóa nhiều tin nhắn cùng lúc",
  async execute(message, args) {
    // Kiểm tra xem người gửi có nằm trong danh sách ID được phép không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply("❌ Bạn không có quyền sử dụng lệnh này!");
    }

    // Kiểm tra quyền của người gửi lệnh
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("❌ Bạn không có quyền xóa tin nhắn!");
    }

    // Kiểm tra đủ tham số
    if (!args[0] || isNaN(args[0])) {
      return message.reply("❌ Sai cú pháp! Dùng: `>purge <amount>`");
    }

    let amount = parseInt(args[0]);
    if (amount <= 0 || amount > 100) {
      return message.reply("⚠️ Bạn chỉ có thể xóa từ 1 đến 100 tin nhắn!");
    }

    try {
      // Fetch tin nhắn
      const fetchedMessages = await message.channel.messages.fetch({ limit: amount });

      // Xóa từng tin nhắn
      for (const msg of fetchedMessages.values()) {
        await msg.delete();
      }

      // Gửi thông báo mà không sử dụng message_reference
      message.channel.send(`✅ Đã xóa ${fetchedMessages.size} tin nhắn!`).then(msg => setTimeout(() => msg.delete(), 3000));
    } catch (error) {
      console.error(error);
      message.reply("❌ Không thể xóa tin nhắn cũ hơn 14 ngày!");
    }
  },
};

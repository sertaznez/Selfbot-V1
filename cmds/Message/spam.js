const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
  name: "spam",
  description: "Spam tin nhắn nhiều lần",
  async execute(message, args) {
    // Kiểm tra xem người gửi có nằm trong danh sách ID được phép không
    if (!AllowUserIDs.includes(message.author.id)) {
      return message.reply("❌ Bạn không có quyền sử dụng lệnh này!");
    }

    // Kiểm tra quyền của người gửi lệnh
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("❌ Bạn không có quyền spam tin nhắn!");
    }

    // Kiểm tra đủ tham số
    if (args.length < 2) {
      return message.reply("❌ Sai cú pháp! Dùng: `>spam <amount> <msg>`");
    }

    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) {
      return message.reply("❌ Số lần spam phải là một số hợp lệ!");
    }

    // Giới hạn số lần spam tối đa (tránh rate-limit)
    if (amount > 10) {
      return message.reply("⚠️ Bạn chỉ có thể spam tối đa 10 lần!");
    }

    let msg = args.slice(1).join(" ");

    // Spam tin nhắn
    for (let i = 0; i < amount; i++) {
      await message.channel.send(msg);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Chờ 1 giây để tránh rate-limit
    }
  }
};

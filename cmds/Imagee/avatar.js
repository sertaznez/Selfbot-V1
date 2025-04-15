const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: "avatar",
    aliases: ["av"], 
    description: "Xem avatar của bạn hoặc người khác",
    execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply("❌ Bạn không có quyền sử dụng lệnh này!");
        }

        // Kiểm tra xem có ID trong args không, nếu có thì lấy người dùng theo ID
        let user;
        if (args.length > 0) {
            // Nếu args có phần tử và là một ID hợp lệ
            user = message.guild.members.cache.get(args[0])?.user || message.mentions.users.first();
        }

        // Nếu không có ID hợp lệ, lấy người gửi tin nhắn
        if (!user) {
            user = message.author;
        }

        let avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        // Gửi tin nhắn chứa link avatar
        message.channel.send(`Avatar của **${user.username}**: ${avatarURL}`)
            .catch(err => console.error("Lỗi gửi tin nhắn:", err));
    }
};

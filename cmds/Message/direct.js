const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'direct',
    description: 'Send a DM to a user or user ID',
    aliases: ['dm'],
    async execute(message, args) {
        // Kiểm tra quyền của người dùng
        if (!AllowUserIDs.includes(message.author.id) && !message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply('❌ Bạn không có quyền gửi DM cho người dùng này.');
        }

        // Kiểm tra cú pháp của lệnh
        if (args.length < 2) {
            return message.reply('Cú pháp sai. Sử dụng: `dm <@user|user_id> <msg>`');
        }

        // Lấy người dùng hoặc ID người dùng
        let user;
        if (message.mentions.users.size > 0) {
            // Nếu có mention người dùng
            user = message.mentions.users.first();
        } else {
            // Nếu không có mention, cố gắng lấy theo ID
            user = message.guild.members.cache.get(args[0])?.user || await message.client.users.fetch(args[0]).catch(() => null);
        }

        const msg = args.slice(1).join(" ");

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return message.reply("Không tìm thấy người dùng.");
        }

        try {
            // Gửi tin nhắn DM đến người dùng
            await user.send(msg);

            // Phản hồi lại bằng cách react thay vì gửi tin nhắn
            return message.react("✅");  // React với dấu kiểm ✅ khi tin nhắn được gửi thành công
        } catch (error) {
            console.error(error);
            return message.reply("Không thể gửi tin nhắn đến người dùng này.");
        }
    }
};

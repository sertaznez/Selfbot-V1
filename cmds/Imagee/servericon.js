const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'servericon',
    description: 'Lấy icon của server',
    execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        const serverIcon = message.guild.iconURL({ dynamic: true, size: 1024 });

        if (!serverIcon) {
            return message.reply("Server này không có icon.");
        }

        // Gửi ảnh icon của server
        message.channel.send(`Icon của server: ${serverIcon}`);
    },
};

const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'serverbanner',
    description: 'Lấy banner của server',
    execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        const serverBanner = message.guild.bannerURL({ dynamic: true, size: 1024 });

        if (!serverBanner) {
            return message.reply("Server này không có banner.");
        }

        // Gửi ảnh banner của server
        message.channel.send(`Banner của server: ${serverBanner}`);
    },
};

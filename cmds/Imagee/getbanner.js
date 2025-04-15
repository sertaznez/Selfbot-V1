const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'getbanner',
    description: 'Lấy banner của người dùng theo tag hoặc ID',
    async execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        if (!args.length) {
            return message.reply('Vui lòng nhập ID hoặc tag người dùng!');
        }

        let user = message.mentions.users.first(); // Lấy người dùng từ tag

        if (!user) {
            try {
                user = await message.client.users.fetch(args[0]); // Lấy người dùng bằng ID
            } catch (error) {
                return message.reply('Không tìm thấy người dùng với ID này!');
            }
        }

        try {
            const userBanner = await user.fetch(); // Lấy thông tin banner

            if (!userBanner.banner) {
                return message.reply('Người dùng này không có banner.');
            }

            // Xác định URL của banner
            const bannerURL = userBanner.banner.startsWith('a_')
                ? `https://cdn.discordapp.com/banners/${user.id}/${userBanner.banner}.gif?size=1024`
                : `https://cdn.discordapp.com/banners/${user.id}/${userBanner.banner}.png?size=1024`;

            message.channel.send(`Banner của **${user.username}**: ${bannerURL}`);
        } catch (error) {
            console.error(error);
            message.reply('Có lỗi xảy ra khi lấy banner.');
        }
    },
};

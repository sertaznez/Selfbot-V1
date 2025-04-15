const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'deletechannel',
    description: 'Xóa kênh Discord thông qua ID, link hoặc định dạng #channel.',
    async execute(message, args) {
        // Kiểm tra xem người gửi có trong danh sách ID được phép không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra nếu không có đối số
        if (!args[0]) {
            return message.reply('❌ Vui lòng cung cấp ID, link hoặc tên kênh để xóa.');
        }

        let channel;

        // Nếu đối số là ID kênh
        if (args[0].match(/^(\d{17,19})$/)) {
            channel = message.guild.channels.cache.get(args[0]);
        }
        // Nếu đối số là Link kênh
        else if (args[0].match(/https:\/\/discord\.com\/channels\/\d{17,19}\/\d{17,19}/)) {
            const match = args[0].match(/https:\/\/discord\.com\/channels\/(\d{17,19})\/(\d{17,19})/);
            if (match) {
                channel = message.guild.channels.cache.get(match[2]);
            }
        }
        // Nếu đối số là tên kênh với định dạng #channel
        else if (args[0].startsWith('#')) {
            const channelName = args[0].slice(1).trim();  // Loại bỏ dấu # và khoảng trắng
            channel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() === channelName.toLowerCase());  // So sánh tên kênh không phân biệt chữ hoa chữ thường
        }

        // Kiểm tra nếu không tìm thấy kênh
        if (!channel) {
            return message.reply('❌ Không tìm thấy kênh với ID, link hoặc tên đã cung cấp.');
        }

        // Kiểm tra quyền xóa kênh
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.reply('❌ Bạn không có quyền xóa kênh này!');
        }

        try {
            // Xóa kênh
            await channel.delete();
            message.reply(`✅ Đã xóa kênh: ${channel.name}`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Đã xảy ra lỗi khi xóa kênh.');
        }
    },
};

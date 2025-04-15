const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'remove',
    description: 'Xóa trạng thái self',
    async execute(message) {
        // Kiểm tra nếu user không có trong danh sách AllowUserIDs
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        try {
            await message.client.user.setActivity(null);  // Xóa trạng thái hiện tại
            message.reply('Đã xóa trạng thái của self.');
        } catch (error) {
            console.error(error);
            message.reply('Đã có lỗi xảy ra khi xóa trạng thái của self.');
        }
    },
};

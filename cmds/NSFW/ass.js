const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đường dẫn đúng đến file chứa AllowUserIDs

module.exports = {
    name: 'ass',
    description: 'Gửi một nội dung NSFW (Chỉ dành cho kênh NSFW)!',
    async execute(message) {
        // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra xem kênh có phải là kênh NSFW không
        if (!message.channel.nsfw) {
            return message.reply('❌ Lệnh này chỉ có thể sử dụng trong kênh NSFW!');
        }

        try {
            // Gọi API để lấy hình ảnh NSFW
            const response = await axios.get('https://nekobot.xyz/api/image?type=ass');

            console.log(response.data); // Debug dữ liệu trả về từ API

            // Kiểm tra API có trả về dữ liệu hợp lệ không
            if (!response.data || !response.data.message) {
                return message.reply('⚠️ Không tìm thấy hình ảnh từ API.');
            }

            const nsfwUrl = response.data.message; // API trả về key "message" chứa URL ảnh

            // Gửi ảnh NSFW về kênh
            message.channel.send({
                content: '**🔞 Hình ảnh NSFW đây!**',
                files: [nsfwUrl] // Gửi ảnh
            });

            // Xóa tin nhắn lệnh để tránh làm loãng chat
            message.delete().catch(() => {});
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
            message.reply('❌ Không thể lấy nội dung NSFW, thử lại sau!');
        }
    },
};

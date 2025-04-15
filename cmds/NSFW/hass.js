const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs'); // Đảm bảo đường dẫn đúng đến file chứa AllowUserIDs

module.exports = {
    name: 'hass',
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
            // Giả sử bạn sử dụng một API để lấy nội dung NSFW, ví dụ: Reddit API, hoặc một nguồn khác.
            const response = await axios.get('https://some-nsfw-api.com/get-content'); // Thay thế URL API thực tế ở đây, tui không có nên thoi nha +))))

            console.log(response.data); // Debug dữ liệu trả về từ API

            // Giả sử API trả về một URL hình ảnh NSFW
            const nsfwUrl = response.data.url;
            const nsfwTitle = response.data.title;

            // Gửi nội dung NSFW về kênh NSFW
            message.channel.send({
                content: `💥 **${nsfwTitle}** 💥`,
                files: [nsfwUrl] // Gửi nội dung dưới dạng ảnh hoặc file
            });

            // Xóa tin nhắn lệnh
            message.delete();
        } catch (error) {
            console.error(error);
            message.reply('❌ Không thể lấy nội dung NSFW, thử lại sau!');
        }
    },
};

const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');

// Thay thế bằng thông tin từ Twitch Developer Console
const CLIENT_ID = 'YOUR_TWITCH_CLIENT_ID'; 
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

module.exports = {
    name: 'stream',
    description: 'Tìm kiếm stream trực tiếp trên Twitch.',
    async execute(message, args) {
        // Kiểm tra nếu user không có quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        const query = args.join(" "); // Lấy tên game hoặc streamer từ lệnh
        if (!query) {
            return message.reply('Bạn cần cung cấp tên game hoặc streamer để tìm kiếm!');
        }

        try {
            // Gọi API Twitch để tìm kiếm streamer
            const response = await axios.get(`https://api.twitch.tv/helix/search/channels?query=${query}`, {
                headers: {
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            });

            const channels = response.data.data.filter(channel => channel.is_live);
            if (channels.length === 0) {
                return message.reply(`Không tìm thấy stream nào cho "${query}".`);
            }

            // Lấy thông tin stream đầu tiên
            const stream = channels[0];
            const streamUrl = `https://www.twitch.tv/${stream.broadcaster_login}`;

            // Gửi thông báo stream
            message.channel.send(`🎥 **${stream.display_name}** đang livestream! 🎮\n🔗 Xem ngay: ${streamUrl}`);

        } catch (error) {
            console.error('Lỗi khi gọi API Twitch:', error.response?.data || error.message);
            message.reply('Đã có lỗi xảy ra khi tìm kiếm stream. Vui lòng thử lại sau!');
        }
    },
};

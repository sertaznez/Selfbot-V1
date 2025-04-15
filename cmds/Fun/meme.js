const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'meme',
    description: 'Gửi một meme ngẫu nhiên!',
  
    async execute(message) {
        // Kiểm tra quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        try {
            // Gửi yêu cầu đến Meme API (https://api.imgflip.com/get_memes)
            const response = await axios.get('https://api.imgflip.com/get_memes');

            // Kiểm tra xem API trả về có meme không và chọn một meme ngẫu nhiên
            const memes = response.data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];

            const memeUrl = randomMeme.url;  // URL của meme ngẫu nhiên
            const memeTitle = randomMeme.name;  // Tên của meme

            // Gửi meme về Discord
            message.channel.send({
                content: `Meme: **${memeTitle}**`,
                files: [memeUrl] // Gửi meme dưới dạng ảnh
            });
        } catch (error) {
            console.error(error);
            message.reply('Không thể lấy meme, thử lại sau!');
        }
    },
};

const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách các user ID được phép

module.exports = {
    name: 'usd2eur', 
    aliases: ['u2e'],
    description: 'Chuyển đổi USD sang EUR',  
    async execute(message, args) {
        // Kiểm tra xem người dùng có nằm trong danh sách AllowUserIDs không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        // Kiểm tra người dùng đã nhập số tiền cần chuyển đổi chưa
        if (args.length < 1) {
            return message.reply('Vui lòng nhập số tiền USD cần chuyển đổi (ví dụ: `u2e 100`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền USD cần chuyển đổi
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá USD sang EUR từ API CoinGecko
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'eur',
                    vs_currencies: 'usd',
                }
            });

            const usdToEurRate = 1 / response.data.eur.usd;  // Tính tỷ giá từ USD sang EUR

            if (!usdToEurRate) {
                return message.reply('Không thể lấy tỷ giá từ USD sang EUR.');
            }

            // Tính toán số tiền EUR từ số tiền USD
            const result = amount * usdToEurRate;
            
            message.channel.send(`**${amount} USD** tương đương với **${result.toFixed(2)} EUR**.`);
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi lấy tỷ giá. Vui lòng thử lại sau.');
        }
    },
};

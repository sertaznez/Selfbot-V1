const axios = require('axios');
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách AllowUserIDs

module.exports = {
    name: 'eur2usd', 
    aliases: ['e2u'],
    description: 'Chuyển đổi EUR sang USD',
    async execute(message, args) {
        // Kiểm tra người dùng có quyền sử dụng lệnh không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này!');
        }

        // Kiểm tra người dùng đã nhập số tiền cần chuyển đổi chưa
        if (args.length < 1) {
            return message.reply('Vui lòng nhập số tiền EUR cần chuyển đổi (ví dụ: `e2u 100`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền EUR cần chuyển đổi
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Lấy tỷ giá EUR sang USD từ API CoinGecko
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'eur',
                    vs_currencies: 'usd',
                }
            });

            // Kiểm tra xem dữ liệu có hợp lệ không
            if (!response.data || !response.data.eur || !response.data.eur.usd) {
                return message.reply('Không thể lấy tỷ giá từ EUR sang USD. Dữ liệu không hợp lệ.');
            }

            const eurToUsdRate = response.data.eur.usd;  // Lấy tỷ giá từ EUR sang USD

            // Tính toán số tiền USD từ số tiền EUR
            const result = amount * eurToUsdRate;
            
            message.channel.send(`**${amount} EUR** tương đương với **${result.toFixed(2)} USD**.`);
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi lấy tỷ giá. Vui lòng thử lại sau.');
        }
    },
};

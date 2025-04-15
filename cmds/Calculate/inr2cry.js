const axios = require('axios');  // Import axios để gửi yêu cầu HTTP
const { AllowUserIDs } = require('../../AllowUserIDs');  // Import danh sách các user ID được phép

module.exports = {
    name: 'inr2cry',
    aliases: ['i2c'],
    description: 'Chuyển đổi tiền từ INR sang Crypto (Bitcoin, Ethereum, Litecoin,...)',
    async execute(message, args) {
        // Kiểm tra xem người dùng có nằm trong danh sách AllowUserIDs không
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('Bạn không có quyền sử dụng lệnh này.');
        }

        // Kiểm tra xem người dùng có nhập đủ thông tin hay không
        if (args.length < 2) {
            return message.reply('Vui lòng nhập số tiền và loại crypto cần đổi (ví dụ: `i2c 100inr bitcoin`).');
        }

        const amount = parseFloat(args[0]);  // Số tiền cần chuyển đổi, chuyển sang kiểu số
        const currency = args[1].toLowerCase();  // Loại crypto (ví dụ: bitcoin, ethereum)

        // Kiểm tra xem số tiền có hợp lệ không
        if (isNaN(amount) || amount <= 0) {
            return message.reply('Vui lòng nhập một số tiền hợp lệ.');
        }

        // Danh sách các đồng tiền mã hóa hợp lệ
        const validCryptos = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'dogecoin', 'cardano'];

        // Kiểm tra xem đồng tiền có hợp lệ không
        if (!validCryptos.includes(currency)) {
            return message.reply(`Chỉ hỗ trợ các đồng tiền sau: ${validCryptos.join(', ')}`);
        }

        // Chuyển đổi INR sang Crypto bằng CoinGecko API
        try {
            // Gửi yêu cầu tới API CoinGecko để lấy tỷ giá
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=inr`);
            
            // Kiểm tra xem API có trả về dữ liệu không
            if (!response.data[currency] || !response.data[currency].inr) {
                return message.reply('Không tìm thấy tỷ giá cho đồng tiền mã hóa này hoặc đồng tiền không hợp lệ.');
            }

            const cryptoPrice = response.data[currency].inr;  // Lấy tỷ giá INR sang Crypto

            // Kiểm tra xem tỷ giá có hợp lệ không
            if (isNaN(cryptoPrice) || cryptoPrice <= 0) {
                return message.reply('Tỷ giá của đồng tiền mã hóa không hợp lệ.');
            }

            // Tính toán số tiền chuyển đổi
            const result = amount / cryptoPrice;
            
            // Trả về kết quả
            message.channel.send(`**${amount} INR** tương đương với **${result.toFixed(6)} ${currency.toUpperCase()}**`);
        } catch (error) {
            // Xử lý lỗi nếu không thể lấy thông tin từ API
            console.error(error);
            message.reply('Không thể thực hiện chuyển đổi. Hãy kiểm tra lại tên đồng crypto hoặc thử lại sau.');
        }
    },
};

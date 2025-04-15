const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'joke',
    description: 'Lấy một câu đùa vui!',
  
    async execute(message) {
        // Kiểm tra quyền sử dụng lệnh
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ Bạn không có quyền sử dụng lệnh này!');
        }

        const jokes = [
            "Tại sao con gà không thể chơi bóng đá? Vì nó sợ bị trứng vỡ! ",
            "Có biết tại sao sách không biết nói không? Vì nó chỉ có câu chuyện thôi! ",
            "Cái gì luôn ở cuối nhưng lại rất quan trọng? Chính là chữ... Zzzz khi bạn ngủ! ",
            "Tại sao cá không nói chuyện? Vì nó bị ngập trong nước! ",
            "Bạn biết cái gì là nhất không? Đó là 'hài' vì chúng ta đều 'hài lòng' khi cười! "
        ];

        // Lấy câu đùa ngẫu nhiên từ mảng
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        // Gửi câu đùa
        message.channel.send(randomJoke);
    },
};

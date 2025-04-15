const { AllowUserIDs } = require('../../AllowUserIDs');

module.exports = {
    name: 'see',
    description: 'Xem các lệnh trong một danh mục.',
    async execute(message, args) {

        // Kiểm tra nếu người dùng không có trong danh sách AllowUserIDs
        if (!AllowUserIDs.includes(message.author.id)) {
            return message.reply('❌ | Bạn không có quyền thực hiện lệnh này.');
        }

        if (args.length < 1) {
            return message.reply('Vui lòng nhập tên danh mục bạn muốn xem (ví dụ: `see General`).');
        }

        const categoryName = args.join(' ').toLowerCase();
        const categories = [
            { name: 'AutoResponds', commands: [
                '``autorespond add <trigger> <respond>``  ** ( ThêmAutoRespond )**', 
                '``editautorespond <trigger> <new response>``  **( Sửa AutoRespond ) **', 
                '``listautorespond``  **( Xem Danh Sách AutoRespond) **',
                '``removeautorespond <trigger>`` **( Xoá AutoRespond ) **'] 
            }, 

            { name: 'AFK', commands: [
                '``afk <reason>`` **( Sử Dụng Lệnh AFK )', 
                '``unafk`` **( Huỷ Trạng Thái AFK )**'] 
            }, 

            { name: 'Calculate', commands: [
                '``calculate <phép toán>`` **( Tính Toán Thông Thường )** ', 
                '``c2i <số  tiền> <Loại Crypto>`` **( Đổi Từ Crypto Sang INR )** ', 
                '``i2c <số  tiền><inr> <Loại Crypto>`` **( Đổi Từ INR Sang Crypto )** ', 
                '``e2u <số tiền>`` **( Đổi Từ EUR sang USD )**', 
                '``u2e <số tiền>`` **( Đổi Từ USD sang EUR )**', 
                '``v2c <số tiền>`` **( Đổi Từ VNĐ sang CHY (Nhân Dân Tệ) )**', 
                '``c2v <số tiền>`` **( Đổi Từ CHY sang VNĐ )**', 
                '``l2u <số tiền>`` **( Đổi Từ LTC sang USD )**',  
                '``u2l <số tiền>`` **( Đổi Từ USD sang LTC )**', 
                '``l2v <số tiền>`` **( Đổi Từ LTC sang VND )**', 
                '``v2l <số tiền>`` **( Đổi Từ VND sang LTC )**', 
                '``doitien <số tiền> <tiền gốc> to <tiền muốn sang>`` **( Đổi Tiền Này Sang Tiền Kia )**'] 
            },

            { name: 'Config', commands: [
                '``ping``**( Xem Ping Của Selfbot )**', 
                '``prefix <prefix muốn đổi>`` **( Đổi Prefix )**',
                '``showltc`` **( Xem LTC Key mà bạn chỉnh )**', 
                '``setltc <ltc_key>`` **( Thêm LTC Key vào selfbot )**', ] 
            },

            { name: 'Fun', commands: [
                '``joke`` **( Gửi Joke )**', 
                '``meme`` **( Gửi Hình Ânh Meme )**', 
                '``rizz`` **( Thả Vài Câu Rizz )**',
                '``fakenitro`` **( Gửi Link Fake Nitro )**',
                '``fakethread`` **( Fake Thread Giả )**']
            },
            
            { name: 'General', commands: [
                '``userinfo`` **( Xem Info Của Người Dùng)**', 
                '``selfbotinfo`` **( Xem Thông Tin Của Selfbot )**', 
                '``serverinfo`` **( Xem Thông Tin Của Server )**',  
                '``abusewar`` **( Muốn War Thì Sài )**', 
                '``abuse`` **( Abuse 1 Người Dùng Nào Đó Được Mention )**', 
                '``stopabuse`` **( Dừng Abuse )** '] 
            },

            { name: 'Help', commands: [
                '``commands`` **( Xem Các Thư Mục Chứa Lệnh )**', 
                '``see <Tên Thư Mục>`` **( Gửi Các Lệnh Có Trong Thư Mục Đó )** '] 
            },
            { name: 'Image', commands: [
                '``avatar <@user> hoặc <id_user>`` **( Xem Avatar Của Người Dùng )**', 
                '``getbanner <@user> hoặc <id_user`` **( Xem Banner Của Người Dùng )**', 
                '``serverbanner`` **( Lấy Banner Của Server )**', 
                '``servericon`` **( Lấy Logo Của Server )** '] 
            },

            { name: 'Message', commands: [
                '``direct <@user> hoặc <id_user> <message>`` **( Gửi Tin Nhắn Riêng Cho Người Dùng )**', 
                '``leaveallgroup`` **( Rời Tất Cả Các Nhóm Trong DM Của Bạn )**', 
                '``purge <số lượng>``**( Xoá Tin Nhắn, Ko Quá 14 Ngày Và Dưới 100 Tin Nhắn )** ', 
                '``spam <@user> hoặc <id_user> <msg>`` **( Spam Tin Nhắn )** ']
            },

            { name: 'Moderation', commands: [
                '``addrole <@user> <role>`` **( Add Role Cho Người Dùng )**', 
                '``removerole <@user> <role>`` **( Gỡ Role Ra Khỏi Người Dùng )**', 
                '``deleterole <role>`` **( Xoá Role Khỏi Server ) **', 
                '``createchannel <Tên Channel>`` **( Tạo Kênh )**', 
                '``deletechannel <Id Channel> Hoặc <Link Channel>``**( Xoá Kênh )**', 
                '``kick <@user>`` **( Đuổi Người Dùng )**',   
                '``unban <id_user>`` **( Unban Người Dùng )**', 
                '``ban <@user> hoặc <id_user>`` **( Ban Người Dùng Khỏi Server )**'] 
            },
            { name: 'NSFW', commands: [
                '``ass`` **( Lệnh NSFW )**', 
                '``hass`` **( Lệnh NSFW )**'] 
            },

            { name: 'Status', commands: [
                '``playing <tilte>`` **( Chỉnh Trạng Thái )**',
                '``stream <tilte>`` **( Chỉnh Trạng Thái )** ',
                '``watching <tilte>`` **( Chỉnh Trạng Thái )**',
                '``listening <tilte>`` **( Chỉnh Trạng Thái )**',
                '``remove`` **( Xoá Trạng Thái )**'] 
            },

            { name: 'Voice Setting', commands: [
                '``voicejoin <id_channel> hoặc <link_kênh>`` **( Join Vào Voice )**', 
                '``voicecome`` ( Gọi Bạn Vào Voice )** ', 
                '``voicelimit <số lượng> <id kênh voice>`` **( Limit Số Lượng Kênh Voice )**', 
                '``voicelimit <vocuc> <id kênh voice>`` **( Mở Khoá Kênh Voice)** ', 
                '``voicecmove <id user> <id kênh đang ở> to <id voice muốn move>`` **( Chuyển 1 Người Dùng Sang Voice Khác )**', 
                '``voicemoveall <id kênh đang ở> to <id voice muốn move>`` **( Chuyển Tất cả Người Dùng Sang voice Khác )**', 
                '``voicemute <id_user> hoặc <@user> <time>`` **( Cấm mic người dùng )**', 
                '``voiceunmute <id_user> hoặc <@muser>`` **( Gỡ cấm mic )',  
                '``voicedisconnect`` **( Rời Khỏi Kênh Voice )**'] 
            },
            // Thêm các danh mục lệnh khác ở đây
        ];

        const category = categories.find(c => c.name.toLowerCase() === categoryName);
        if (!category) {
            return message.reply('Không tìm thấy **danh mục này**. Hãy thử lại với** tên khác.**');
        }

        let response = `**Lệnh trong danh mục ${category.name}:**\n`;
        response += category.commands.join('\n');

        message.channel.send(response);
    },
};

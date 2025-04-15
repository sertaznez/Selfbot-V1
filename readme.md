#                                     ---      ---    |  /-   |   ----|-----    -----|-----      \    /
#                                         \  /        | /     |       |              |            \  /
#                                          \/         |/      |       |              |             \/
#                                          /\         |\      |       |              |             /
#                                         /  \        | \     |       |              |            /
#                                     ---      ---    |  \_   |       |              |           /
=----------------------------------------------------------------------------------------------------------------------------------------------=

Các aliases trong đây sẽ thêm vào để cho nhớ, nếu bạn không muốn thêm aliases thì thêm "//" vào đầu dòng, // sẽ giúp vô hiệu hoá dòng đó và dòng đó chỉ cho chúng ta xem thôi chứ không có tác dụng gì cả !

# trong thư mục cmds/các thư mục khác, nếu bạn muốn biết cách sử dụng, hãy đọc các file readme.md, tớ có ghi đầy đủ cách sử dụng lệnh trong đó

bạn muốn update thêm tính năng & lệnh, ib trực tiếp cho tui qua discord hoặc facebook
                                                            ID: 865565502957027368
                                                            Facebook: .com/wistelonew
Lệnh phức tạp hay như nào đó thì cứ nhắn
            Lệnh dễ = Free
            Lệnh phức tạp = phí ( dao động từ 5-30k)
    
# Bạn yên tâm sử dụng source này vì tớ sẽ gán AllowUserId vào
#                        AllowUserId là gì? AllowUserid là danh sách id người dùng có sẵn để có thể sử dụng lệnh đó! những người khác sử dụng
#                        thì selfbot sẽ bỏ qua và không phản hồi gì về người dùng ko có trong AllowUserId, ngược lại với AllowUserId thì selfbot
#                        sẽ có phản hồi!                                               

=----------------------------------------------------------------------------------------------------------------------------------------------=

##### /////////////////////////////////////////// HƯỚNG DẪN SỬ DỤNG ///////////////////////////////////////////

# Method 1 | File .env
1. vào file .env sửa DISCORD_TOKEN bằng token của bạn ( cách lấy thì kéo xuống tìm CÁCH LẤY NHỮNG THỨ CẦN CHO VÀO SOURCE )

2. chỗ prefix = > bạn sẽ thay ">" bằng prefix mà bạn mong muốn ( Nếu Bạn Tắt Bot Và Bật Lại, Prefix Vẫn Sẽ Sử Dụng Trong File .env 
                                                                 Nếu Bạn Có Host, Sử Dụng Lệnh <Prefix Trong .env>prefixset <prefix bạn muốn> 
                                                                 Sài Như Vậy Giúp Sử Dụng Prefix Mà Bạn Đã Set Chứ Không Phải Prefix Trong 
                                                                 .env nữa, nếu restart bot mới sử dụng prefix trong .env)

3. sửa ID_DISCORD = ID discord của bạn, điều này giúp cho bạn sử dụng được lệnh afk trong file index.js

# Method 2 | File AllowUserIDs.js

Đoạn   AllowUserIDs: ['ID_User_1', 'ID_User_2']  // Các ID người dùng được phép bạn hãy thay ID_User_1 bằng cách lấy ID của bạn ( Khuyến Nghị nên để ở đầu ), Nếu bạn muốn thêm thì thay chỗ ID_User_2 thành id của người khác và muốn thêm 1 người thứ 3, bạn cần ghi như sau 
    
    AllowUserIDs: ['ID_User_1', 'ID_User_2', 'ID_User_3']  
     
                                              ID_User_3 là người thứ 3 bạn muốn thêm.

nếu bạn không muốn thêm ai khác ngoài bản thân, hãy làm như sau: 
                 AllowUserIDs: ['ID_User_1', 'ID_User_2'] thành  AllowUserIDs: ['ID_User_1'] 
đơn giản là bạn chỉ xoá chỗ , 'ID_User_2' mà thôi.

# Method 3 | Thư Mục cnmds // Chú Ý Phần Này | Nắm Toàn Bộ Lệnh Của Source!

    Về Phần Này Tớ Đã Có Các File note.md Trong Các Danh Mục Rồi, Bạn Nên Đọc Trước Khi Sử Dụng Source Nhé!

# Method 4 | File abuse.txt 

    Bạn muốn sử dụng lệnh abuse thì hãy vô file abuse.txt chỉnh sửa theo ý bạn mong muốn. chỉ việc điền là: 
                                                                    nội dung 1
                                                                    nội dung 2
                                                                    nội dung 3.....
    Đơn giản chỉ vậy thôi đó. nội dung thì các bạn muốn ghi gì cũng được

# Method 5 | Cách Chạy Source

#               ĐẢM BẢO RẰNG MÁY CỦA BẠN ĐÃ TẢI NODEJS VÀ CHO VÀO BIẾN MÔI TRƯỜNG CỦA MÁY, NẾU CHƯA, LÊN YOUTUBE!
    Mở thư mục chứa source, ví dụ của tui là C:\Users\mewza\Desktop\project 2
                                                                    project 2 là tên thư mục chứa source
    Sau đó nhấn vào thanh tìm kiếm, gõ chữ cmd, nó sẽ đưa bạn đến cmd, gõ chữ npm install, sau đó tắt và mở lại source trong VSCODE
    Xong rồi thì mở terminal lên bằng tổ hợp phím CTRL + SHIFT + ` 
    Gõ node index.js, Thấy chạy và không báo lỗi gì là được, nếu có thì nhắn tui để tui support

# Aliase là gì?
Trong lập trình, alias (hay còn gọi là bí danh) là một tên thay thế hoặc tên ngắn gọn cho một đối tượng, module, hoặc một giá trị trong mã nguồn. Alias giúp cho mã nguồn trở nên ngắn gọn, dễ đọc và dễ hiểu hơn, đặc biệt khi sử dụng các tên dài hoặc phức tạp.

# Method 6 | Thêm Aliase

    Nếu bạn thấy lệnh quá dài, có thể thêm aliase
    Ví dụ ở đây tui có lệnh:

#    name: 'commands',
#    description: 'Hiển thị danh sách các danh mục lệnh.', 
    ( trích trong cmds/Help/commands.js)

    Bạn thấy ghi lệnh commands ra nó quá dài đúng không? Hãy thêm aliase bằng cách ghi thêm dòng: 
#    aliases: [''], 

Ví dụ sau khi thêm: 

#    name: 'commands',
#    description: 'Hiển thị danh sách các danh mục lệnh.',
#     aliases: ['cmds'],

Bạn có thể để bất cứ aliase nào để bạn dễ nhớ, tui khuyến nghị nên để tắt theo name của lệnh đó, ví dụ ở trên là name của lệnh commands thì tui têm aliases sẽ ghi là cmds 
=----------------------------------------------------------------------------------------------------------------------------------------------=

##### /////////////////////////////////////////// CÁCH LẤY NHỮNG THỨ CẦN ĐỂ CHO VÀO SOURCE //////////////////////////////////////////////

# 1. Lấy DISCORD_TOKEN
    Bước 1: Vào trình duyệt và đăng nhập tài khoản của bạn
    Bước 2: Nhấn F12 hoặc tổ hợp phím CTRL + SHIFT + I 
    Bước 3: Sang Chỗ Console, Paste Đoạn Này Vào:

(webpackChunkdiscord_app.push([
    [""],
    {},
    (e) => {
        for (let t in ((m = []), e.c)) m.push(e.c[t]);
    },
]),
m)
    .find((e) => e?.exports?.default?.getToken !== void 0)
    .exports.default.getToken();

    Bước 4: Nếu hiện bảng màu vàng hiện gì đó tui quên rồi, thì bạn ghi vào khung lệnh là: allow pasting
    Bước 5: Nếu nó nhả token ra cho bạn rồi thì thôi, nếu chưa hãy paste đoạn mã lấy token (Bước 3) vào
    Bước 6: Token sẽ là 1 dòng chữ số màu đỏ trong 2 dấu '', bạn cần copy token đó và vào file .env paste vào đoạn DISCORD_TOKEN

=----------------------------------------------------------------------------------------------------------------------------------------------=

#                                     ---      ---    |  /-   |   ----|-----    -----|-----      \    /
#                                         \  /        | /     |       |              |            \  /
#                                          \/         |/      |       |              |             \/
#                                          /\         |\      |       |              |             /
#                                         /  \        | \     |       |              |            /
#                                     ---      ---    |  \_   |       |              |           /

#                                    Dev By: fnderlielie ID discord: 865565502957027368 Team Dev: XkittyDev  
#                                       More Project:  Courloy    ,    WhiteCat       ,      Maded
#                                           Dev By:   gnof.dev   ,    gau_candy      ,     fnderlielie

#                                                       VIETNAM GMT +7 04/04/2025 

#                                               DO NOT REUP & SHARE SOURCE DƯỚI MỌI HÌNH THỨC



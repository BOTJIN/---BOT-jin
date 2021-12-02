lệnh bot
const  { existsSync , writeFileSync , removeSync , mkdirSync , copySync , readdirSync }  =  yêu cầu ( "fs-thêm" ) ,
	git                                                                            =  request ( "simple-git" ) ,
	thi hành                                                                           =  yêu cầu ( 'quy trình con' ) . người thực thi ;

thử  {
	var  configValue  =  yêu cầu ( "./config.json" ) ;
	bàn điều khiển . log ( "File config đã tìm thấy" ) ;
}
bắt  ( lỗi )  {
	nếu  ( lỗi )  trả về  bảng điều khiển . log ( "Bot config file not found!" ) ;
}

( async  ( )  =>  {
	bàn điều khiển . log ( "====== VUI LÒNG KHÔNG TẮT CMD / TERMINAL NÀY CHỌN TÚI KHI CẬP NHẬT HOÀN TẤT ======" ) ;
	chờ  sao lưu ( ) ;
	chờ  sạch ( ) ;
	chờ đợi  clone ( ) ;
	chờ  cài đặt ( ) ;
	 mô-đun chờ đợi ( ) ;
	chờ  kết thúc ( ) ;
} ) ( ) ;

chức năng  backup ( )  {
	bàn điều khiển . log ( '-> Xóa cũ sao lưu' ) ;
	removeSync ( './tmp' ) ;
	bàn điều khiển . log ( '-> Đang sao lưu dữ liệu' ) ;
	mkdirSync ( './tmp' ) ;
	if  ( beingSync ( './modules' ) )  copySync ( './modules' ,  './tmp/modules' ) ;
	if  ( ThereSync ( `./ $ { configValue . APPSTATEPATH } ` ) )  copySync ( `./ $ { configValue . APPSTATEPATH } ` ,  `./tmp/ $ { configValue . APPSTATEPATH } ` ) ;
	if  ( beingSync ( './config.json' ) )  copySync ( './config.json' ,  './tmp/config.json' ) ;
	if  ( beingSync ( `./includes/ $ { configValue . DATABASE . sqlite . storage } ` ) )  copySync ( `./includes/ $ { configValue . DATABASE . sqlite . storage } ` ,  `./tmp/ $ { configValue . CƠ SỞ DỮ LIỆU . Sqlite . Storage } ` ) ;
	trở lại ;
}

function  clean ( )  {
	bàn điều khiển . log ( '-> Xóa cũ bản' ) ;
	readdirSync ( '.' ) . forEach ( item  =>  {  if  ( item  ! =  'tmp'  &&  item  ! =  "config.json" )  removeSync ( item ) ;  } ) ;
	trở lại ;
}

function  clone ( )  {
	bàn điều khiển . log ( '-> Download new update' ) ;
	trả về  Lời hứa mới  ( chức năng ( giải quyết , từ chối ) {   
		git ( ) . clone ( 'https://github.com/miraipr0ject/miraiv2' ,  './tmp/newVersion' ,  [ ] ,  result  =>  {
			if  ( result  ! =  null )  allow ( '[!] Cannot download update [!]' ) ;
			giải quyết ( ) ;
		} ) ;
	} ) ;
}

function  install ( )  {
	bàn điều khiển . log ( '-> Installing new update' ) ;
	copySync ( './tmp/newVersion' ,  './' ) ;
	trở lại ;
}

 mô-đun hàm ( )  {
	trả về  Lời hứa mới  ( chức năng ( giải quyết , từ chối ) {   
		bàn điều khiển . log ( '-> Đang cài đặt các mô-đun' ) ;
		let  child  =  exec ( 'npm install' ) ;
		đứa trẻ . stdout . on ( 'end' ,  giải quyết ) ;
		đứa trẻ . stderr . on ( 'data' ,  data  =>  {
			nếu  ( dữ liệu . toLowerCase ( ) . bao gồm ( 'lỗi' ) )  {
				bàn điều khiển . error ( '[!] Có một lỗi xảy ra. Vui lòng tạo bài đăng và gửi tệp updateError.log ở Issue mục trên Github [!]' ) ;
				data  =  dữ liệu . thay thế ( / \ r ? \ n | \ r / g ,  '' ) ;
				writeFileSync ( 'updateError.log' ,  dữ liệu ) ;
				bác bỏ ( ) ;
			}
		} ) ;
	} ) ;
}

hàm  finish ( )  {
	bàn điều khiển . log ( '-> Hoàn tất' ) ;
	if  ( ThereSync ( `./tmp/ $ { configValue . APPSTATEPATH } ` ) )  copySync ( `./tmp/ $ { configValue . APPSTATEPATH } ` ,  `./ $ { configValue . APPSTATEPATH } ` ) ;
	if  ( beingSync ( `./tmp/ $ { configValue . DATABASE . sqlite . storage } ` ) )  copySync ( `./tmp/ $ { configValue . DATABASE . sqlite . storage } ` ,  `./includes/ $ { configValue . CƠ SỞ DỮ LIỆU . Sqlite . Storage } ` ) ;
	
	if  ( beingSync ( "./tmp/newVersion" ) )  removeSync ( "./tmp/newVersion" ) ;
	bàn điều khiển . log ( '>> Cập nhật hoàn tất <<' ) ;
	bàn điều khiển . log ( '>> TẤT CẢ DÂN DỤNG LIỆU PHÁP DỰ ÁN LÀ SAO LƯU VÀO THƯ MỤC "tmp" <<' ) ;
	 quy trình trả lại . thoát ra ( 0 ) ;
}

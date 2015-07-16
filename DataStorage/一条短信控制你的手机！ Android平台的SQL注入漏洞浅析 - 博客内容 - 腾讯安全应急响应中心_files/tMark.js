//********************************************************************************
//** 一键转载文章到新浪微博和腾讯微博
//** 
//** 西门的后花园
//** http://ons.me/
//********************************************************************************
document.writeln("<a href=\"javascript:void(0);\" onclick=\"qqWb();\" style=\"background:url(\/images\/QQ_w.gif) no-repeat; padding:0 0 0 20px;  text-decoration:none; \">转发至腾讯微博<\/a>");

document.writeln("<a href=\"javascript:void((function(s,d,e){try{}catch(e){}var f='http:\/\/v.t.sina.com.cn\/share\/share.php?',u=d.location.href,p=['url=',e(u),'&title=',e(d.title),'&appkey='].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)\/2,',top=',(s.height-450)\/2].join('')))u.href=[f,p].join('');};if(\/Firefox\/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent));\" style=\"background:url(\/images\/sina_w.gif) no-repeat; padding:0 0 0 20px; text-decoration:none; \">转发至新浪微博<\/a>");

function qqWb(){
	var _t = encodeURI(document.title);
	var _url = encodeURI(window.location);
	var _source = 1000000;
	var _site = encodeURI('http://security.tencent.com/');
	var _pic = '';
	var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&source='+_source+'&site='+_site+'&pic='+_pic;
	window.open(_u,'转播到腾讯微博', 'width=700, height=480, top=320, left=180, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no');
}
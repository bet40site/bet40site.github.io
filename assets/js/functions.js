/* 로그 기록시 안정성을 위하여 */
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

//콤마 추가.
function AddComma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마 삭제.
function DelComma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

//AJAX 수신.
function PostJson(PostUrl, JsonData, CallBack, syncWork)
{
	if (typeof(syncWork)=="undefined")
	{
		syncWork=true;
	}

	$.ajax({
		url: PostUrl,
		cache:false,
		async:syncWork,
		data: JsonData,
		dataType: "json",
		beforeSend: function (){},
		success: function(ReturnData) {
			if(CallBack) {
				CallBack(ReturnData);	
			}
			
		},
		error : function () {
			
		},
		timeout: 10000,
		type: "POST"
	});
}

//AJAX 수신.
function PostJsonp(PostUrl, JsonData, CallBack, syncWork)
{
    if (typeof(syncWork)=="undefined")
    {
        syncWork=true;
    }

    $.ajax({
        url: PostUrl,
        cache:false,
        async:syncWork,
        data: JsonData,
        dataType: "jsonp",
        beforeSend: function (){},
        success: function(ReturnData) {
            if(CallBack) {
                CallBack(ReturnData);   
            }
            
        },
        error : function () {
            
        },
        timeout: 10000,
        type: "POST"
    });
}

function SetWon(pWon) {
    var won = GetNumber(pWon);
    var arrWon = ["원", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
    var changeWon = "";
    var pattern = /(-?[0-9]+)([0-9]{4})/;
    while (pattern.test(won)) {
        won = won.replace(pattern, "$1,$2");
    }
    var arrCnt = won.split(",").length - 1;
    for (var ii = 0; ii < won.split(",").length; ii++) {
        if (arrWon[arrCnt] == undefined) {
            alert("값의 수가 너무 큽니다.");
            break;
        }
        var tmpwon = 0;
        for (i = 0; i < won.split(",")[ii].length; i++) {
            var num1 = won.split(",")[ii].substring(i, i + 1);
            tmpwon = tmpwon + Number(num1);
        }
        if (tmpwon > 0) {
            changeWon += won.split(",")[ii] + arrWon[arrCnt]; //55억0000만0000원이런 형태 방지 0000 다 짤라 버린다
        }
        arrCnt--;
    }
    return changeWon;
}
function LeadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}

	return zero + n;
}

function CutStr(str,limit,dot_type){
	if(typeof(dot_type) == 'undefined') {
		dot_type = false;
	}
	var tmpStr = str;
	var byte_count = 0;
	var len = str.length;
	var dot = "";
	for(i=0; i<len; i++){
		byte_count += charByte(str.charAt(i));
		if(byte_count == limit-1){
			if(charByte(str.charAt(i+1)) == 2){
				tmpStr = str.substring(0,i+1);
				dot = (dot_type == false) ? '...' : '***';
			} else {
				if(i+2 != len){
					dot = (dot_type == false) ? '...' : '***';
				}
				tmpStr = str.substring(0,i+2);
			}
			break;
		} else if(byte_count == limit){
			if(i+1 != len){
				dot = (dot_type == false) ? '...' : '***';
			}
			tmpStr = str.substring(0,i+1);
			break;
		}
	}

	return tmpStr+dot;
}
//for requiring a script loaded asynchronously.
function LoadScript(src, callback, relative){
    var baseUrl = CONFIG.ASSETS;
    var script = document.createElement('script');
    if(relative === true){
        script.src = baseUrl + src;  
    }else{
        script.src = src; 
    }

    if(callback !== null){
        if (script.readyState) { // IE, incl. IE9
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function() { // Other browsers
                callback();
            };
        }
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}
function GetNumber(str){
    var res;
    res = str.replace(/[^0-9]/g,"");
    return res;
}
//EXAMPLE
/*
loadAsync('https://www.gstatic.com/charts/loader.js' , function(){
    chart.loadCharts();
    });
// OR relative path
loadAsync('fastclick.js', null, true);
 */

function SumArray(array) {
  for (
    var
      index = 0,              // The iterator
      length = array.length,  // Cache the array length
      sum = 0;                // The total amount
      index < length;         // The "for"-loop condition
      sum += array[index++]   // Add number on each iteration
  );
  return sum;
}

function resizePopup(element) {
    var strWidth;
    var strHeight;
    //innerWidth / innerHeight / outerWidth / outerHeight 지원 브라우저
    if ( window.innerWidth && window.innerHeight && window.outerWidth && window.outerHeight ) {
        strWidth = $(element).outerWidth() + (window.outerWidth - window.innerWidth);
        strHeight = $(element).outerHeight() + (window.outerHeight - window.innerHeight);
    } else {
        var strDocumentWidth = $(document).outerWidth();
        var strDocumentHeight = $(document).outerHeight();
        window.resizeTo ( strDocumentWidth, strDocumentHeight );
        var strMenuWidth = strDocumentWidth - $(window).width();
        var strMenuHeight = strDocumentHeight - $(window).height();
        strWidth = $(element).outerWidth() + strMenuWidth;
        strHeight = $(element).outerHeight() + strMenuHeight;
    }
    //resize
    window.resizeTo( strWidth, strHeight );
}

function AddBetMoney(p_money, element) {
    var my_betting_money = $(element).val();
    my_betting_money = FilterNum(my_betting_money);
    if(p_money > 0) {
        my_betting_money = Number(p_money) + Number(my_betting_money);
    } else {
        my_betting_money = 0;
    }
    $(element).val(MoneyFormat(my_betting_money));
}

//금액 (,) 자동 삽입기능
function MoneyFormat(str) {
    //var  frm = document.getElementById("bt");
    var re="";
    str = str + "";
    str=str.replace(/-/gi,"");
    str=str.replace(/ /gi,"");
    
    str2=str.replace(/-/gi,"");
    str2=str2.replace(/,/gi,"");
    str2=str2.replace(/\./gi,"");   
    
    if(isNaN(str2) && str!="-") return "";
    try
    {
        for(var i=0;i<str2.length;i++)
        {
            var c = str2.substring(str2.length-1-i,str2.length-i);
            re = c + re;
            if(i%3==2 && i<str2.length-1) re = "," + re;
        }
        
    }catch(e)
    {
        //bt.bisMoney.value = "";
        re="";
    }
    
    if(str.indexOf("-")==0)
    {
        //bt.bisMoney.value = "-" + str2;
        re = "-" + re;
    }
    
    //alert(str2);
    //bt.bisMoney.value = str2;
    
    return re;
}

// 콤마 제거
function FilterNum(str) {
    var re = /^\$|,/g; 
    return str.replace(re, ""); 
}

function ClientPopup(url, name) {
    if(typeof(name) == 'undefined') {
        name = 'name';
    }
    newwindow = window.open(url,name,'width=1366,height=768,scrollbars=yes');
    if (window.focus) {newwindow.focus()}
    return false;
}

/******************************************************************
 * MEMORY STORE
 *****************************************************************/
var store = {
    data : {},
    set : function (key, value) {
        this.data[key] = value;

        if(typeof(this.data[key]) != 'undefined') {
            return true;
        } else {
            return this.data[key];
        }
    },
    get : function (key) {
        if(typeof(key) != 'undefined') {
            if(this.data[key] == '' || this.data[key] == false || this.data[key] == null) {
                return false;
            } else {
                return this.data[key];
            }
        }
    },
    del : function (key) {
        this.data['key'] = false;
    }
}

var cookie = {
    get : function (key) {
        var name = key + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    set : function (key, value, exdays) {
        if(typeof(exdays) == 'undefined') {
            exdays = 1;
        } else if (typeof(exdays) != 'number') {
            exdays = parseInt(exdays);
        }
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
        console.log(key, value)
    }
}

function RL(key, text) {
    if(typeof(LANG[key]) == 'undefined') {
        return '@'+key+'@';
    } else {
        return LANG[key].replace('%s', text);
    }
}


$.fn.notice = $.notice = function(arr) {
    var opt = $.extend({
            text: "Lorem ipsum.",
            type: "info",
            canAutoHide: true,
            holdup: "1000",
            fadeTime: "100",
            canFadeHover: true,
            hasCloseBtn: true,
            canCloseClick: false,
            position: 'top-right',
            zIndex: '9999',
            custom: ''
        }, arr),
        el = {
            chkPosition: (opt.position == 'bottom-right') ? 'bottom-right' : ((opt.position == 'bottom-left') ? 'bottom-left' : (opt.position == 'top-left') ? 'top-left' : 'top-right'),
            closeOption: (opt.hasCloseBtn) ? '<notice-close></notice-close>' : '<style>#nt' + timeStamp + ':before,#nt' + timeStamp + ':after{display:none}</style>',
            chkMsg: (opt.text.indexOf(" ")) ? 'white-space: pre-wrap; word-wrap: break-word;' : ''
        }, timeStamp = $.now();
    if ($('notice-wrap').length == 0)
        $('body').append('<notice-wrap position="top-left" style="z-index:' + opt.zIndex + '"><notice-begin></notice-begin></notice-wrap><notice-wrap position="top-right" style="z-index:' + opt.zIndex + '"><notice-begin></notice-begin></notice-wrap><notice-wrap position="bottom-right" style="z-index:' + opt.zIndex + '"><notice-begin></notice-begin></notice-wrap><notice-wrap position="bottom-left" style="z-index:' + opt.zIndex + '"><notice-begin></notice-begin></notice-wrap>');
    var notice = $('<notice class="' + opt.custom + '"' + '" close-on-click=' + opt.canCloseClick + ' fade-on-hover=' + opt.fadeOnHover + ' type="' + opt.type + '" style="' + el.chkMsg + '">' + opt.text + el.closeOption + '</notice>')
        .insertAfter('notice-wrap[position="' + el.chkPosition + '"] > notice-begin');
    if (opt.canAutoHide)
        setTimeout(function() {
            notice.fadeOut(opt.fadeTime, function() {
                $(this).remove();
            });
        }, opt.holdup);
    $('notice[close-on-click="true"]').click(function() {
        $(this).fadeOut(opt.fadeTime, function() {
            $(this).remove();
        });
    });
    $('notice > notice-close').click(function() {
        $(this).parent()
            .fadeOut(opt.fadeTime, function() {
                $(this).remove();
            });
    });
    return this;
};

console.warn('[FUNCTIONS.JS] LOADED');
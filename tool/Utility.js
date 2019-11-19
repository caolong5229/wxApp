export default class Utility {
  /*
   *  判断字符串是否为空
   *
   * */
  static isStringEmpty(str) {
    str = str + "";
    if (str == undefined || str == "undefined" || str == null || str == "null" || str == "" || str == "NaN") {
      return true;
    }
    return false;
  };
   /*
   *  判断是否为字符串
   *
   * */
  static isString(str) {
    return (typeof str == 'string') && str.constructor == String;
  };
  /*
   *  判断是否为数组
   *
   * */
  static isArray(str) {
    return (typeof str == 'object') && str.constructor == Array;
  };
  /*
   *  判断是否为数值类型
   *
   * */
  static isNumber(str) {
    return (typeof str == 'number') && str.constructor == Number;
  };
  /*
   *  判断是否为日期类型
   *
   * */
  static isDate(str) {
    return (typeof str == 'object') && str.constructor == Date;
  };
  /*
   *  判断是否为对象
   *
   * */
  static isObject(str) {
    return (typeof str == 'object') && str.constructor == Object;
  };
  /*
   *  除去所有的空格
   *
   * */
  static removeAllSpace(str) {
    str = str + "";
    if (!Utility.isStringEmpty(str)) {
      return str.replace(/\s+/g, "");
    } else {
      return "";
    }
  };
  /*
   *  判断数组是否为空
   *
   * */
  static isArrEmpty(str) {
    if (Utility.isStringEmpty(str) || str.length == 0) {
      return true;
    }
    return false;
  };
  /*
   *  判断字符串是否有中文
   *
   * */
  static isChineseEmpty(o) {
    let str = o.split("\\")[o.split("\\").length - 1];
    let re = /[\u0391-\uFFE5]+/g;
    if (str.match(re) != null)
      return false; // 有中文
    else
      return true; // 无中文
  };
  /*
   *  获取随机字符串
   *  len：长度
   *
   * */
  static randomString(len) {
    len = len || 32;
    /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  };
  /*
   *  获取随机长度数字字符
   *  len：长度
   *
   * */
  static randomInt(len) {
    let Num = "";
    for (let i = 0; i < len; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    return Num;
  };
  /*
   *  生成有时效的Cookie
   *  key：键
   *  val：值
   *  time：时间（ s是秒， 20秒则：s20  m是分钟 20分钟则：m20  h是小时，12小时则：h12   d是天数，30天则：d30）
   *
   * */
  static setCookieTime(key, val, time) {
    let str1 = time.substring(1, time.length) * 1;
    let str2 = time.substring(0, 1);
    let strsec = "";
    if (str2 == "s") {
      strsec = str1 * 1000;
    } else if (str2 == "m") {
      strsec = str1 * 60 * 1000;
    } else if (str2 == "h") {
      strsec = str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
      strsec = str1 * 24 * 60 * 60 * 1000;
    }
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = key + "=" + escape(val) + ";expires=" + exp.toGMTString();
  };

  /*
   *  生成无时效的Cookie
   *  key：键
   *  val：值
   *
   * */
  static setCookie(key, val) {
    document.cookie = key + "=" + val; //设置cookie
  };
  /*
   *  获取Cookie
   *  key：键
   *
   * */
  static getCookie(key) {
    let getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
    let arrCookie = getCookie.split(";") //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    let tips; //声明变量tips
    for (let i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
      let arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1]; //将cookie的值赋给变量tips
        break; //终止for循环遍历
      }
    }
    return tips;
  };

  /*
   *  删除Cookie
   *  key：键
   *
   * */
  static delCookie(key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = Utility.getCookie(key);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  };

  /*
   *  判断Cookie是否过期
   *  key：键
   *
   * */
  static isCookieOverdue(key) {
    let exp = document.cookie.indexOf(key + "=");
    if (exp == -1) {
      return true;
    } else {
      return false;
    }
  };
  /*
   *
   * 求某时间至今天的天数差 日期格式为 hh:mm:ss
   * startTime:时间差
   * */
  static intervalTime(startTime) {

    //计算出相差天数
    let days = Math.floor(startTime / (24 * 3600 * 1000));
    //计算出小时数
    let hours = Math.floor((startTime % (24 * 3600 * 1000) / (3600 * 1000)));
    if (hours < 10) {
      hours = "0" + hours
    }
    //计算相差分钟数
    let minutes = Math.floor((startTime % (60 * 60 * 1000)) / (60 * 1000));
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    //计算相差秒数
    let seconds = Math.round(startTime % (60 * 1000) / 1000);
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    return (days < 1 ? "" : days + "天") + hours + ":" + minutes + ":" + seconds
  }
  /*
   *
   * 格式化 YYYYMMDDHHMMSS 为 YYYY年MM月DD日 HH时MM分SS秒
   * inStr：日期
   *
   * */
  static formateDate(inStr) {
    if (inStr == null)
      return "";
    if (inStr.length < 6)
      return "";
    if (inStr.length == 6)
      inStr = inStr.substr(0, 4) + "年" + inStr.substr(4, 2) + "月";
    else if (inStr.length == 8)
      inStr = inStr.substr(0, 4) + "年" + inStr.substr(4, 2) + "月" +
        inStr.substr(6, 2) + "日";
    else if (inStr.length == 12)
      inStr = inStr.substr(0, 4) + "年" + inStr.substr(4, 2) + "月" +
        inStr.substr(6, 2) + "日 " + inStr.substr(8, 2) + "时" +
        inStr.substr(10, 2) + "分";
    else if (inStr.length >= 14)
      inStr = inStr.substr(0, 4) + "年" + inStr.substr(4, 2) + "月" +
        inStr.substr(6, 2) + "日 " + inStr.substr(8, 2) + "时" +
        inStr.substr(10, 2) + "分" + inStr.substr(12, 2) + "秒";

    return inStr;
  };
  /*
   *
   * 格式化 YYYYMMDD 为 YYYY-MM-DD HH:MM
   * inStr：日期
   *
   * */
  static formateEnDateTime(inStr) {
    if (inStr == null)
      return "";
    if (inStr.length < 6)
      return "";
    if (inStr.length == 6)
      inStr = inStr.substr(0, 4) + "-" + inStr.substr(4, 2);
    if (inStr.length == 8)
      inStr = inStr.substr(0, 4) + "-" + inStr.substr(4, 2) + "-" +
        inStr.substr(6, 2);
    else if (inStr.length == 12)
      inStr = inStr.substr(0, 4) + "-" + inStr.substr(4, 2) + "-" +
        inStr.substr(6, 2) + " " + inStr.substr(8, 2) + ":" +
        inStr.substr(10, 2);
    else if (inStr.length >= 14)
      inStr = inStr.substr(0, 4) + "-" + inStr.substr(4, 2) + "-" +
        inStr.substr(6, 2) + " " + inStr.substr(8, 2) + ":" +
        inStr.substr(10, 2) + ":" + inStr.substr(12, 2);
    return inStr;
  };
  /*
   *
   * 质朴长存法
   * num:值
   * n：位数
   *
   * */
  static leftPad(num, n) {
    let len = num.toString().length;
    while (len < n) {
      num = "0" + num;
      len++;
    }
    return num;
  };
  /*
   *
   * 获取今天后几天或前几天的日期
   * days： 大于0 表示后几天，小于0 表示前几天
   * sepa：分割符
   *
   * */
  static getNowDateOfDays(days, separ) {
    let myDate = new Date(); // 今天
    myDate.setDate(myDate.getDate() + days);
    let stryear = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    let strMonth = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let strDate = myDate.getDate(); // 获取当前日(1-31)

    return stryear + separ + Utility.leftPad(strMonth, 2) + separ +
      Utility.leftPad(strDate, 2);
  };
  /*
   *
   * 获取今天的年月日
   * sepa：分割符
   *
   * */
  static getNowDate(separ) {
    let myDate = new Date();
    let stryear = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    let strMonth = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let strDate = myDate.getDate(); // 获取当前日(1-31)

    return stryear + separ + Utility.leftPad(strMonth, 2) + separ +
      Utility.leftPad(strDate, 2);
  };
  /*
   *
   * 获取今天的时分秒
   * sepa：分割符
   *
   * */
  static getNowTime(separ) {
    let myDate = new Date();
    let strhour = myDate.getHours(); // 获取当前小时数(0-23)
    let strm = myDate.getMinutes(); // 获取当前分钟数(0-59)
    let strs = myDate.getSeconds(); // 获取当前秒数(0-59)

    return Utility.leftPad(strhour, 2) + separ + Utility.leftPad(strm, 2) +
      separ + Utility.leftPad(strs, 2);
  };
  /*
   *
   * 获取今天的年月日时分秒
   * sepa：分割符
   *
   * */
  static getMinuteDateTime(separ1, separ2, separ3) {
    let myDate = new Date();
    let stryear = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    let strMonth = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let strDate = myDate.getDate(); // 获取当前日(1-31)
    let strhour = myDate.getHours(); // 获取当前小时数(0-23)
    let strm = myDate.getMinutes(); // 获取当前分钟数(0-59)
    let strs = myDate.getSeconds(); // 获取当前秒数(0-59)
    if (strs < 10) {
      strs = "0" + strs;
    }
    return stryear + separ1 + Utility.leftPad(strMonth, 2) + separ1 +
      Utility.leftPad(strDate, 2) + separ2 +
      Utility.leftPad(strhour, 2) + separ3 + Utility.leftPad(strm, 2) +
      separ3 + strs
  };
  /*
   *
   * 获取中文年月日时分
   * sepa：分割符
   *
   * */
  static getChineseDateTime(separ3) {
    let myDate = new Date();
    let stryear = myDate.getFullYear(); // 获取完整的年份(4位,1970-????)
    let strMonth = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
    let strDate = myDate.getDate(); // 获取当前日(1-31)
    let strhour = myDate.getHours(); // 获取当前小时数(0-23)
    let strm = myDate.getMinutes(); // 获取当前分钟数(0-59)

    return stryear + "年" + Utility.leftPad(strMonth, 2) + "月" +
      Utility.leftPad(strDate, 2) + "日" + Utility.leftPad(strhour, 2) +
      separ3 + Utility.leftPad(strm, 2);
  };
  /*
   *
   * 写本地Session文件
   * key：键
   * value：值
   *
   * */
  static setItem(key, value) {
    window.sessionStorage.setItem(key, value);
  };

  /*
   *
   * 获取本地session文件
   * key：键
   *
   * */
  static getItem(key) {
    let str = window.sessionStorage.getItem(key);
    if (Utility.isStringEmpty(str))
      str = "";
    return str;
  };

  /*
   *
   * 移除本地session文件
   * key：键
   *
   * */
  static removeItem(key) {
    window.sessionStorage.removeItem(key);
  };

  /*
   *
   * 清空本地session文件
   *
   * */
  static clearStorage() {
    window.sessionStorage.clear();
    if (1 != 1) {
      for (let i = 0; i < window.sessionStorage.length; i++) {
        window.sessionStorage.removeItem(window.sessionStorage.key(i));
      }
    }
  };
  /*
   *
   * 密码校验
   * password:密码
   *
   * */
  static passwordCheckoutFun(password) {
    let failMsgSet = "";
    let keyboard = ["1qa", "2ws", "3ed", "4rf", "5tg", "6yh", "7uj", "8ik", "9ol", "0p;",
      "qaz", "wsx", "edc", "rfv", "tgb", "yhn", "ujm", "ik,", "ol.", "!QA", "@WS", "#ED", "$RF", "%TG", "^YH",
      "&UJ", "*IK", "(OL", ")P:", "123", "234", "345", "456", "567", "678", "789", "890", "90-", "0-=", "qwe",
      "wer", "ert", "rty", "tyu", "yui", "uio", "iop", "op[", "p[]", "asd", "sdf", "dfg", "fgh", "ghj", "hjk",
      "jkl", "kl;", "l;\"", "zxc", "xcv", "cvb", "vbn", "bnm", "nm,", "m,.", "!@#", "@#$", "#$%", "$%^", "%^&",
      "^&*", "&*(", "*()", "()_", ")_+"];
    //检查密码是否为空
    if (Utility.isStringEmpty(password)) {
      failMsgSet = "密码不能为空";
      return failMsgSet;
    }
    // 检查密码长度
    if (password.length < 8) {
      failMsgSet = "密码为长度不足8位弱口令";
      return failMsgSet;
    }
    // 检查密码复杂度
    let complexity = 0;
    if (/.*[0-9]{1,}.*/.test(password)) {
      complexity++;
    }
    if (/.*[a-z]{1,}.*/.test(password)) {
      complexity++;
    }
    if (/.*[A-Z]{1,}.*/.test(password)) {
      complexity++;
    }
    if (/.*[~!@#$%^&*()_+\[\]\{}|,./<>?].*/.test(password)) {
      complexity++;
    }
    if (complexity < 3) {
      failMsgSet = "密码为字符种类不足3种弱口令";
      return failMsgSet;
    }
    // 以下转为小写进行检查
    password = password.toLowerCase();
    // 检查密码是否包含手机号码
    if (password.length >= 11) {
      if (/.*1[3|4|5|8][0-9]\d{8}.*/.test(password)) {
        failMsgSet = "密码为手机号码弱口令";
        return failMsgSet;
      }
    }
    // 检查密码是否包含生日：年月、月日、年月日，暂不考虑闰年2月29日
    if (/.*(19|20)\d{2}(0[1-9]|1[0-2]).*/.test(password) // 包含年月
      || /.*((01|03|05|07|08|10|12)([0-2][1-9]|3[0-1])|(04|06|09|11)([0-2][1-9]|30)|(02)([0-1][1-9]|2[0-8])).*/.test(password) // 包含月日
      || /.*(19|20)\d{2}((01|03|05|07|08|10|12)([0-2][1-9]|3[0-1])|(04|06|09|11)([0-2][1-9]|30)|(02)([0-1][1-9]|2[0-8])).*/.test(password)) { // 包含年月日
      failMsgSet = "密码为包含日期弱口令";
      return failMsgSet;
    }
    // 检查密码是否包含3位以上（含3位）键盘排序密码
    for (let i = 0; i < keyboard.length; i++) {
      let curr = keyboard[i];
      curr = curr.toLowerCase();
      if (password.indexOf(curr) > -1) {
        failMsgSet = "密码为键盘相邻字符弱口令";
        // return  failMsgSet;
        continue;
      }
    }
    if (failMsgSet) {
      return failMsgSet;
    }
    let sequentialLetter = "abcdefghijklmnopqrstuvwxyz"; // 倒序字母表：zyxwvutsrqponmlkjihgfedcba
    let sequentialNumber = "01234567890"; // 倒序数字：09876543210
    let sequentialChar = "~!@#$%^&*()_+[]\\{}|,./<>?"; // 倒序特殊字符表：?></.,|}{\\][+_)(*&^%$#@!~
    // 检查密码是否包含3位以上（含三位）连续字符或3位以上（含三位）重复字符
    for (let j = 0; j < password.length - 2; j++) {
      //// 检查三位相同字母
      let str1 = password.charAt(j) + password.charAt(j) + password.charAt(j);
      if (password.indexOf(str1) > -1) {
        let failMsg = "密码为重复字符弱口令" + str1;
        //return  failMsg;
        if (!(failMsgSet.indexOf(failMsg) > -1)) {
          failMsgSet += failMsg + ",";
        }
        break;
      }
      // 检查连续三位字母
      let str2 = password.substring(j, j + 3);
      if (sequentialLetter.indexOf(str2) > -1 || sequentialNumber.indexOf(str2) > -1 || sequentialChar.indexOf(str2) > -1) {
        let failMsg = "密码为连续字符弱口令" + str2;
        if (!failMsgSet.indexOf(failMsg) > -1) {
          failMsgSet += failMsg + ",";
        }
        break;
      }
    }
    //返回错误提示
    return failMsgSet;
  };
  /*
   *
   * 自定义数组去重函数
   * array : 数据
   *
   * */
  static removalDuplicate(array) {
    return Array.from(new Set(array));
  };
  /*
   *
   * JSON数组去重
   * @param array jsonArray
   * @param key 根据此key名进行去重
   *
   */
  static uniqueJsonArray(array, key) {
    let temp = {}, result = [];
    array.map((item, index) => {
      if (!temp[item[key]]) {
        result.push(item);
        temp[item[key]] = true
      }
    })
    return result;
  };
}
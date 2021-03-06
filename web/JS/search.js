function serarch(hno) {
    $.ajax({
        type: "GET", //请求方式
        url: "/searchServlet",//请求路径
        cache: false,
        //传参
        data: "hno=" + hno,
        dataType: 'json',//返回值类型
        success: function (json) {
            alert('123');
            var k = "";
            for (var i in json) {
                var url = "/uploadServlet?hno=" + json[i].hno;
                k = k + "<tr><th>" + json[i].hno + "</th>" +
                    "<th>" + json[i].hcontent + "</th>" +
                    "<th>" + ChangeDateFormat(json[i].beginTime) + "</th>" +
                    "<th>" + ChangeDateFormat(json[i].endTime) + "</th>" +
                    "<th><a href=\"/hfileDownloadServlet?hno=" + json[i].hno + "&hfile=" + json[i].hfile + "\">" + json[i].hfile + "</a></th>" +
                    "<th><form action=" + url + " id=\"uploadFile" + i + "\" enctype=\"multipart/form-data\" method=\"post\">" +
                    "<input type=\"file\" id= file" + i + " name=\"filename\" value=\"选择文件\"></form></th>" +
                    "<th><input type=\"button\" onclick=\"submit(" + i + ")\" value=\"提交\"></th>" +
                    "</tr>";
            }
            alert(k);
            document.getElementById("homework").insertAdjacentHTML("beforeend", k);// = s
        },
        error: function () {
            alert("error,查询失败...");//弹出返回过来的List对象
            self.location = "main.html";
        }
    });
}

/**
 * @return {string}
 */
function DateFormat(d) {
    if (d == null) {
        return;
    }
    //将时间戳转为int类型，构造Date类型
    var date = new Date(parseInt(d.time, 10));

    //月份得+1，且只有个位数时在前面+0
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

    //日期为个位数时在前面+0
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    //时间
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    //getFullYear得到4位数的年份 ，返回一串字符串
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute;
}

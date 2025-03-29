---
title: HTML基础
date: 2024-10-19 14:42:21
permalink: /front/html/
categories:
  - 前端
  - html
tags:
  - 
author: Manaphy
---
## 计算器案例
```html
<html>
	<head>
		<title>计算器</title>
		<meta charset="UTF-8"/>
		<!--声明css代码域-->
		<style type="text/css">
		/*设置div样式*/
			#showdiv{
				border:  solid 1px;
				border-radius: 10px;/*设置边框角度*/
				width: 320px;
				height:400px;
				text-align: center;
				margin: auto;/*设置居中*/
				margin-top: 50px;
				background-color: floralwhite;	
			
				
			}
		/*设置输入框样式*/
			input[type=text]{
				margin-top: 20px;
				width: 290px;
				height: 40px;
				font-size: 20px;
				
			}
		/*设置按钮样式*/
			input[type=button]{
				width: 60px;
				height: 60px;
				margin-top: 20px;
				margin-left: 5px;
				margin-right: 5px;
				font-size: 30px;
				font-weight: bold;
				font-family: "微软雅黑";
			}  
		</style>
		<!--声明js代码域-->
		<script type="text/javascript">
			//声明函数
			function test(btn){
				//获取button按钮对象的value值
				var num=btn.value;
				//根据用户点击动作执行对应的业务逻辑
				switch (num){
					case "=":
						document.getElementById("inp").value=eval(document.getElementById("inp").value);
						break;
					case "c":
						document.getElementById("inp").value="";
						break;
					default:
						//将按钮的值赋值给input输入框
						document.getElementById("inp").value=document.getElementById("inp").value+num;
						break;
				}
			}
		</script>
	</head>
	<body>
		<div id="showdiv">
			<input type="text" name="" id="inp" value="" readonly="readonly"/><br />
			<input type="button" name="" id="btn" value="1"value="" onclick="test(this)"/>
			<input type="button" name="" id="" value="2" onclick="test(this)"/>
			<input type="button" name="" id="" value="3" onclick="test(this)"/>
			<input type="button" name="" id="" value="4" onclick="test(this)"/><br />
			<input type="button" name="" id="" value="5" onclick="test(this)"/>
			<input type="button" name="" id="" value="6" onclick="test(this)"/>
			<input type="button" name="" id="" value="7" onclick="test(this)"/>
			<input type="button" name="" id="" value="8" onclick="test(this)"/><br />
			<input type="button" name="" id="" value="9" onclick="test(this)"/>
			<input type="button" name="" id="" value="+" onclick="test(this)"/>
			<input type="button" name="" id="" value="-" onclick="test(this)"/>
			<input type="button" name="" id="" value="*" onclick="test(this)"/><br />
			<input type="button" name="" id="" value="0" onclick="test(this)"/>
			<input type="button" name="" id="" value="/" onclick="test(this)"/>
			<input type="button" name="" id="" value="c" onclick="test(this)"/>
			<input type="button" name="" id="" value="=" onclick="test(this)"/>
		</div>
	</body>
</html>
```

## 全选案例
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			window.onload = function() {
				//派发事件
				//方式一
				// document.getElementById("checkAll").onclick=function(){
				//方式二 addEventListener() 参数一:事件的名字(不带on) 参数二:触发事件一的函数
				document.getElementById("checkAll").addEventListener("click", function() {
					var flag = this.checked;
					var arr = document.getElementsByClassName("ck");
					for (var i = 0; i < arr.length; i++) {
						arr[i].checked = flag;
					}
					getSum();
				})
			}

			function getSum() {
				var money = 0;
				var ck = document.getElementsByClassName("ck");
				for (var i = 0; i < ck.length; i++) {
					if (ck[i].checked) {
						money += parseFloat(ck[i].value);
					}
				}
				var sum = document.getElementById("sum");
				sum.innerHTML = money;
			}
		</script>
	</head>
	<body>
		<div>

			<div>
				全选/全不选<input type="checkbox" id="checkAll" <!-- onclick="checkAll(this) -->" />
			</div>
			<div>
				萌妹子9999：<input type="checkbox" class="ck" value="9999" onclick="getSum(this)" />
			</div>
			<div>
				<!--
					this就是把当前该标签的对象  传过去了
					
				-->
				御姐666：<input type="checkbox" class="ck" value="666" onclick="getSum(this)" />
			</div>
			<div>
				逻辑7777：<input type="checkbox" class="ck" value="7777" onclick="getSum(this)" />
			</div>
			<div>
				阿姨8888：<input type="checkbox" class="ck" value="8888" onclick="getSum(this)" />
			</div>
			<div>
				老妹1111：<input type="checkbox" class="ck" value="1111" onclick="getSum(this)" />
			</div>
			<div>
				幺妹2222：<input type="checkbox" class="ck" value="2222" onclick="getSum(this)" />
			</div>
			<div>
				凤姐500：<input type="checkbox" class="ck" value="500" onclick="getSum(this)" />
			</div>
			<div>
				总价：<span style="color: red; font-weight: bold;" id="sum">0</span>$
			</div>


		</div>
	</body>
</html>
```

## 省市二级联动
```java
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div>
			省份:<select id="pro">
				<option value="">--请选择--</option>
				<option value="001">北京</option>
				<option value="002">上海</option>
				<option value="003">浙江</option>
			</select>
			市:<select id="city">
				<option value="">--请选择--</option>
			</select>
		</div>
	</body>
	<script type="text/javascript">
		document.getElementById("pro").onchange=function(){
			var pro=this.value;
			var bjCity=['朝阳','东城','西城','昌平','海淀区'];
			var shCity=['黄浦','浦东','长宁','普陀'];
			var zjCity=['杭州','宁波','温州','绍兴','湖州'];
			var cityHTML="<option value=''>--请选择--</option>";
			if (pro == '001') {
				for (var i = 0; i < bjCity.length; i++) {
					cityHTML+="<option>"+bjCity[i]+"</option>";
				}
			}else if(pro=='002'){
				for (var i = 0; i < shCity.length; i++) {
					cityHTML+="<option>"+shCity[i]+"</option>";
				}
			}else{
				for (var i = 0; i < zjCity.length; i++) {
					cityHTML+="<option>"+zjCity[i]+"</option>";
				}
			}
			document.getElementById("city").innerHTML=cityHTML;
		}
	</script>
</html>
```

## 事件案例
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			#div1{
				height: 30px;
				width: 150px;
				background-color: green;
				font-size: 20px;
			}
			#div2{
				height: 30px;
				width: 150px;
				background-color: red;
				line-height: 30px;
			}
		</style>
		<script type="text/javascript">
			function testOnclick(){
				alert("点我干嘛!");
			}
			function testOndblclick(){
				alert("还敢点我两下!");
			}
			function mOver(obj){
				obj.style.backgroundColor="yellow";
				obj.innerHTML="onmouseover";
			}
			function mOut(obj){
				obj.style.backgroundColor="red";
				obj.innerHTML="onmouseout";
			}
			function onFocus(obj){
				obj.style.backgroundColor="yellow";
				obj.placeholder="onfocus";
			}
			function onBlur(obj){
				obj.style.backgroundColor="#fff";
				obj.placeholder="onblur";
			}
			function mDown(obj){
				obj.style.backgroundColor="#1ec5e5";
				obj.innerHTML="onmousedown";
			}
			function mUp(obj){
				obj.style.backgroundColor="red";
				obj.innerHTML="onmouseup";
			}
			function onChange(){
				var a=document.getElementById("txt");
				a.value="onchange";
			}
		</script>
	</head>
	<body>
		<p><input type="button" value="单击" onclick="testOnclick()"/></p>
		<p><input type="button" value="双击" ondblclick="testOndblclick()"/></p>
		<div id="div1" onmouseover="mOver(this)" onmouseout="mOut(this)"/>
			我是div
		</div>
		<br/>
		<div id="div2" onmousedown="mDown(this)" onmouseup="mUp(this)">
			请按住我
		</div>
		<p><input type="text" placeholder="请点击输入框" onfocus="onFocus(this)" onblur="onBlur(this)"/></p>
		<p>onchange<input type="text" id="txt" onchange="onChange()"/></p>
	</body>
</html>
```

## 数组
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
<script type="text/javascript">
	//第一种:使用Array的构造函数
	var arrs=new Array();//不指定长度,默认长度是0
	arrs[0]="hello";
	arrs[1]="1";
	arrs[2]="3.14";
	arrs[4]=true;
	var arr=new Array(10);//创建数组并指定长度
	var arr=new Array("hello","hi");//直接实例化
	//第二种:
	var arr=["aa",100,true];//隐式创建
	var arr=[];//创建空数组
	//数组的遍历
	//方式一:使用for循环(通常的做法)
	for (var i = 0; i < arrs.length; i++) {
		document.write(arrs[i]+"<br/>");
	}
	//方式二:使用for-in循环(一般遍历对象时用)
	for(var i in arrs){
		document.write(i+"-->"+arrs[i]+"<br/>");
	}//不会输出未定义的元素
	document.write(arrs[6]+"<br/>");//undefined 下标越界时显示undefined
	document.write("----------------"+"<br/>");
	//数组方法的使用
	var a=new Array();//不指定长度,默认长度是0
	a[0]="hello";
	a[1]="1";
	a[2]="3.14";
	a[3]=true;
	a.push("push");//向数组的末尾添加一个元素
	for(var i in a){
		document.write(i+"-->"+a[i]+"<br/>");
	}
	document.write(a.length);//返回数组的长度
</script>
	</head>
	<body>
	</body>
</html>
```

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript">
			//用字面量创建对象
			var p={
				id:1001,//用,号隔开
				name:"Jack",//属性值可以是任意类型的数据
				age:37,
				sex:'男',
				sayHello:function(){//创建方法
					alert('你好!');
				},
				girlFriend:{//子对象
					name:'rose',
					age:33,
					sex:'女'//最后一个属性不用加,
				},
				babys:[
					{
						name:"xiaoming"
					},
					{
						name:"xiaohua"
					}
				]
			};
			p.money=99999;//给对象追加属性
			alert(p.id+"--"+p.name+"--"+p.money);//访问对象属性
			p.sayHello();//调用方法
			alert(p.girlFriend.name);//访问子对象属性
			alert(p.babys[1].name);
		</script>
	</head>
	<body>
	</body>
</html>
```

## 日期
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<span id="time"></span>
	</body>
			<script type="text/javascript">
		function showDate() {
			var date = new Date();
			// alert(date);//Tue Apr 09 2019 11:32:00 GMT+0800 (中国标准时间)
			// alert(date.toLocaleString());//2019/4/9 上午11:33:19
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			var week = date.getDay();
			switch (week) {
				case 0:
					week = "周日";
					break;
				case 1:
					week = "周一";
					break;
				case 2:
					week = "周二";
					break;
				case 3:
					week = "周三";
					break;
				case 4:
					week = "周四";
					break;
				case 5:
					week = "周五";
					break;
				case 6:
					week = "周六";
				default:
					break;
			}
			var str=year+"年 "+month+"月 "+day+"日 "+hour+":"+minute+":"+second+week;
			document.getElementById("time").innerHTML=str;
		}
		//调用函数
		showDate();
		//JS提供的定时器
		setInterval("showDate()",1000);//第一个参数:要执行的代码;第二个参数:执行的时间间隔(毫秒)
	</script>
</html>
```

## JSON
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript">
			//key是字符串 value是object
			var p = {
				"name": "Jack",
				"age": 37,
				"sex": "男",
				"girlfriend": {
					"name": "rose",
					"age": 33,
					"sex": "女"
				},
				"friends": [{
						"name": "lili"
					},
					{
						"name": "feifei"
					},
					{
						"name": "lisa",
						"girlfriend": {
							"name": "xiaolizi",
							"age": 22,
							"sex": "男"
						}
					}
				]
			}
			alert(p.name);//访问属性
			alert(p.friends[2].girlfriend.name);
			//将json对象转成json格式的字符串 使用JSON内置对象
			var jsonStr=JSON.stringify(p);
			alert(jsonStr);
			//把json格式的字符串转成js对象
			var p1=JSON.parse(jsonStr);
			alert(typeof(p1)+"-->"+p1.girlfriend.name);
			//eval方法可以把字符串当作js代码来解析
			var p2=eval("("+jsonStr+")");
			alert("eval-->"+typeof(p2)+"-->"+p2.friends[2].girlfriend.name);
		</script>
	</head>
	<body>
	</body>
</html>
```

## String对象的方法
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>String对象的方法</title>
		<script type="text/javascript">
			var str="Hello JavaScript!";
			document.write(str+"<br/>");
			document.write(str.length+"<br/>");//返回字符串的长度
			document.write(str.blink()+"<br/>");//显示闪动(???)
			document.write(str.bold().italics().big().strike().fontcolor("red")+"<br/>");//粗体,斜体,大号,删除线,颜色(红色)
			document.write(str.charAt(2)+"<br/>");//l
			document.write(str.charCodeAt(2)+"<br/>");//108
			var str1="Hello";
			var str2="JavaScript!";
			document.write(str1.concat(str2)+"<br/>");//与+功能一样
			document.write(str.fontsize(7)+"<br/>");//size 参数必须是从 1 至 7 的数字。
			document.write(String.fromCharCode(72,69,76,76,79)+"<br/>");//HELLO
			document.write(str.indexOf("JavaScript")+"<br/>");//6
			document.write(str.link("https://www.baidu.com")+"<br/>");//链接到百度
			document.write(str.replace(/JavaScript/,"world")+"<br/>");//替换
			document.write(str.search(/JavaScript/)+"<br/>");//6
			document.write(str.slice(1,3)+"<br/>");//el 截取片段
			document.write(str.substr(1,2)+"<br/>");//el 2代表长度
			document.write(str.substring(1,5)+"<br/>");//ello 与slice类似
			document.write(str.split("")+"<br/>");//H,e,l,l,o, ,J,a,v,a,S,c,r,i,p,t,! 返回的是数组
			document.write(str1.sup()+str2.sub()+"<br/>");//上标和下标
			document.write(str.toLowerCase()+"<br/>");//转换为小写
			document.write(str.toUpperCase()+"<br/>");//转换为大写
			var str="1 plus 2 equal 3"
			document.write(str.match(/\d+/g));//1,2,3 正则表达式
		</script>
	</head>
	<body>
	</body>
</html>
```

## Windows对象
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript">
			function del() {
				//1.prompt() 输入框
				var str = prompt("请输入del删除:" /* ,del */ ); //第二个参数是用户输入的默认值
				if (str == "del") {
					//2.confirm() 选择确定框
					if (confirm("确认删除吗?")) {
						//3.显示一个警告框
						alert("删除成功");
					}
				}
			}

			function testOpen() {
				window.open("https://www.baidu.com", "_blank", "width=1366px,height=768px");
				// window.open() - 打开新窗口
				// window.close() - 关闭当前窗口
				// window.moveTo() - 移动当前窗口
				// window.resizeTo() - 调整当前窗口的尺寸
			}
		</script>
	</head>
	<body>
		<p><input type="button" onclick="del()" value="删除" /></p>
		<p><input type="button" onclick="testOpen()" value="百度" /></p>
	</body>
</html>
```

## 动态表格
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<style type="text/css">
			body {
				text-align: center;
			}

			div {
				border: 1px solid black;
				margin: 0 auto;
			}

			table {
				margin: 0 auto;
			}

			table,
			th,
			td {
				border: 1px solid #000000;
				border-collapse: collapse;
			}

			#table {
				width: 500px;
			}

			#div1 {
				width: 500px;
			}

			#table2 {
				width: 300px;
			}

			#div2 {
				width: 300px;
			}

			input[type='text'] {
				position: relative;
			}
		</style>
		<title></title>
	</head>
	<body>
		<div id="div1">
			<table id="table">
				<thead>
					<tr>
						<th>选择</th>
						<th>编号</th>
						<th>用户名</th>
						<th>密码</th>
						<th>年龄</th>
						<th>地址</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody id="tb">
					<tr>
						<td><input type="checkbox" id="checkAll" /></td>
						<td colspan="5"><input type='button' onclick='delAll()' value='全部删除' style='border:0;background-color:#fff; cursor:pointer' /></td>
						<td><input type="button" value="删除选中行" onclick='delChecked()' /></td>
					</tr>
					<tr>
						<td><input type="checkbox" class="ck" /></td>
						<td>10001</td>
						<td>chen</td>
						<td>12345</td>
						<td>27</td>
						<td>杭州市</td>
						<td><input type='button' onclick='del(this)' value='删除' style='border:0;background-color:#fff; cursor:pointer' /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<br />
		<div id="div2">
			<table id="table2">
				<form id="myform">
					<tr>
						<td>编号:</td>
						<td><input type="text" id="id" /></td>
					</tr>
					<tr>
						<td>用户:</td>
						<td><input type="text" id="user" /></td>
					</tr>
					<tr>
						<td>密码:</td>
						<td><input type="text" id="pw" /></td>
					</tr>
					<tr>
						<td>年龄</td>
						<td><input type="text"/ id="age"></td>
					</tr>
					<tr>
						<td>地址</td>
						<td><input type="text" id="address" /></td>
					</tr>
					<tr>
						<td colspan="2">
							<input type="button" value="添加" id="add" />
							<input type="button" value="重置" onclick="formReset()" />
						</td>
					</tr>
				</form>
			</table>
		</div>
	</body>
	<script type="text/javascript">
		document.getElementById("add").addEventListener("click", function() {
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			var inp = document.createElement("input");
			inp.setAttribute("type", "checkbox");
			inp.setAttribute("class", "ck");
			td1.appendChild(inp);
			var td2 = document.createElement("td");
			td2.innerHTML = document.getElementById("id").value;
			var td3 = document.createElement("td");
			td3.innerHTML = document.getElementById("user").value;
			var td4 = document.createElement("td");
			td4.innerHTML = document.getElementById("pw").value;
			var td5 = document.createElement("td");
			td5.innerHTML = document.getElementById("age").value;
			var td6 = document.createElement("td");
			td6.innerHTML = document.getElementById("address").value;
			var td7 = document.createElement("td");
			td7.innerHTML =
				"<input type='button' onclick='del(this)' value='删除' style='border:0;background-color:#fff; cursor:pointer'/>";
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			tr.appendChild(td7);
			document.getElementById("tb").appendChild(tr);
		});

		function formReset() {
			document.getElementById("myform").reset();
		}

		function del(obj) {
			var td = obj.parentElement.parentElement;
			var tr = obj.parentElement.parentElement.parentElement;
			tr.removeChild(td);

		}
		document.getElementById("checkAll").addEventListener("click", function() {
			var flag = this.checked;
			var arr = document.getElementsByClassName("ck");
			for (var i = 0; i < arr.length; i++) {
				arr[i].checked = flag;
			}
		});

		function delAll() {
			var arr = document.getElementsByClassName("ck");
			for (var i = 0; i < arr.length; i++) {
					var td = arr[i].parentElement.parentElement;
					var tr=arr[i].parentElement.parentElement.parentElement;
					tr.removeChild(td);
					i-=1;
			}
		}
		function delChecked() {
			var arr = document.getElementsByClassName("ck");
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].checked){
					var td = arr[i].parentElement.parentElement;
					var tr=arr[i].parentElement.parentElement.parentElement;
					tr.removeChild(td);
					i-=1;
				}
			}
		}
	</script>
</html>
```


(window.webpackJsonp=window.webpackJsonp||[]).push([[187],{1916:function(s,a,t){"use strict";t.r(a);var n=t(14),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"zerotier异地组网"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#zerotier异地组网"}},[s._v("#")]),s._v(" zerotier异地组网")]),s._v(" "),a("h3",{attrs:{id:"在公网服务器部署zerotier-planet"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在公网服务器部署zerotier-planet"}},[s._v("#")]),s._v(" 在公网服务器部署zerotier-planet")]),s._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'3.0'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ztncui")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ztncui\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" always\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" MYADDR=1.1.1.1 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#改成自己的服务器公网IP")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" HTTP_PORT=4000\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" HTTP_ALL_INTERFACES=yes\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" ZTNCUI_PASSWD=123456 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#登录密码")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'4000:4000'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# web控制台入口")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'9993:9993'")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'9993:9993/udp'")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'3180:3180'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# planet/moon文件在线下载入口，如不对外提供。可防火墙禁用此端口。")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./zerotier-one:/var/lib/zerotier-one'")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./ztncui/etc:/opt/key-networks/ztncui/etc'")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 按实际路径挂载卷， 冒号前面是宿主机的， 支持相对路径")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" keynetworks/ztncui\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("h3",{attrs:{id:"在客户端运行zerotier-one"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在客户端运行zerotier-one"}},[s._v("#")]),s._v(" 在客户端运行zerotier-one")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--restart")]),s._v(" unless-stopped "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" zerotier-one "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--device")]),s._v(" /dev/net/tun "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--net")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("host")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --cap-add NET_ADMIN "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  --cap-add SYS_ADMIN "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /var/lib/zerotier-one:/var/lib/zerotier-one "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  henrist/zerotier-one\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 加入网络")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-it")]),s._v(" zerotier-one zerotier-cli "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),s._v(" 4bc69f74e087e27c\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h3",{attrs:{id:"zerotier-cli相关命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#zerotier-cli相关命令"}},[s._v("#")]),s._v(" zerotier-cli相关命令")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 加入网络")]),s._v("\nzerotier-cli "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),s._v(" 4bc69f74e087e27c\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 退出网络")]),s._v("\nzerotier-cli leave 8286ac0e4717da9e\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看ip")]),s._v("\nzerotier-cli listnetworks\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看状态")]),s._v("\nzerotier-cli status\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查找当前你网络内的主机信息")]),s._v("\nzerotier-cli listpeers\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查询本机的zerotier节点地址")]),s._v("\nzerotier-cli info\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])]),a("h3",{attrs:{id:"部署moon服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#部署moon服务"}},[s._v("#")]),s._v(" 部署moon服务")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull seedgou/zerotier-moon\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" zerotier-moon "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--restart")]),s._v(" always "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9993")]),s._v(":9993/udp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n\t"),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" /home/zerotier-moon:/var/lib/zerotier-one "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n\tseedgou/zerotier-moon "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-4")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("47.111")]),s._v(".189.141\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 1.安装zerotier客户端到云服务器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-s")]),s._v(" https://install.zerotier.com "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 2.加入自己的NETWORK ID")]),s._v("\nzerotier-cli "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("join")]),s._v(" 8286ac0e4717da9e\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 3.配置moon")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /var/lib/zerotier-one\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 4.生成 moon.json 配置文件")]),s._v("\nzerotier-idtool initmoon identity.public "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" moon.json\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 5.编辑 moon.json 配置文件")]),s._v("\n "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('#将配置文件中的 "stableEndpoints": [] 修改成 "stableEndpoints": ["ServerIP/9993"]')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 6.创建moon文件")]),s._v("\nzerotier-idtool genmoon moon.json\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 7. 新建moons.d文件将生成的000*****.moon文件移动进去")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" moons.d\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" 000000xxxxxxxxxx.moon moons.d\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 8.重启 zerotier-one 服务")]),s._v("\nsystemctl restart zerotier-one\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查询本机的zerotier节点地址")]),s._v("\nzerotier-cli info\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 显示如下结果")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("200")]),s._v(" info 579753c60c "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.10")]),s._v(".2 ONLINE\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 加入moon的节点 579753c60c 服务器端的Address")]),s._v("\nzerotier-cli orbit 579753c60c 579753c60c\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br")])]),a("p",[s._v("不同系统下的 ZeroTier 目录位置：")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("Linux")]),s._v(": "),a("code",[s._v("/var/lib/zerotier-one")])]),s._v(" "),a("li",[a("strong",[s._v("FreeBSD")]),s._v(" / "),a("strong",[s._v("OpenBSD")]),s._v(": "),a("code",[s._v("/var/db/zerotier-one")])]),s._v(" "),a("li",[a("strong",[s._v("Mac")]),s._v(": "),a("code",[s._v("/Library/Application\\ Support/ZeroTier/One")])])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" ./zerotier-cli orbit 579753c60c 579753c60c\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[a("strong",[s._v("Windows")]),s._v(": "),a("code",[s._v("C:\\ProgramData\\ZeroTier\\One")])])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("zerotier-one_x64.exe "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-q")]),s._v(" orbit 579753c60c 579753c60c\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])])])}),[],!1,null,null,null);a.default=e.exports}}]);
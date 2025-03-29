import{_ as s,c as i,o as a,aj as n}from"./chunks/framework._AF764y6.js";const o=JSON.parse('{"title":"Linux漏洞修复","description":"","frontmatter":{"title":"Linux漏洞修复","date":"2023-10-26T21:48:39.000Z","permalink":"/linux/bug-fixes/","categories":["运维","Linux"],"tags":["linux"],"author":"Manaphy"},"headers":[],"relativePath":"ops/Linux/50.Linux漏洞修复.md","filePath":"ops/Linux/50.Linux漏洞修复.md","lastUpdated":1743259133000}'),h={name:"ops/Linux/50.Linux漏洞修复.md"},l=n(`<h2 id="cve-2020-1971" tabindex="-1">CVE-2020-1971 <a class="header-anchor" href="#cve-2020-1971" aria-label="Permalink to “CVE-2020-1971”">​</a></h2><p>2020年12月08日，OpenSSL官方发布安全公告，披露CVE-2020-1971 OpenSSL GENERAL_NAME_cmp 拒绝服务漏洞。当两个GENERAL_NAME都包含同一个EDIPARTYNAME时，由于GENERAL_NAME_cmp函数未能正确处理，从而导致空指针引用，并可能导致拒绝服务。<br>OpenSSL是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。这个包广泛被应用在互联网的网页服务器上。<br>受影响的版本：<br>OpenSSL 1.1.1 ～ 1.1.1h<br>OpenSSL 1.0.2 ～ 1.0.2w<br>修复方法：<br>查看当前版本信息命令:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> version</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -a</span></span></code></pre></div><p>下载安全版本包到/usr/local/src目录下,命令如下:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/local/src</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> https://www.openssl.org/source/openssl-1.1.1i.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">tar</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> zxvf</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> openssl-1.1.1i.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> openssl-1.1.1i</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果执行config会有提示没有安装,需要先安装 yum -y install perl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">./config</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果执行make提示 /bin/sh: gcc: command not found,则安装gcc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">yum</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> gcc-c++</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> libstdc++-devel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> install</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/bin/openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/bin/oldopenssl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/local/bin/openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/bin/openssl</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> version</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果出现 openssl: error while loading shared libraries: libssl.so.1.1: cannot open shared object file: No such file or directory 则执行以下两条命令</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/local/lib64/libssl.so.1.1</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/lib64/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ln</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -s</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/local/lib64/libcrypto.so.1.1</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /usr/lib64/</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 再次查看版本号 出现 OpenSSL 1.1.1i  8 Dec 2020 则成功修复</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> version</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -a</span></span></code></pre></div><h2 id="cve-2002-20001-openssh算法协议漏洞修复" tabindex="-1">CVE-2002-20001 （OpenSSH算法协议漏洞修复） <a class="header-anchor" href="#cve-2002-20001-openssh算法协议漏洞修复" aria-label="Permalink to “CVE-2002-20001 （OpenSSH算法协议漏洞修复）”">​</a></h2><h3 id="修复方法" tabindex="-1">修复方法 <a class="header-anchor" href="#修复方法" aria-label="Permalink to “修复方法”">​</a></h3><p>修改sshd_config配置文件，屏蔽掉不安全的KexAlgorithms。其中sshd_config的配置参数说明如下：</p><ul><li>当前openssh版本支持的算法列表和参数用法可以从帮助文档中查找到。</li><li>指定可用的KEX (Key Exchange)算法，多个算法之间必须以逗号分隔。</li><li>另外，如果指定的列表以<code>+</code>字符开头，则指定的算法将被追加到默认集，而不是替换原有默认的。</li><li>如果指定的列表以<code>-</code>字符开头，则指定的算法(包括通配符)将从默认集中删除，而不是替换。</li><li>如果指定的列表以<code>^</code>字符开头，则指定的算法将被放在默认集的开头。</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">man</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> sshd_config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -A</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 40</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -w</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> KexAlgorithms</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,diffie-hellman-group14-sha256,diffie-hellman-group14-sha1&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /etc/ssh/sshd_config</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> sshd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sshd</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -w</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> kexalgorithms</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;"># 如果还是扫描到该漏洞,则将diffie-hellman所有的算法都移除</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;Kexalgorithms curve25519-sha256,curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> /etc/ssh/sshd_config</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#修复前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[root@Manaphy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]# sshd -T </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -w</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> kexalgorithms</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;s/,/\\n/g&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">kexalgorithms</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> curve25519-sha256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">curve25519-sha256@libssh.org</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ecdh-sha2-nistp256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ecdh-sha2-nistp384</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ecdh-sha2-nistp521</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group-exchange-sha256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group16-sha512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group18-sha512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group-exchange-sha1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group14-sha256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group14-sha1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group1-sha1</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">#修复后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[root@Manaphy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">]# sshd -T </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -w</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> kexalgorithms</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;s/,/\\n/g&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">kexalgorithms</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> curve25519-sha256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">curve25519-sha256@libssh.org</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ecdh-sha2-nistp256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ecdh-sha2-nistp384</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">ecdh-sha2-nistp521</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group-exchange-sha256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group16-sha512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group18-sha512</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group14-sha256</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">diffie-hellman-group14-sha1</span></span></code></pre></div>`,11),p=[l];function e(t,k,r,d,F,g){return a(),i("div",null,p)}const y=s(h,[["render",e]]);export{o as __pageData,y as default};

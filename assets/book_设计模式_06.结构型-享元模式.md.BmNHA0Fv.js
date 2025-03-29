import{_ as s,c as i,o as a,aj as h}from"./chunks/framework._AF764y6.js";const t="/assets/yyeQXR.CF1FWdLG.png",n="/assets/LvktQY.rO10KFCs.png",k="/assets/s1R4kO.CLnahcOO.png",p="/assets/JfBtNN.CEjQLKh3.png",l="/assets/tPNYCB.CyuXQIuk.png",e="/assets/1611829566426-439e42f4-7596-4e22-b25c-6e37042ac379.n0kZkTrQ.png",E=JSON.parse('{"title":"结构型 - 享元模式","description":"","frontmatter":{"title":"结构型 - 享元模式","date":"2023-10-25T00:19:57.000Z","permalink":"/design_pattern/flyweight/","categories":["后端","设计模式"],"tags":["设计模式"],"author":"Manaphy"},"headers":[],"relativePath":"book/设计模式/06.结构型-享元模式.md","filePath":"book/设计模式/06.结构型-享元模式.md","lastUpdated":1743259133000}'),r={name:"book/设计模式/06.结构型-享元模式.md"},d=h('<img src="'+t+'"><h2 id="内存溢出-谁的锅" tabindex="-1">内存溢出，谁的锅？ <a class="header-anchor" href="#内存溢出-谁的锅" aria-label="Permalink to “内存溢出，谁的锅？”">​</a></h2><p><code>OutOfMemoryError</code>这个异常对于Java开发者来说并不陌生，相信有一定经验的同学都遇到过，导致JVM抛出该异常的根本原因是：虚拟机无法开辟出应用程序所需的内存空间，程序已经无法继续运行下去了。</p><p>内存溢出一般来说有以下两种可能：</p><p><strong>1.内存泄漏</strong></p><p>无意识的代码缺陷，产生的对象永远不会被使用，但是GC也无法回收，导致内存泄漏。</p><p><strong>2.内存溢出</strong></p><p>产生的对象太多，内存被耗尽，可能是烂代码导致的，也可能是系统确实需要这些对象，但是物理内存不够。</p><p>笔者很不幸，在第一家公司工作的时候就遇到过线上系统频繁宕机的问题，排查日志后发现是由于内存溢出导致的。服务器的内存大小为8G，我们试着调大JVM的内存，分配了4G，结果还是运行一段时间后就宕机了。然后大家都开始紧张了起来，因为这个系统并不复杂，4G的内存是绝对够用的，如果还是内存溢出，那就只能是代码问题了。</p><p>我们首先是设置JVM参数<code>-XX:+HeapDumpOnOutOfMemoryError</code>让虚拟机在内存溢出时生成内存快照并导出到磁盘，我们拿到快照文件后便开始分析堆中的对象情况，结果发现<code>Auth</code>类实例数量非常多，有上百万个。<code>Auth</code>类是对系统权限的描述，<code>User</code>类持有对<code>Auth</code>类的引用，它的目的是用户请求接口时进行权限校验，没有接口权限的用户请求接口，服务端是拒绝执行的。</p><p>什么时候会生成<code>Auth</code>对象呢？检查代码发现是登陆的时候，系统首先会查询用户的基本信息，然后再查询用户具有的权限列表，再将用户信息放到Session里面。 我试着用代码来重现这个过程，类图设计如下：</p><p><img src="'+n+`" alt=""></p><p>描述权限的<code>Auth</code>类：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> name;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//权限名</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> uri;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//接口URI</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">uri</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> name;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.uri </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> uri;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>用户类<code>User</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Data</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> User</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Long</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> userId;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> userName;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> password;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Integer</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> role;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> List</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&gt; </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">auths;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//用户具有的权限列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><code>AuthService</code>可以从数据库中查询角色拥有的权限：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> AuthService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 查询role具有的权限</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> List&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getByRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Integer </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">role</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> mockData</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(role);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 模拟数据</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> List&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">mockData</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Integer </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">role</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		List</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&gt; </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		switch</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (role){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">			case</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//普通用户</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">				list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;查看&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/look.html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">			case</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//管理员</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">				list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;新增&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/add.html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">				list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;修改&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/update.html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">				list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;删除&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/delete.html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">			case</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//超级管理员</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">				list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;无所不能&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;/almighty.html&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">			default:</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> list;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>模拟Tomcat的Session容器，这里用Map来表示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Session</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ConcurrentMap</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">User</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&gt; </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">MAP</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> put</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">sessionId</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, User </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">user</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		MAP.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(sessionId, user);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><code>UserService</code>用户登陆后，将用户信息和权限列表保存到Session容器：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> UserService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> AuthService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> authService</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> AuthService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> login</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">userName</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">password</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		User</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> User</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setUserId</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(ThreadLocalRandom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">current</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">nextLong</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setUserName</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(userName);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setPassword</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(password);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(ThreadLocalRandom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">current</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">nextInt</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 查询用户具有的权限</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setAuths</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(authService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getByRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(user.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">()));</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 用户信息存储到Session</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		Session.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(UUID.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">randomUUID</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(), user);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>客户端这样调用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Client</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		UserService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> userService</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> UserService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 模拟客户端一百万次登陆请求</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		for</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1000000</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			userService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">login</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;root&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;123&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>这种实现功能是正常的，但是我们来分析一下，这段程序有没有什么问题？</p><p><strong>权限和角色有关，和用户无关！</strong></p><p>这是问题的核心，现在的实现是：只要有用户登陆，系统就要查询一次用户的权限列表，站在JVM的角度来看，就是生成N个<code>Auth</code>对象和一个<code>ArrayList</code>对象。角色的数量是有限的，而用户的数量可以看作是无限的。如果在线用户有上万个，再加上权限一多，那么JVM就可能需要生成百万个<code>Auth</code>对象和上万个<code>ArrayList</code>对象，那可不就得内存溢出嘛。</p><p>由于公司没有Code Review的习惯，测试也没有发现问题，因为没有做负载测试，测试阶段在线用户少嘛，当然不会内存溢出，但是项目一上线，随着在线用户数量的增加，这个隐藏Bug马上就原形毕露了！</p><p>发现问题，接下来就是解决问题了。这个问题很好解决，使用「享元模式」，<strong>相同角色的用户共享同一个权限列表</strong>，避免创建过多重复的对象，内存占用马上就降下来了。</p><p>优化后的类图设计如下：</p><p><img src="`+k+`" alt=""></p><p>引入了一个<code>AuthFactory</code>权限工厂类，它会在初始化的时候加载所有角色对应的权限列表并缓存下来，用户登陆时从<code>AuthFactory</code>的缓存中获取自身角色对应的权限列表，这样所有角色相同的用户就能复用同一个权限列表了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> AuthFactory</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 缓存</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ConcurrentMap</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Integer</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">, </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">List</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&gt;&gt; </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">map</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> AuthService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> authService</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> AuthService</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 预先加载角色对应的权限信息，假设只有三种角色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, authService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getByRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, authService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getByRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, authService.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getByRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> List&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Auth</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getByRole</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Integer </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">role</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(role);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><code>UserService</code>类稍作修改，原先调用<code>AuthService</code>获取权限列表，现在改为从<code>AuthFactory</code>的缓存中获取，这里就不贴重复代码了。</p><p>客户端的调用也没变，但是优化后的代码，内存占用极少，没有再出现内存溢出的情况了，客户非常满意。</p><p>使用<code>jmap</code>分析堆内存，下面分别是优化前和优化后的情况：</p><p><img src="`+p+'" alt=""></p><p><img src="'+l+'" alt=""></p><p>如图所示，效果非常明显，这就是享元模式！</p><h2 id="享元模式的定义" tabindex="-1">享元模式的定义 <a class="header-anchor" href="#享元模式的定义" aria-label="Permalink to “享元模式的定义”">​</a></h2><blockquote><p>使用共享对象可有效地支持大量的细粒度的对象。</p></blockquote><p><img src="'+e+'" alt=""><strong>享元模式通用类图</strong></p><ul><li>Flyweight：享元角色的抽象，负责定义对象的内部状态和外部状态的接口或实现。</li><li>ConcreteFlyweight：具体的享元角色，实现抽象角色定义的操作，需要注意的是一定不能修改共享对象，否则就混乱了。</li><li>UnsharedConcreteFlyweight：不可共享的享元角色，不存在外部状态或者安全要求不能使用共享技术的对象，该对象一般不会出现在享元工厂中。</li><li>FlyweightFactory：享元工厂，创建一个池容器，提供一个从容器中获取享元对象的方法。</li></ul><p>享元模式的核心就是运用「对象池」技术，使得对象可以被复用，避免创造重复的无意义对象，减少内存占用，减轻GC的压力。</p><h2 id="享元模式的优缺点" tabindex="-1">享元模式的优缺点 <a class="header-anchor" href="#享元模式的优缺点" aria-label="Permalink to “享元模式的优缺点”">​</a></h2><p>享元模式使得对象可以被复用，大大减少了重复对象的创建，减少了程序内存的占用，减轻了GC的压力，提高程序的性能。</p><p>但是享元模式需要类分离出内部状态和外部状态，增加了系统的复杂性。</p><p>当系统中存在大量的相似对象时，就可以将这些相似的属性剥离出来，进行对象的复用。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h2><p>享元模式是「池技术」的重要实现方式，它为我们提出了两个要求：1.细粒度的对象、2.共享对象。</p><p>应用程序创建太多的对象会增加内存的占用，降低程序性能，还有可能导致内存溢出。使用享元模式，分离对象的内部状态和外部状态，通过享元工厂来缓存外部状态，使得重复的外部状态可以被复用，避免程序频繁创建无意义的重复对象。</p><p>有一点需要特别注意的是，享元类一定不能去修改共享的外部状态，否则会导致数据混乱。</p><p>最后还有一点就是，由于对象是共享的，因此需要特别注意「线程安全」的问题！</p>',53),g=[d];function A(y,D,C,F,c,B){return a(),i("div",null,g)}const u=s(r,[["render",A]]);export{E as __pageData,u as default};

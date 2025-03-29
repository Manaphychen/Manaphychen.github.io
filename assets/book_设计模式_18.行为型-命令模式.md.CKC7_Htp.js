import{_ as s,c as i,o as a,aj as n}from"./chunks/framework._AF764y6.js";const t="/assets/DbDq5g.BQ6ZguHI.png",h="/assets/lhsPZJ.CiWhIwSh.png",l="/assets/Jsx7sK-20240324235538232.ROuqTj36.png",o=JSON.parse('{"title":"行为型 - 命令模式","description":"","frontmatter":{"title":"行为型 - 命令模式","date":"2023-10-25T00:35:13.000Z","permalink":"/design_pattern/command/","categories":["后端","设计模式"],"tags":["设计模式"],"author":"Manaphy"},"headers":[],"relativePath":"book/设计模式/18.行为型-命令模式.md","filePath":"book/设计模式/18.行为型-命令模式.md","lastUpdated":1743259133000}'),p={name:"book/设计模式/18.行为型-命令模式.md"},k=n('<img src="'+t+'" alt="image.png"><h2 id="文章发布背后的秘密" tabindex="-1">文章发布背后的秘密 <a class="header-anchor" href="#文章发布背后的秘密" aria-label="Permalink to “文章发布背后的秘密”">​</a></h2><p>用户发布一篇文章，系统需要完成三个主要动作：</p><ol><li>文章数据保存到数据库。</li><li>文章内容进行中文分词，建立全文索引存储到ElasticSearch。</li><li>Redis设置BitMap，用作布隆过滤器，防止缓存穿透。</li></ol><p>我们试着用伪代码来描述这个过程： <img src="'+h+`" alt=""></p><p><strong>DBClient</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> DBClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;文章保存到数据库...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> update</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;文章更新到数据库...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> delete</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;文章从数据库删除...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><strong>ElasticSearchClient</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> ElasticSearchClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> addDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;ElasticSearch建立文章索引...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> updateDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;ElasticSearch更新文章索引...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> deleteDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;ElasticSearch删除文章索引...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><strong>RedisClient</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> RedisClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> setBitMap</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;设置位图...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>当客户端需要发布一篇文章时，需要这样调用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Client</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		DBClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> dbClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> DBClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		ElasticSearchClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> elasticSearchClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> ElasticSearchClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		RedisClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> redisClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> RedisClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 保存到数据库</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		dbClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 分词，全文索引</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		elasticSearchClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">addDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 设置BitMap，用作布隆过滤器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		redisClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setBitMap</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>功能是正常的，但是这样实现存在一个什么问题呢？</p><p>客户端需要依赖DBClient、ElasticSearchClient、RedisClient类，而且需要非常清楚的知道文章发布的所有过程，耦合性太高了，如果以后中间还要加个步骤呢？客户端会疯掉吧。</p><p>知道了不好的地方，现在我们来优化。</p><p>文章的发布、修改、删除是否都可以看成是一个命令呢？调用者发出一个命令，接收者去执行，至于命令执行的具体细节，调用者压根就不关心，以此来达到松散耦合的目的。</p><p><strong>抽象命令类</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Command</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	protected</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> DBClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> dbClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> DBClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	protected</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ElasticSearchClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> elasticSearchClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> ElasticSearchClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	protected</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> RedisClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> redisClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> RedisClient</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 命令的执行，子类实现</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> execute</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><strong>命令执行者</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Invoker</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Command</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> command;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 设置命令</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> setCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Command </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">command</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.command </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> command;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 执行命令</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> action</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.command.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">execute</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p><strong>文章发布命令</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> PublishCommand</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> Command</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> execute</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.dbClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">insert</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.elasticSearchClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">addDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.redisClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setBitMap</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>客户端想发布文章时，这样调用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Client</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		Invoker</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> invoker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Invoker</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		invoker.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> PublishCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		invoker.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">action</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>客户端的调用变得非常的简单，客户端只需要创建指定的命令，交给<code>Invoker</code>执行就OK了，至于命令执行的细节它是不关心的。</p><p>如果用户要修改文章呢？也非常简单，只需要再扩展一个修改命令即可：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> UpdateCommand</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> Command</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> execute</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 更新数据库</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.dbClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">update</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 更新索引</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.elasticSearchClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">updateDocument</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">		// 修改文章，文章ID不变，位图不用动。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>客户端调用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Client</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		Invoker</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> invoker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Invoker</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		invoker.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">setCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> UpdateCommand</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		invoker.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">action</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>客户端只需要创建<code>UpdateCommand</code>交给<code>Invoker</code>执行就好了，其他地方都不用动，非常方便。 这就是命令模式！</p><h2 id="命令模式的定义" tabindex="-1">命令模式的定义 <a class="header-anchor" href="#命令模式的定义" aria-label="Permalink to “命令模式的定义”">​</a></h2><blockquote><p>将一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志，可以提供命令的撤销和恢复功能。</p></blockquote><p><img src="`+l+'" alt=""></p><p><strong>命令模式通用类图</strong></p><ul><li>Receiver：命令接收者，也是实际干活的角色。</li><li>Command：抽象命令，定义所有命令的操作。</li><li>ConcreteCommand：实际的命令，有N个命令就有N个命令类。</li><li>Invoker：调用者，接收到命令并执行。</li></ul><p>命令模式很简单，也很常用，它的封装性非常好，将请求者<code>Invoker</code>和执行者<code>Receiver</code>分离开了，扩展性也非常好，要想增加命令，只需要派生<code>Command</code>子类就可以了。</p><h2 id="命令模式的优缺点" tabindex="-1">命令模式的优缺点 <a class="header-anchor" href="#命令模式的优缺点" aria-label="Permalink to “命令模式的优缺点”">​</a></h2><p><strong>优点</strong></p><ol><li>降低耦合，请求者和执行者没有任何依赖了，请求者只负责接收命令并执行，至于是谁执行的、怎么执行的，它并不关心。</li><li>扩展性好，扩展一个命令非常简单，派生<code>Command</code>子类即可。</li><li>可以对命令的请求进行排队和记录日志。</li></ol><p><strong>缺点</strong></p><p>如果有N个命令，就需要编写N个<code>Command</code>子类，如果命令太多会导致类的数量膨胀。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h2><p>只要你认为是命令的地方就可以用命令模式，命令模式还可以和其他模式结合使用，例如结合「备忘录模式」来实现命令的撤销功能，结合「责任链模式」来实现命令族的解析。</p><p>命令模式很好的将命令的调用者和命令的执行者解耦了，客户端只关心要执行的命令，至于命令是由谁执行的，怎么执行的，它并不关心，这就是高内聚的体现。 另外，<code>Invoker</code>在执行命令时也可以做一些文章，例如对命令的执行进行排队，记录日志等。</p>',45),e=[k];function d(r,g,A,D,C,y){return a(),i("div",null,e)}const B=s(p,[["render",d]]);export{o as __pageData,B as default};

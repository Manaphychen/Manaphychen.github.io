import{_ as s,c as i,o as a,aj as n}from"./chunks/framework._AF764y6.js";const h="/assets/HGy5JQ.CJFgari6.png",t="/assets/N2oXNw.C0ym3gdC.png",p="/assets/RKLWna.GX5GMnBT.png",F=JSON.parse('{"title":"行为型 - 解释器模式","description":"","frontmatter":{"title":"行为型 - 解释器模式","date":"2023-10-25T00:36:05.000Z","permalink":"/design_pattern/interpreter/","categories":["后端","设计模式"],"tags":["设计模式"],"author":"Manaphy"},"headers":[],"relativePath":"book/设计模式/23.行为型-解释器模式.md","filePath":"book/设计模式/23.行为型-解释器模式.md","lastUpdated":1743259133000}'),k={name:"book/设计模式/23.行为型-解释器模式.md"},l=n('<h2 id="破解算术验证码" tabindex="-1">破解算术验证码 <a class="header-anchor" href="#破解算术验证码" aria-label="Permalink to “破解算术验证码”">​</a></h2><p>我头两年工作的时候，写过一些爬虫程序，爬取过京东的商品数据，今日影视的视频资源等等。有些资源是很容易爬的，只要发一个HTTP请求，无需任何处理服务端就会返回给你数据。但是对于一些比较珍贵的数据，服务端就会做「反爬虫」处理，我曾经在爬取第三方网站的文章时就遇到过，幸运的是人家的反爬虫机制比较简单：给出一个图片，图片里面是一个「算术题」，你必须输入算术题的正确答案，服务端才会响应文章的完整内容。算术题都是很简单的四则运算，小学生都会的那种，因此很容易破解。</p><p>破解的思路很简单，我的做法就是首先调用百度的「OCR」将图片识别成文本，这样我就能得到一个表达式字符串，如“25+32”，接下来就是写代码解析表达式，计算结果值了，然后将这个结果值作为参数去请求文章接口，就能获取到文章数据。</p><p>调用百度OCR识别这里就不讲了，那是百度干的活，我只负责调调接口。本篇文章主要记录如何通过「解释器模式」解析「算术表达式」，并计算得到结果值。</p><p>现在假设我们得到如下表达式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>1+2+3</span></span></code></pre></div><p>我们来分析一下这个表达式，它有两类元素：操作数和运算符。操作数是指：<code>1、2、3</code>这类符号，它们只代表一个数值，不需要做任何处理，因此也叫作「终结符号」，这是语法中的最小单元，不可再拆分。运算符是指<code>+</code>这类符号，它需要我们编写算法进行处理，每个运算符都需要对应两个操作数，否则公式就无法运行了，运算符也叫做「非终结符号」。</p><p>两类元素的共同点是都要被解析，不同的是所有的操作数都具有相同的功能，它只代表一个数值，因此可以用一个类来表示。但是不同的运算符需要用不同的算法来解释，因此必须定义不同的类，加法需要加法解析器，减法需要减法解析器。 分析完了，我们试着用代码来描述这个过程，类图设计如下：</p><img src="'+h+`"><p><code>Expression</code>是词法元素的抽象，<code>VarExpression</code>用来解析操作数，<code>SymbolExpression</code>用来解析运算符，<code>AddExpression</code>负责解析加法运算符，<code>SubExpression</code>负责解析减法运算符。</p><p>解析的工作完成了，我们还要负责安排运算的先后顺序，从左到右，先算乘除，后算加减(篇幅原因，乘除暂不考虑)，而且还要保存表达式计算的结果值，因此我们还需要一个封装类<code>Calculator</code>。</p><p>解析器抽象<code>Expression</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 解释表达式并获得结果</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>操作数解析器<code>VarExpression</code>，很简单，将解析出的操作数字符转数字：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> VarExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> key;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> VarExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> key;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Integer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">valueOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(key);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>抽象的运算符解析器<code>SymbolExpression</code>，每个运算符必须对应左右两个操作数，否则公式无法运算：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> abstract</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> SymbolExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	protected</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> left;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//左表达式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	protected</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> right;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//右表达式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> SymbolExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">left</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">right</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.left </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> left;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.right </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> right;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>加法解析器<code>AddExpression</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> AddExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> SymbolExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> AddExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">left</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">right</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(left, right);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> left.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> right.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>减法解析器<code>SubExpression</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> SubExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> SymbolExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> SubExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">left</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, Expression </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">right</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		super</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(left, right);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> left.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> right.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>目前为止，解析的代码都完成了，接下来就是安排运算的先后顺序了。 我们再来分析一下这个表达式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>1+2+3</span></span></code></pre></div><p>计算机应该如何执行这个运算呢？应该用哪种数据结构才合适呢？笔者画了一副简图来描述这个执行过程：</p><img src="`+t+`"><p>如图所示，使用「栈」结果最合适不过了，当遇到操作数时，直接入栈，遇到运算符时，将栈顶元素出栈，并和下一个操作数计算，再将结果入栈，反复此过程，最终栈内的元素即为最终计算结果。</p><p>因此，<code>Calculator</code>类毫无疑问使用栈结构来维护执行顺序：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Calculator</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> expression;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> exp;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// 表达式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Calculator</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">exp</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">		this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.exp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> exp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		Stack</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Expression</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">&gt; </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">stack</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Stack&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		char</span><span style="--shiki-light:#24292E;--shiki-dark:#F69D50;">[] </span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">chars</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> exp.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">toCharArray</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">//只考虑个位数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		for</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> chars.length; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			VarExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> varExpression</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> VarExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">valueOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(chars[i]));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">			switch</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (chars[i]) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">				// 遇到运算符号 前一个数出栈，和后一个数做运算后再入栈</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">				case</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;+&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">					stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> AddExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">pop</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(), </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> VarExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">valueOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(chars[</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">i]))));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">					break</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">				case</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;-&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">					stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> SubExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">pop</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(), </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> VarExpression</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(String.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">valueOf</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(chars[</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">i]))));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">					break</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">				default:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">					// 遇到数字，直接入栈</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">					stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(varExpression);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		expression </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> stack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">pop</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 计算</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> exec</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;(&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> exp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;) = &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> expression.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">interpreter</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>客户端这样调用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Client</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		for</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">			new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Calculator</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">()).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">exec</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">	// 模拟百度OCR识别出的表达式文本</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">	public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">build</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		ThreadLocalRandom</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> random</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ThreadLocalRandom.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">current</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		StringBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sb</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> StringBuilder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		sb.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(random.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">nextInt</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		for</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> random.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">nextInt</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			sb.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(random.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">nextBoolean</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">?</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;+&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;-&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">			sb.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(random.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">nextInt</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">		}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> sb.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>表达式计算结果均正确，如果第三方网站新增了“乘除”运算，我只需派生<code>SymbolExpression</code>子类，实现乘法和除法的解析算法即可，非常奈斯，这下可以安心的爬取数据了。</p><p>这就是解释器模式！</p><h2 id="解释器模式的定义" tabindex="-1">解释器模式的定义 <a class="header-anchor" href="#解释器模式的定义" aria-label="Permalink to “解释器模式的定义”">​</a></h2><blockquote><p>给定一门语言，定义它的文法的一种表示，并定义一个解释器，该解释器使用该表示来解释语言中的句子。</p></blockquote><p><img src="`+p+'" alt=""></p><ul><li>AbstractExpression：抽象解释器，具体的解释算法由子类完成。</li><li>TerminalExpression：终结符表达式，实现与文法中元素相关联的解释操作，通常一个解释器模式只有一个终结符表达式，但有多个实例。</li><li>NonTerminalExpression：非终结符表达式，文法中的每条规则都对应一个非终结符表达式。</li><li>Context：环境角色。</li></ul><p>解释器模式实际应用很少，最起码开发者很少会去手写一个解释器。解释器编写复杂，调试困难，很难维护，对于上述的例子，完全可以使用市面上成熟的功能强大的三方库，例如<code>JEP</code>，也可以用<code>shell</code>等脚本语言来代替解释器模式。</p><h2 id="解释器模式的优缺点" tabindex="-1">解释器模式的优缺点 <a class="header-anchor" href="#解释器模式的优缺点" aria-label="Permalink to “解释器模式的优缺点”">​</a></h2><p><strong>优点</strong></p><p>解释器是一个简单的语法分析工具，最显著的优点就是扩展性非常好，修改语法规则只要修改对应的非终结符表达式的算法即可，如果需要扩展语法，增加非终结符类即可。</p><p><strong>缺点</strong></p><ol><li>每个语法都要产生一个非终结符表达式，语法过多会导致类的数量膨胀，维护麻烦。</li><li>解释器模式采用了递归的调用方法，调试起来非常麻烦。</li><li>解释器模式需要大量的循环和递归，执行效率较差。</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h2><p>解释器模式稍作了解即可，在实际开发中很少会需要你去手写一个解释器，因为它会引起效率、性能以及维护的问题，语法稍微复杂一点，解释器的编写就会很困难。如果你真的要用解释器，请优先考虑市面上成熟的三方库，例如：<code>Expression4J</code>、<code>MESP</code>、<code>JEP</code>，它们功能强大，效率也还不错，可以实现绝大多数的数学运算。</p>',44),e=[l];function r(d,g,A,y,D,C){return a(),i("div",null,e)}const B=s(k,[["render",r]]);export{F as __pageData,B as default};

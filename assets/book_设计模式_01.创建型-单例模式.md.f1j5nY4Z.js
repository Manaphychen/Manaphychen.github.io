import{_ as g}from"./chunks/ArticleMetadata.BPSr9oED.js";import{_ as A,E as y,c,o as n,j as p,I as h,aj as d,w as k,b as e,e as r,a as D}from"./chunks/framework._AF764y6.js";const C="/assets/iNuaOw.C4iXBL2t.png",H=JSON.parse('{"title":"创建型 - 单例模式","description":"","frontmatter":{"title":"创建型 - 单例模式","date":"2023-10-24T23:46:30.000Z","permalink":"/design_pattern/singleton/","categories":["后端","设计模式"],"tags":["设计模式"],"author":"Manaphy"},"headers":[],"relativePath":"book/设计模式/01.创建型-单例模式.md","filePath":"book/设计模式/01.创建型-单例模式.md","lastUpdated":1743259133000}'),o={name:"book/设计模式/01.创建型-单例模式.md"},B=p("h1",{id:"一、什么时候使用单例模式",tabindex:"-1"},[D("一、什么时候使用单例模式？ "),p("a",{class:"header-anchor",href:"#一、什么时候使用单例模式","aria-label":"Permalink to “一、什么时候使用单例模式？”"},"​")],-1),F=d('<p>单例模式可谓是23种设计模式中最简单、最常见的设计模式了，它可以保证一个类只有一个实例。我们平时网购时用的购物车，就是单例模式的一个例子。想一想，如果购物车不是单例的，会发生什么？</p><p><strong>数据不一致</strong>：用户在不同页面看到的购物车内容可能不同。用户在一个页面加了商品，可能换到另一个页面就看不到了、或者看到的商品不对。这会让用户感到困惑和不满。</p><p><strong>购物车状态丢失</strong>：用户在不同服务器上访问的购物车实例可能不同。用户在一个页面加了商品，如果下一个请求被转到另一个服务器，那么之前加的商品就没了。这可能导致用户重新选购，那实在是太麻烦了。</p><p><strong>资源浪费</strong>：购物车需要加载和处理一些数据，假如用户每次访问页面都创建一个新的购物车实例，这样就会占用更多的资源，并且、频繁地创建和销毁购物车实例，也会增加系统的负担和响应时间。 所以，用单例模式来做购物车可以避免以上问题，并提供更好的用户体验。购物车作为一个共享的对象，把用户选的商品信息保存在一个唯一的实例中，可以在整个用户会话中访问和更新，这样可以保证购物车中的数据是正确、完整和一致的。这其实也和我们生活中，在超市里使用购物小推车或购物篮是一样的。</p><p>Spring是Java开发中常用的框架，它里面也有很多单例模式的应用：</p><p><strong>ApplicationContext：</strong> Spring的核心类之一，负责管理和配置应用程序的Bean。ApplicationContext是单例模式的实例，保证整个应用程序中只有一个ApplicationContext。</p><p><strong>Bean对象</strong>：在Spring中，通过配置文件或注解方式定义的Bean对象通常也是单例的，默认情况下，Spring会把它们当作单例来管理。这意味着在应用程序中任何地方，通过Spring注入或获取Bean对象时，都是同一个实例。</p><p><strong>缓存对象</strong>：在Spring中，可以使用缓存注解来实现方法级的缓存策略。这些缓存对象通常也是单例模式的实例，保证在多个方法调用中共享和管理缓存数据。</p><p><strong>事务管理器</strong>：Spring的事务管理器通常也是单例模式的实例。事务管理器用于处理数据库事务，并保证整个应用程序中保持事务的一致性。</p><p><strong>AOP切面</strong>：Spring的AOP（面向切面编程）通常也使用单例模式来管理切面。切面用于实现横切关注点的模块化，并可以在多个对象和方法中应用。通过使用单例模式，Spring可以保证在整个应用程序中共享和管理切面对象。 单例模式是关于对象创建的设计模式，当我们需要某个类在整个系统运行期间有且只有一个实例，就可以考虑使用单例模式。</p><h1 id="java实现单例模式的几种方式" tabindex="-1"><strong>Java实现单例模式的几种方式</strong> <a class="header-anchor" href="#java实现单例模式的几种方式" aria-label="Permalink to “Java实现单例模式的几种方式”">​</a></h1>',11),E=d(`<h2 id="饿汉式" tabindex="-1">饿汉式 <a class="header-anchor" href="#饿汉式" aria-label="Permalink to “饿汉式”">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Hungry</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> { </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// final 不允许被继承</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // 在类初始化过程中收入&lt;clinit&gt;()方法中，该方法能100%保证同步；final 保证不被改变</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Hungry</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Hungry</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Hungry</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Hungry </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>“饿汉式”是一种最简单直接的实现方式，它的好处是在多线程环境下应用时是安全的 缺点：当我们还没有使用它时，它就已经被实例化了，这就会造成资源浪费；由此，产生了“懒汉式”实现方式，它在我们第1次使用时才进行实例化</p><h2 id="懒汉式" tabindex="-1">懒汉式 <a class="header-anchor" href="#懒汉式" aria-label="Permalink to “懒汉式”">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> { </span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// final 不允许被继承</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Lazy </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">            instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>但是，上面这样的“饿汉式”代码在多线程环境下是<strong>不安全</strong>的、并且同样也会被反射破坏。 要将它改为线程安全的，有以下2种方法： 方法1，为 getInstance 方法加上 <strong>synchronized</strong>关键字：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> synchronized</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Lazy </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>方法2，通过<strong>双重检查锁</strong> 需要注意的是，双重检查锁方式在多线程环境下可能会产生NPE，因为new Lazy()并非原子操作，它将经历：1-分配内存空间，2-执行构造函数创建对象，3-对象指向空间这几个步骤，而步骤2、3可能会被重排序从而引发NPE。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> volatile</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">// 用于解决NPE</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Lazy </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        synchronized</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (Lazy.class) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">            instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Lazy</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h2 id="静态内部类" tabindex="-1"><strong>静态内部类</strong> <a class="header-anchor" href="#静态内部类" aria-label="Permalink to “静态内部类”">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Holder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Holder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    * 调用getInstance实际上是获得InnerHolder的instance静态属性</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Holder </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> InnerHolder.instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> InnerHolder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Holder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> Holder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>静态内部类方式是线程安全的，但它仍然逃不过被反射破坏的命运。</p><h2 id="枚举类" tabindex="-1">枚举类 <a class="header-anchor" href="#枚举类" aria-label="Permalink to “枚举类”">​</a></h2><p>不会被反射破坏的实现方式</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> EnumSingleton</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> Serializable</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">    INSTANCE</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">    EnumSingleton</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> EnumSingleton </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> INSTANCE;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h2 id="静态内部类-枚举类" tabindex="-1">静态内部类+枚举类 <a class="header-anchor" href="#静态内部类-枚举类" aria-label="Permalink to “静态内部类+枚举类”">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> HolderEnum</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> HolderEnum</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> HolderEnum </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> Holder.INSTANCE.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">    // 使用枚举类充当holder</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> enum</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> Holder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">        INSTANCE</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> HolderEnum</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">        Holder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">            this</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">.instance </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> HolderEnum</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        private</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> HolderEnum </span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> instance;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><p>这种实现方式可以延迟加载、在多线程环境下安全、但却还是逃不过“反射”这个破坏王。</p><p>综上，Java实现单例模式的几种方法各有优缺点，以下是它们的对比小结： <img src="`+C+'" alt="image.png"></p>',19);function u(s,m,v,b,_,f){const l=g,t=y("ClientOnly");return n(),c("div",null,[B,h(t,null,{default:k(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),e(l,{key:0,article:s.$frontmatter},null,8,["article"])):r("",!0)]}),_:1}),F,h(t,null,{default:k(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),e(l,{key:0,article:s.$frontmatter},null,8,["article"])):r("",!0)]}),_:1}),E])}const N=A(o,[["render",u]]);export{H as __pageData,N as default};

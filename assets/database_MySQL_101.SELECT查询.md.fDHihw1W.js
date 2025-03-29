import{_ as p}from"./chunks/ArticleMetadata.BPSr9oED.js";import{_ as t,E as e,c as d,o as n,j as l,I as r,aj as A,w as g,b as y,e as C,a as D}from"./chunks/framework._AF764y6.js";const T=JSON.parse('{"title":"SELECT查询","description":"","frontmatter":{"title":"SELECT查询","date":"2023-11-02T10:10:59.000Z","permalink":"/mysql/select/","categories":["数据库","MySQL"],"tags":["MySQL"],"author":"Manaphy"},"headers":[],"relativePath":"database/MySQL/101.SELECT查询.md","filePath":"database/MySQL/101.SELECT查询.md","lastUpdated":1743259133000}'),c={name:"database/MySQL/101.SELECT查询.md"},E=l("h1",{id:"select语句",tabindex:"-1"},[D("SELECT语句 "),l("a",{class:"header-anchor",href:"#select语句","aria-label":"Permalink to “SELECT语句”"},"​")],-1),o=A(`<h2 id="_1-基本的select语句" tabindex="-1">1. 基本的SELECT语句 <a class="header-anchor" href="#_1-基本的select语句" aria-label="Permalink to “1. 基本的SELECT语句”">​</a></h2><h3 id="_1-1-select" tabindex="-1">1.1 SELECT <a class="header-anchor" href="#_1-1-select" aria-label="Permalink to “1.1 SELECT”">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">-- SELECT...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; #没有任何子句</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 9</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">; #没有任何子句</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">-- SELECT ... FROM</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">   标识选择哪些列</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">     标识从哪个表中选择</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">#选择全部列</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> department;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">#选择特定的列</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> dept_id, dept_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> department;</span></span></code></pre></div><blockquote><p>MySQL中的SQL语句是不区分大小写的，因此SELECT和select的作用是相同的，但是，许多开发人员习惯将关键字大写、数据列和表名小写，读者也应该养成一个良好的编程习惯，这样写出来的代码更容易阅读和维护。</p></blockquote><h3 id="_1-2-列的别名" tabindex="-1">1.2 列的别名 <a class="header-anchor" href="#_1-2-列的别名" aria-label="Permalink to “1.2 列的别名”">​</a></h3><ul><li>重命名一个列</li><li>便于计算</li><li>紧跟列名，也可以<strong>在列名和别名之间加入关键字AS，别名使用双引号</strong>，以便在别名中包含空格或特殊的字符并区分大小写。</li><li>AS 可以省略</li><li>建议别名简短，见名知意</li><li>举例</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">AS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, commission_pct comm</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;Name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, salary</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">12</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;Annual Salary&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span></code></pre></div><h3 id="_1-3-去除重复行" tabindex="-1">1.3 去除重复行 <a class="header-anchor" href="#_1-3-去除重复行" aria-label="Permalink to “1.3 去除重复行”">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">-- 在SELECT语句中使用关键字DISTINCT去除重复行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT DISTINCT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> dept_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT DISTINCT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> dept_id,salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span></code></pre></div><p>这里有两点需要注意：</p><ol><li>DISTINCT 需要放到所有列名的前面，如果写成<code>SELECT salary, DISTINCT dept_id FROM employee</code>会报错。</li><li>DISTINCT 其实是对后面所有列名的组合进行去重，你能看到最后的结果是 74 条，因为这 74 个部门id不同，都有 salary 这个属性值。如果你想要看都有哪些不同的部门（dept_id），只需要写<code>DISTINCT dept_id</code>即可，后面不需要再加其他的列名了。</li></ol><h3 id="_1-4-空值参与运算" tabindex="-1">1.4 空值参与运算 <a class="header-anchor" href="#_1-4-空值参与运算" aria-label="Permalink to “1.4 空值参与运算”">​</a></h3><ul><li>所有运算符或列值遇到null值，运算的结果都为null</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> emp_id,salary,commission_pct,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> commission_pct) </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;annual_sal&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span></code></pre></div><p>在 MySQL 里面， 空值不等于空字符串。一个空字符串的长度是 0，而一个空值的长度是空。而且，在 MySQL 里面，空值是占用空间的。</p><h3 id="_1-5-着重号" tabindex="-1">1.5 着重号 <a class="header-anchor" href="#_1-5-着重号" aria-label="Permalink to “1.5 着重号”">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ORDER;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">ERROR </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">1064</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">42000</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">): You have an error </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> your </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SQL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> syntax; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">check</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> the </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">manual</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> that corresponds </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> your MySQL </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">server</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> version</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> for</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> the right syntax </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">to</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> use</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> near </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&#39;ORDER&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> at</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> line</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> \`ORDER\`</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> \`order\`</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><p>我们需要保证表中的字段、表名等没有和保留字、数据库系统或常用方法冲突。如果真的相同，请在SQL语句中使用一对\`\`（着重号）引起来。</p><h3 id="_1-6-查询常数" tabindex="-1">1.6 查询常数 <a class="header-anchor" href="#_1-6-查询常数" aria-label="Permalink to “1.6 查询常数”">​</a></h3><p>SELECT 查询还可以对常数进行查询。对的，就是在 SELECT 查询结果中增加一列固定的常数列。这列的取值是我们指定的，而不是从数据表中动态取出的。</p><p>你可能会问为什么我们还要对常数进行查询呢？</p><p>SQL 中的 SELECT 语法的确提供了这个功能，一般来说我们只从一个表中查询数据，通常不需要增加一个固定的常数列，但如果我们想整合不同的数据源，用常数列作为这个表的标记，就需要查询常数。</p><p>比如说，我们想对 employee 数据表中的员工姓名进行查询，同时增加一列字段 country，这个字段固定值为“中国”，可以这样写：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &#39;中国&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> country, last_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span></code></pre></div><h2 id="_2-显示表结构" tabindex="-1">2. 显示表结构 <a class="header-anchor" href="#_2-显示表结构" aria-label="Permalink to “2. 显示表结构”">​</a></h2><p>使用DESCRIBE 或 DESC 命令，表示表结构。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">DESCRIBE employee;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">或</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">----------------+-------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| Field          | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Type</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Null</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Key</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">Default</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> | Extra |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">----------------+-------------+------+-----+---------+-------+</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| emp_id         | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)      | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NO</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">   | PRI | </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">       |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| first_name     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | YES  |     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| last_name      | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">25</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NO</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">   |     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| email          | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">25</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NO</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">   | UNI | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| phone_number   | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | YES  |     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| hire_date      | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NO</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">   |     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| job_id         | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NO</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">   | MUL | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| salary         | double(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | YES  |     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| commission_pct | double(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) | YES  |     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| manager_id     | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)      | YES  | MUL | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">| dept_id        | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)      | YES  | MUL | </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    |       |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">+</span><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">----------------+-------------+------+-----+---------+-------+</span></span></code></pre></div><p>其中，各个字段的含义分别解释如下：</p><ul><li>Field：表示字段名称。</li><li>Type：表示字段类型，这里 first_name、email 是文本型的，emp_id 是整数类型的。</li><li>Null：表示该列是否可以存储NULL值。</li><li>Key：表示该列是否已编制索引。PRI表示该列是表主键的一部分；UNI表示该列是UNIQUE索引的一部分；MUL表示在列中某个给定值允许出现多次。</li><li>Default：表示该列是否有默认值，如果有，那么值是多少。</li><li>Extra：表示可以获取的与给定列有关的附加信息，例如AUTO_INCREMENT等。</li></ul><h2 id="_3-排序" tabindex="-1">3. 排序 <a class="header-anchor" href="#_3-排序" aria-label="Permalink to “3. 排序”">​</a></h2><ul><li>使用 ORDER BY 子句排序 <ul><li><strong>ASC（ascend）: 升序</strong></li><li><strong>DESC（descend）:降序</strong></li></ul></li><li><strong>ORDER BY 子句在SELECT语句的结尾。</strong></li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">-- 单列排序</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name, job_id, dept_id, hire_date </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> hire_date;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name, job_id, dept_id, hire_date </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> hire_date </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> emp_id, last_name, salary</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> annsal </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> annsal;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">-- 多列排序</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name, depat_id, salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> dept_id, salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><ul><li>可以使用不在SELECT列表中的列排序。</li><li>在对多列进行排序的时候，首先排序的第一列必须有相同的列值，才会对第二列进行排序。如果第一列数据中所有值都是唯一的，将不再对第二列进行排序。</li></ul><h2 id="_4-分页" tabindex="-1">4. 分页 <a class="header-anchor" href="#_4-分页" aria-label="Permalink to “4. 分页”">​</a></h2><h3 id="实现规则" tabindex="-1">实现规则 <a class="header-anchor" href="#实现规则" aria-label="Permalink to “实现规则”">​</a></h3><ul><li><p>分页原理</p><p>所谓分页显示，就是将数据库中的结果集，一段一段显示出来需要的条件。</p></li><li><p><strong>MySQL中使用 LIMIT 实现分页</strong></p></li><li><p>格式：</p><p>第一个“位置偏移量”参数指示MySQL从哪一行开始显示，是一个可选参数，如果不指定“位置偏移量”，将会从表中的第一条记录开始（第一条记录的位置偏移量是0，第二条记录的位置偏移量是1，以此类推）；第二个参数“行数”指示返回的记录条数。</p></li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">LIMIT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> [位置偏移量,] 行数</span></span></code></pre></div><ul><li>举例</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">--前10条记录：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> 表名 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">LIMIT</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">或者</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> 表名 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">LIMIT</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">--第11至20条记录：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> 表名 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">LIMIT</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">--第21至30条记录： </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> 表名 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">LIMIT</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 20</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><blockquote><p>MySQL 8.0中可以使用<code>LIMIT 3 OFFSET 4</code>，意思是获取从第5条记录开始后面的3条记录，和<code>LIMIT 4,3</code>返回的结果相同。</p></blockquote><ul><li><strong>注意：LIMIT 子句必须放在整个SELECT语句的最后！</strong></li><li>使用 LIMIT 的好处</li></ul><p>约束返回结果的数量可以<code>减少数据表的网络传输量</code>，也可以<code>提升查询效率</code>。如果我们知道返回结果只有 1 条，就可以使用<code>LIMIT 1</code>，告诉 SELECT 语句只需要返回一条记录即可。这样的好处就是 SELECT 不需要扫描完整的表，只需要检索到一条符合条件的记录即可返回。</p><h3 id="拓展" tabindex="-1">拓展 <a class="header-anchor" href="#拓展" aria-label="Permalink to “拓展”">​</a></h3><p>在不同的 DBMS 中使用的关键字可能不同。在 MySQL、PostgreSQL、MariaDB 和 SQLite 中使用 LIMIT 关键字，而且需要放到 SELECT 语句的最后面。</p><ul><li>如果是 SQL Server 和 Access，需要使用 <code>TOP</code> 关键字，比如：</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> TOP</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, hp_max </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> heros </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> hp_max </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span></span></code></pre></div><ul><li>如果是 DB2，使用<code>FETCH FIRST 5 ROWS ONLY</code>这样的关键字：</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">, hp_max </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> heros </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> hp_max </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FETCH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> FIRST</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> ROWS</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> ONLY</span></span></code></pre></div><ul><li>如果是 Oracle，你需要基于 <code>ROWNUM</code> 来统计行数：</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> rownum,last_name,salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> rownum </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><p>需要说明的是，这条语句是先取出来前 5 条数据行，然后再按照 hp_max 从高到低的顺序进行排序。但这样产生的结果和上述方法的并不一样。我会在后面讲到子查询，你可以使用</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> rownum, last_name,salary</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    SELECT</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> last_name,salary</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> employee</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    ORDER BY</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> salary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">DESC</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">WHERE</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> rownum </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span></code></pre></div><p>得到与上述方法一致的结果。</p>`,53);function F(s,B,m,u,S,L){const h=p,k=e("ClientOnly");return n(),d("div",null,[E,r(k,null,{default:g(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(n(),y(h,{key:0,article:s.$frontmatter},null,8,["article"])):C("",!0)]}),_:1}),o])}const v=t(c,[["render",F]]);export{T as __pageData,v as default};

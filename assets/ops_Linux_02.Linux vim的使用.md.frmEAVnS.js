import{_ as y}from"./chunks/ArticleMetadata.BPSr9oED.js";import{_ as g,E as F,c as b,o as l,j as e,I as n,aj as p,w as k,b as r,e as h,a as o}from"./chunks/framework._AF764y6.js";const f="/assets/1610678655688-a10d0e29-c410-4144-892f-bf904d7b56b9-20240309153435061_GIvjcTxWW4.Dyljw408.png",x="/assets/1612103416113-8df24c85-795d-4674-ba26-54bedf346eea_wZyXCagAUQ.BzoI5mrN.png",c="/assets/1612103416157-7816aee6-52e2-4125-9d89-01dc83065e76.B11SKpJq.gif",w=JSON.parse('{"title":"Linux vim的使用","description":"","frontmatter":{"title":"Linux vim的使用","date":"2023-10-26T21:50:48.000Z","permalink":"/linux/vim/","categories":["运维","Linux"],"tags":["linux"],"author":"Manaphy"},"headers":[],"relativePath":"ops/Linux/02.Linux vim的使用.md","filePath":"ops/Linux/02.Linux vim的使用.md","lastUpdated":1743259133000}'),C={name:"ops/Linux/02.Linux vim的使用.md"},m=e("blockquote",null,[e("p",null,"所有的 Linux 系统都会内建 vi 文本编辑器。 Vim 具有程序编辑的能力，可以看做是 Vi 的增强版本，可以主动的以字体颜色辨别语法的正确性，方便程序设计。代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。")],-1),u=e("p",null,[e("img",{src:f,alt:"image.png"})],-1),D=e("h1",{id:"vi-和-vim-的三种常见模式",tabindex:"-1"},[o("vi 和 vim 的三种常见模式 "),e("a",{class:"header-anchor",href:"#vi-和-vim-的三种常见模式","aria-label":"Permalink to “vi 和 vim 的三种常见模式”"},"​")],-1),_=p('<h2 id="正常模式" tabindex="-1">正常模式 <a class="header-anchor" href="#正常模式" aria-label="Permalink to “正常模式”">​</a></h2><p>在正常模式下，我们可以使用快捷键。</p><p>以 vim 打开一个档案就直接进入一般模式了(这是默认的模式)。在这个模式中， 你可以使用『上下左右』按键来移动光标，你可以使用『删除字符』或『删除整行』来处理档案内容， 也可以使用『复制、贴上』来处理你的文件数据。</p><h2 id="插入模式-编辑模式" tabindex="-1">插入模式/编辑模式 <a class="header-anchor" href="#插入模式-编辑模式" aria-label="Permalink to “插入模式/编辑模式”">​</a></h2><p>在模式下，程序员可以输入内容。</p><p>按下 <kbd>i</kbd>, <kbd>I</kbd>, <kbd>o</kbd>, <kbd>O</kbd>, <kbd>a</kbd>, <kbd>A</kbd>, <kbd>r</kbd>, <kbd>R</kbd> 等任何一个字母之后才会进入编辑模式,  一般来说按 i 即可</p><h2 id="命令行模式" tabindex="-1">命令行模式 <a class="header-anchor" href="#命令行模式" aria-label="Permalink to “命令行模式”">​</a></h2><p>在这个模式当中， 可以提供你相关指令，完成读取、存盘、替换、离开 vim 、显示行号等的动作则是在此模式中达成的！</p><p><img src="'+x+'" alt="vi 和 vim 三种模式的相互转化图"></p><p><img src="'+c+'" alt="img"></p><h1 id="快捷键的使用案例" tabindex="-1">快捷键的使用案例 <a class="header-anchor" href="#快捷键的使用案例" aria-label="Permalink to “快捷键的使用案例”">​</a></h1>',11),v=p('<ol><li>拷贝当前行<code>yy</code> ,  拷贝当前行向下的 5 行 <code>5yy</code>，并粘贴（p）。</li><li>删除当前行<code>dd</code>, 删除当前行向下的 5 行 <code>5dd</code></li><li>在文件中查找某个单词  [命令行下<code>/关键字</code>， 回车  查找  , 输入 <code>n</code> 就是查找下一个 ]</li><li>设置文件的行号，取消文件的行号[命令行下<code>:set nu</code>和<code>:set nonu</code>]</li><li>编辑 /etc/profile 文件，使用快捷键到底文档的最末行[G]和最首行[gg],注意这些都是在正常模式下执行的。</li><li>在一个文件中输入&quot;hello&quot; ,然后又撤销这个动作，再正常模式下输入<code>u</code></li><li>编辑 /etc/profile 文件，并将光标移动到第 20 行 shift+g</li><li>显示行号 :set nu</li></ol><h2 id="一般模式快捷键" tabindex="-1">一般模式快捷键 <a class="header-anchor" href="#一般模式快捷键" aria-label="Permalink to “一般模式快捷键”">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;"><strong>移动光标</strong></th><th style="text-align:left;"><strong>说明</strong></th></tr></thead><tbody><tr><td style="text-align:left;"><kbd>h</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd></td><td style="text-align:left;">对应(←)(↓)(↑)(→)方向键</td></tr><tr><td style="text-align:left;"><kbd>Ctrl</kbd>+<kbd>f</kbd> [<kbd>Page Down</kbd>]</td><td style="text-align:left;">屏幕向下移动一页</td></tr><tr><td style="text-align:left;"><kbd>Ctrl</kbd>+<kbd>b</kbd> [<kbd>Page up</kbd>]</td><td style="text-align:left;">屏幕向上移动一页</td></tr><tr><td style="text-align:left;"><kbd>Ctrl</kbd>+<kbd>d</kbd></td><td style="text-align:left;">屏幕向下移动半页</td></tr><tr><td style="text-align:left;"><kbd>Ctrl</kbd>+<kbd>u</kbd></td><td style="text-align:left;">屏幕向上移动半页</td></tr><tr><td style="text-align:left;"><span style="color:blue;">n</span> <kbd>Space</kbd></td><td style="text-align:left;">n为数字。将光标向右移动 n 格</td></tr><tr><td style="text-align:left;"><kbd>0</kbd> [<kbd>Home</kbd>]</td><td style="text-align:left;">移动到这一行的最前面字符处</td></tr><tr><td style="text-align:left;"><kbd>$</kbd> [<kbd>End</kbd>]</td><td style="text-align:left;">移动到这一行的最后面字符处</td></tr><tr><td style="text-align:left;"><kbd>H</kbd></td><td style="text-align:left;">光标移动到当前屏幕的最上方那一行的第一个字符</td></tr><tr><td style="text-align:left;"><kbd>M</kbd></td><td style="text-align:left;">光标移动到当前屏幕的中间那一行的第一个字符</td></tr><tr><td style="text-align:left;"><kbd>L</kbd></td><td style="text-align:left;">光标移动到当前屏幕的最下方那一行的第一个字符</td></tr><tr><td style="text-align:left;"><kbd>G</kbd></td><td style="text-align:left;">移动到这个文档的最后一行</td></tr><tr><td style="text-align:left;"><span style="color:blue;">n</span><kbd>G</kbd></td><td style="text-align:left;">n为数字。移动到这个档案的第 n 行(配合:set nu)</td></tr><tr><td style="text-align:left;"><kbd>g</kbd><kbd>g</kbd></td><td style="text-align:left;">移动到这个档案的第一行，相当于1G</td></tr><tr><td style="text-align:left;"><span style="color:blue;">n</span> <kbd>Enter</kbd></td><td style="text-align:left;">n为数字。光标向下移动 n 行</td></tr></tbody></table><table tabindex="0"><thead><tr><th style="text-align:left;"><strong>搜索替换</strong></th><th style="text-align:left;"><strong>说明</strong></th></tr></thead><tbody><tr><td style="text-align:left;">/word</td><td style="text-align:left;">向光标之下寻找一个名称为word的字符串</td></tr><tr><td style="text-align:left;">?word</td><td style="text-align:left;">向光标之上寻找一个名称为word的字符串</td></tr><tr><td style="text-align:left;">搜索之后输入 n</td><td style="text-align:left;">重复前一个搜寻动作</td></tr><tr><td style="text-align:left;">搜索之后输入 N</td><td style="text-align:left;">与 n 相反，为反向搜寻</td></tr></tbody></table><table tabindex="0"><thead><tr><th style="text-align:left;"><strong>复制粘贴删除</strong></th><th style="text-align:left;"><strong>说明</strong></th></tr></thead><tbody><tr><td style="text-align:left;"><kbd>x</kbd> [<kbd>Delete</kbd>]，<kbd>X</kbd> [<kbd>Backspace</kbd>]</td><td style="text-align:left;">剪切字符</td></tr><tr><td style="text-align:left;"><span style="color:blue;">n</span><kbd>x</kbd></td><td style="text-align:left;">n为数字。连续向后剪切 n 个字符</td></tr><tr><td style="text-align:left;"><kbd>d</kbd><kbd>d</kbd></td><td style="text-align:left;">删除整行</td></tr><tr><td style="text-align:left;"><span style="color:blue;">n</span><kbd>d</kbd><kbd>d</kbd></td><td style="text-align:left;">n为数字。删除光标所在的向下 n 行</td></tr><tr><td style="text-align:left;"><kbd>d</kbd><kbd>1</kbd><kbd>G</kbd></td><td style="text-align:left;">删除光标所在到第一行的所有数据</td></tr><tr><td style="text-align:left;"><kbd>d</kbd><kbd>G</kbd></td><td style="text-align:left;">删除光标所在到最后一行的所有数据</td></tr><tr><td style="text-align:left;"><kbd>d</kbd><kbd>$</kbd></td><td style="text-align:left;">删除游标所在处，到该行的最后一个字符</td></tr><tr><td style="text-align:left;"><kbd>d</kbd><kbd>0</kbd></td><td style="text-align:left;">那个是数字的 0 ，删除游标所在处，到该行的最前面一个字符</td></tr><tr><td style="text-align:left;"><kbd>y</kbd><kbd>y</kbd></td><td style="text-align:left;">复制游标所在的那一行</td></tr><tr><td style="text-align:left;"><span style="color:blue;">n</span><kbd>y</kbd><kbd>y</kbd></td><td style="text-align:left;">n 为数字。复制光标所在的向下 n 行</td></tr><tr><td style="text-align:left;"><kbd>y</kbd><kbd>1</kbd><kbd>G</kbd></td><td style="text-align:left;">复制游标所在行到第一行的所有数据</td></tr><tr><td style="text-align:left;"><kbd>y</kbd><kbd>G</kbd></td><td style="text-align:left;">复制游标所在行到最后一行的所有数据</td></tr><tr><td style="text-align:left;"><kbd>y</kbd><kbd>0</kbd></td><td style="text-align:left;">复制光标所在的那个字符到该行行首的所有数据</td></tr><tr><td style="text-align:left;"><kbd>y</kbd><kbd>$</kbd></td><td style="text-align:left;">复制光标所在的那个字符到该行行尾的所有数据</td></tr><tr><td style="text-align:left;"><kbd>p</kbd> ; <kbd>P</kbd></td><td style="text-align:left;">p 为将已复制的数据在光标下一行贴上，P 则为贴在游标上一行</td></tr><tr><td style="text-align:left;"><kbd>J</kbd></td><td style="text-align:left;">将光标所在行与下一行的数据结合成同一行</td></tr><tr><td style="text-align:left;"><kbd>c</kbd></td><td style="text-align:left;">重复删除多个数据，例如向下删除 10 行，[ 10cj ]</td></tr><tr><td style="text-align:left;"><kbd>u</kbd></td><td style="text-align:left;">复原前一个动作。</td></tr><tr><td style="text-align:left;"><kbd>Ctrl</kbd>+<kbd>r</kbd></td><td style="text-align:left;">重做上一个动作。</td></tr></tbody></table><h2 id="一般模式切换到编辑模式" tabindex="-1">一般模式切换到编辑模式 <a class="header-anchor" href="#一般模式切换到编辑模式" aria-label="Permalink to “一般模式切换到编辑模式”">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;">按键</th><th style="text-align:left;">英文</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;"><kbd>i</kbd></td><td style="text-align:left;">insert</td><td style="text-align:left;">在当前光标处之前插入</td></tr><tr><td style="text-align:left;"><kbd>I</kbd></td><td style="text-align:left;">Insert</td><td style="text-align:left;">到行首插入</td></tr><tr><td style="text-align:left;"><kbd>a</kbd></td><td style="text-align:left;">append</td><td style="text-align:left;">在当前光标处之后附加</td></tr><tr><td style="text-align:left;"><kbd>A</kbd></td><td style="text-align:left;">Append</td><td style="text-align:left;">到行尾附加</td></tr><tr><td style="text-align:left;"><kbd>o</kbd></td><td style="text-align:left;"></td><td style="text-align:left;">新增下一行</td></tr><tr><td style="text-align:left;"><kbd>O</kbd></td><td style="text-align:left;"></td><td style="text-align:left;">新增上一行</td></tr><tr><td style="text-align:left;"><kbd>r</kbd></td><td style="text-align:left;">replace</td><td style="text-align:left;">(取代模式) 只会取代光标所在的那一个字符一次</td></tr><tr><td style="text-align:left;"><kbd>R</kbd></td><td style="text-align:left;">Replace</td><td style="text-align:left;">(取代模式) 会一直取代光标所在的文字，直到按下 ESC 为止</td></tr><tr><td style="text-align:left;"><kbd>Esc</kbd></td><td style="text-align:left;"></td><td style="text-align:left;">退出编辑模式，回到一般模式中</td></tr></tbody></table><h2 id="一般模式切换到指令行模式" tabindex="-1">一般模式切换到指令行模式 <a class="header-anchor" href="#一般模式切换到指令行模式" aria-label="Permalink to “一般模式切换到指令行模式”">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;">命令</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">:w</td><td style="text-align:left;">将编辑的数据写入硬盘档案中</td></tr><tr><td style="text-align:left;">:w!</td><td style="text-align:left;">若文件属性为『只读』时，强制写入该档案。</td></tr><tr><td style="text-align:left;">:q</td><td style="text-align:left;">仅退出</td></tr><tr><td style="text-align:left;">:q!</td><td style="text-align:left;">不保存退出</td></tr><tr><td style="text-align:left;">:wq</td><td style="text-align:left;">储存后离开，若为 :wq! 则为强制储存后离开</td></tr><tr><td style="text-align:left;"><kbd>Z</kbd><kbd>Z</kbd></td><td style="text-align:left;">保存并退出</td></tr><tr><td style="text-align:left;">:w [filename]</td><td style="text-align:left;">将编辑的数据储存成另一个档案（类似另存新档）</td></tr><tr><td style="text-align:left;">:r [filename]</td><td style="text-align:left;">在编辑的数据中，读入另一个档案的数据。<br>亦即将『filename』 这个档案内容加到游标所在行后面</td></tr><tr><td style="text-align:left;">:n1,n2 w [filename]</td><td style="text-align:left;">将 n1 到 n2 的内容储存成 filename 这个档案。</td></tr><tr><td style="text-align:left;">:! command</td><td style="text-align:left;">暂时离开 vi 到指令行模式下执行 command 的显示结果！<br>例如『:! ls /home』即可在 vi 当中看 /home 底下以 ls 输出的档案信息！</td></tr><tr><td style="text-align:left;">:set nu</td><td style="text-align:left;">显示行号，设定之后，会在每一行的前缀显示该行的行号</td></tr><tr><td style="text-align:left;">:set nonu</td><td style="text-align:left;">与 set nu 相反，为取消行号！</td></tr></tbody></table><h1 id="vim配置" tabindex="-1">Vim配置 <a class="header-anchor" href="#vim配置" aria-label="Permalink to “Vim配置”">​</a></h1>',10),A=p(`<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">manaphy@ManaphydeMacBook-Pro</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> ~</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> %</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> vim</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> --version</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">VIM</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> -</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> Vi</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> IMproved</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 8.2</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (2019 </span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">Dec</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 12,</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> compiled</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> Apr</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 19</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 2022</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 21:42:29</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">macOS</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> version</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> -</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> arm64</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Included</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> patches:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> 1-4113</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Compiled</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> by</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> root@apple.com</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Normal</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> version</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> without</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> GUI.</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">  Features</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> included</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (+) or not (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">   system</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> vimrc</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> file:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">$VIM</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">/vimrc&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">     user</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> vimrc</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> file:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">$HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">/.vimrc&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;"> 2nd</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> user</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> vimrc</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> file:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;~/.vim/vimrc&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">      user</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> exrc</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> file:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">$HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">/.exrc&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">       defaults</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> file:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">$VIMRUNTIME</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">/defaults.vim&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">  fall-back</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> for</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> $VIM</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> &quot;/usr/share/vim&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Compilation:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> gcc</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -c</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -I.</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -Iproto</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -DHAVE_CONFIG_H</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">   -DMACOS_X_UNIX</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">  -g</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -O2</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -U_FORTIFY_SOURCE</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -D_FORTIFY_SOURCE=1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">Linking:</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> gcc</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">   -L/usr/local/lib</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> vim</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">        -lm</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -lncurses</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">  -liconv</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> -framework</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> Cocoa</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#F69D50;">manaphy@ManaphydeMacBook-Pro</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> ~</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> %</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> vim</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> $HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">/.vimrc</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">set</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;"> number</span></span></code></pre></div>`,1);function B(t,E,I,T,P,$){const a=y,d=F("ClientOnly");return l(),b("div",null,[m,u,D,n(d,null,{default:k(()=>{var s,i;return[(((s=t.$frontmatter)==null?void 0:s.aside)??!0)&&(((i=t.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(l(),r(a,{key:0,article:t.$frontmatter},null,8,["article"])):h("",!0)]}),_:1}),_,n(d,null,{default:k(()=>{var s,i;return[(((s=t.$frontmatter)==null?void 0:s.aside)??!0)&&(((i=t.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(l(),r(a,{key:0,article:t.$frontmatter},null,8,["article"])):h("",!0)]}),_:1}),v,n(d,null,{default:k(()=>{var s,i;return[(((s=t.$frontmatter)==null?void 0:s.aside)??!0)&&(((i=t.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(l(),r(a,{key:0,article:t.$frontmatter},null,8,["article"])):h("",!0)]}),_:1}),A])}const M=g(C,[["render",B]]);export{w as __pageData,M as default};

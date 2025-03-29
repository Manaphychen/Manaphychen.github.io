import{_ as o}from"./chunks/ArticleMetadata.BPSr9oED.js";import{_ as n,E as p,c,o as t,j as i,I as d,aj as h,w as v,b as J,e as m,a as _}from"./chunks/framework._AF764y6.js";const V="/assets/image-20240314031409664_hl35rYcnQi.OtmE8TGZ.png",u="/assets/image-20240314033410731_MRt37iXAnk.C19dS7NG.png",M="/assets/image-20240314033456992_j4bJulD5Yr.D8Ro2GeG.png",T=JSON.parse('{"title":"JVM与Java体系结构","description":"","frontmatter":{"title":"JVM与Java体系结构","date":"2024-03-13T22:18:59.000Z","permalink":"/jvm/index/","categories":["后端","JVM虚拟机"],"tags":[null],"author":"Manaphy"},"headers":[],"relativePath":"jvm/01.JVM内存/00.JVM与Java体系结构.md","filePath":"jvm/01.JVM内存/00.JVM与Java体系结构.md","lastUpdated":1743259133000}'),g={name:"jvm/01.JVM内存/00.JVM与Java体系结构.md"},b=i("h1",{id:"jvm与java体系结构",tabindex:"-1"},[_("JVM与Java体系结构 "),i("a",{class:"header-anchor",href:"#jvm与java体系结构","aria-label":"Permalink to “JVM与Java体系结构”"},"​")],-1),f=h('<h2 id="虚拟机与java虚拟机" tabindex="-1">虚拟机与Java虚拟机 <a class="header-anchor" href="#虚拟机与java虚拟机" aria-label="Permalink to “虚拟机与Java虚拟机”">​</a></h2><h3 id="虚拟机" tabindex="-1">虚拟机 <a class="header-anchor" href="#虚拟机" aria-label="Permalink to “虚拟机”">​</a></h3><p>所谓虚拟机（Nirtual Machine），就是一台虚拟的计算机。它是一款软件，用来执行一系列虚拟计算机指令。大体上，虚拟机可以分为<span style="color:red;">系统虚拟机</span>和<span style="color:red;">程序虚拟机</span>。</p><p>大名鼎鼎的Visual Box,VMware就属于系统虚拟机，它们<span style="color:red;">完全是对物理计算机的仿真</span>，提供了一个可运行完整操作系统的软件平台。</p><p>程序虚拟机的典型代表就是Java虚拟机，它<span style="color:red;">专门为执行单个计算机程序而设计</span>，在Java虚拟机中执行的指令我们称内Java字节码指令。</p><p>无论是系统虚拟机还是程序虚拟机，在上面运行的软件都被限制于虚拟机提供的资源中。</p><h3 id="java虚拟机" tabindex="-1">Java虚拟机 <a class="header-anchor" href="#java虚拟机" aria-label="Permalink to “Java虚拟机”">​</a></h3><p>Java虚拟机是一台执行Java字节码的虚拟计算机，它拥有独立的运行机制， 其运行的Java字节码也未必由Java语言编译而成。</p><p>JVM平台的各种语言可以共享Java虚拟机带来的跨平台性、优秀的垃圾回器，以及可靠的即时编译器。</p><p><span style="color:red;">Java技术的核心就是Java虚拟机</span>（JVM, Java Virtual Machine）， 因为所有的Java程序都运行在Java虚拟机内部。</p><h4 id="作用" tabindex="-1">作用 <a class="header-anchor" href="#作用" aria-label="Permalink to “作用”">​</a></h4><p>Java虚拟机就是二进制字节码的运行环境，负责装载字节码到其内部，解释/编译为对应平台上的机器指令执行。每一条Java指令，Java虚拟机规范中都有详细定义，如怎么取操作数，怎么处理操作数，处理结果放在哪里。</p><h4 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to “特点”">​</a></h4><ul><li>一次编译，到处运行</li><li>自动内存管理</li><li>自动垃圾回收功能</li></ul><h2 id="jvm整体结构" tabindex="-1">JVM整体结构 <a class="header-anchor" href="#jvm整体结构" aria-label="Permalink to “JVM整体结构”">​</a></h2><p>HotSpot VM是目前市面上高性能虚拟机的代表作之一。</p><p>它采用解释器与即时编译器并存的架构。</p><p>在今天，Java程序的运行性能早已脱胎换骨，己经达到了可以和C/C++程序一较高下的地步。</p><p><img src="'+V+'" alt="image-20240314031409664"></p><h2 id="jvm的架构模型" tabindex="-1">JVM的架构模型 <a class="header-anchor" href="#jvm的架构模型" aria-label="Permalink to “JVM的架构模型”">​</a></h2><p>Java编译器输入的指令流基本上是一种<span style="color:red;">基于栈的指令集架构</span>，另外一种指令集架构则是<span style="color:red;">基于寄存器的指令集架构</span>。</p><p>具体来说：这两种架构之间的区别：</p><ul><li><p><strong>基于栈式架构的特点</strong></p><ul><li>设计和实现更简单，适用于资源受限的系统；</li><li>避开了寄存器的分配难题：使用零地址指令方式分配。</li><li>指令流中的指令大部分是零地址指令，其执行过程依赖于操作栈。指令集更小，编译器容易实现。</li><li>不需要硬件支持，可移植性更好，更好实现跨平台</li></ul></li><li><p><strong>基于寄存器架构的特点</strong></p><ul><li>典型的应用是x86的二进制指令集：比如传统的PC以及Android的Davlik虚拟机。</li><li><span style="color:red;">指令集架构则完全依赖硬件，可移植性差。</span></li><li><span style="color:red;">性能优秀和执行更高效；</span></li><li>花费更少的指令去完成一项操作。</li><li>在大部分情况下，基于寄存器架构的指令集往往都以一地址指令、二地址指令和三地址指令主，而基于栈式架构的指令集却是以零地址指令为主。</li></ul></li></ul><p>::: note 举例</p><p>同样执行2+3这种逻辑操作，其指令分别如下：</p><p>基于栈的计算流程（以Java虚拟机例）：</p><img src="'+u+'" alt="image-20240314033410731"><p>而基于寄存器的计算流程：</p><img src="'+M+'" alt="image-20240314033456992"><p>:::</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to “总结”">​</a></h3><p><span style="color:red;">由于跨平台性的设计，Java的指令都是根据栈来设计的。</span>不同平台CPU架构不同，所以不能设计为基于寄存器的。优点是跨平台，指令集小，编译器容易实现，缺点是性能下降，实现同样的功能需要更多的指令。</p><p>时至今日，尽管嵌入式平台已经不是Java程序的主流运行平台了（准确来说应该是HotSpotVM的宿主环境已经不局限于嵌入式平台了），那么为什么不将架构更换方基于寄存器的架构呢？</p><h2 id="jvm的生命周期" tabindex="-1">JVM的生命周期 <a class="header-anchor" href="#jvm的生命周期" aria-label="Permalink to “JVM的生命周期”">​</a></h2><p><strong>虚拟机的启动</strong></p><p>Java虚拟机的启动是通过引导类加载器(bootstrap class loader) 创建一个初始类(initial class)来完成的， 这个类是由虚拟机的具体实现指定的。</p><p><strong>虚拟机的执行</strong></p><ul><li>一个运行中的Java虛拟机有着一个清晰的任务: 执行Java程序。</li><li>程序开始执行时他才运行，程序结束时他就停止。</li><li><span style="color:red;">执行一个所谓的Java程序的时候，真真正正在执行的是一个叫做Java虚拟机的进程。</span></li></ul><p><strong>虚拟机的退出</strong></p><p>有如下的几种情况:</p><ul><li><p>程序正常执行结束</p></li><li><p>程序在执行过程中遇到了异常或错误而异常终止</p></li><li><p>由于操作系统出现错误而导致Java虛拟机进程终止</p></li><li><p>某线程调用Runtime类或System类的<code>exit</code>方法，或Runtime类的<code>halt</code>方法，并且Java安全管理器也允许这次<code>exit</code>或<code>halt</code>操作。</p></li><li><p>除此之外，JNI (Java Native Interface)规范描述了用JNI Invocation API来加载或卸载Java虚拟机时，Java虚拟机的退出情况。</p></li></ul><h2 id="jvm发展历程" tabindex="-1">JVM发展历程 <a class="header-anchor" href="#jvm发展历程" aria-label="Permalink to “JVM发展历程”">​</a></h2><p>略...</p>',43);function j(a,k,x,P,y,C){const r=o,s=p("ClientOnly");return t(),c("div",null,[b,d(s,null,{default:v(()=>{var e,l;return[(((e=a.$frontmatter)==null?void 0:e.aside)??!0)&&(((l=a.$frontmatter)==null?void 0:l.showArticleMetadata)??!0)?(t(),J(r,{key:0,article:a.$frontmatter},null,8,["article"])):m("",!0)]}),_:1}),f])}const A=n(g,[["render",j]]);export{T as __pageData,A as default};

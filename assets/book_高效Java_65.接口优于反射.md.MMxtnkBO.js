import{_ as e,c as t,o as a,aj as s}from"./chunks/framework._AF764y6.js";const f=JSON.parse('{"title":"接口优于反射","description":"","frontmatter":{"title":"接口优于反射","date":"2023-10-25T01:05:38.000Z","permalink":"/Chapter-9/Chapter-9-Item-65-Prefer-interfaces-to-reflection.html","categories":["技术书籍","高效Java","通用程序设计"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/65.接口优于反射.md","filePath":"book/高效Java/65.接口优于反射.md","lastUpdated":1743259133000}'),n={name:"book/高效Java/65.接口优于反射.md"},i=s(`<h3 id="item-65-prefer-interfaces-to-reflection-接口优于反射" tabindex="-1">Item 65: Prefer interfaces to reflection（接口优于反射） <a class="header-anchor" href="#item-65-prefer-interfaces-to-reflection-接口优于反射" aria-label="Permalink to “Item 65: Prefer interfaces to reflection（接口优于反射）”">​</a></h3><p>The core reflection facility, java.lang.reflect, offers programmatic access to arbitrary classes. Given a Class object, you can obtain Constructor, Method, and Field instances representing the constructors, methods, and fields of the class represented by the Class instance. These objects provide programmatic access to the class’s member names, field types, method signatures, and so on.</p><p>核心反射机制 <code>java.lang.reflect</code> 提供对任意类的编程访问。给定一个 Class 对象，你可以获得 Constructor、Method 和 Field 实例，分别代表了该 Class 实例所表示的类的构造器、方法和字段。这些对象提供对类的成员名、字段类型、方法签名等的编程访问。</p><p>Moreover, Constructor, Method, and Field instances let you manipulate their underlying counterparts reflectively: you can construct instances, invoke methods, and access fields of the underlying class by invoking methods on the Constructor, Method, and Field instances. For example, Method.invoke lets you invoke any method on any object of any class (subject to the usual security constraints). Reflection allows one class to use another, even if the latter class did not exist when the former was compiled. This power, however, comes at a price:</p><p>此外，Constructor、Method 和 Field 实例允许你反射性地操作它们的底层对应项：你可以通过调用 Constructor、Method 和 Field 实例上的方法，可以构造底层类的实例、调用底层类的方法，并访问底层类中的字段。例如，Method.invoke 允许你在任何类的任何对象上调用任何方法（受默认的安全约束）。反射允许一个类使用另一个类，即使在编译前者时后者并不存在。然而，这种能力是有代价的：</p><ul><li><strong>You lose all the benefits of compile-time type checking,</strong> including exception checking. If a program attempts to invoke a nonexistent or inaccessible method reflectively, it will fail at runtime unless you’ve taken special precautions.</li></ul><p>你失去了编译时类型检查的所有好处，包括异常检查。如果一个程序试图反射性地调用一个不存在的或不可访问的方法，它将在运行时失败，除非你采取了特殊的预防措施。</p><ul><li><strong>The code required to perform reflective access is clumsy and verbose.</strong> It is tedious to write and difficult to read.</li></ul><p>执行反射访问所需的代码既笨拙又冗长。写起来很乏味，读起来也很困难。</p><ul><li><strong>Performance suffers.</strong> Reflective method invocation is much slower than normal method invocation. Exactly how much slower is hard to say, as there are many factors at work. On my machine, invoking a method with no input parameters and an int return was eleven times slower when done reflectively.</li></ul><p>性能降低。反射方法调用比普通方法调用慢得多。到底慢了多少还很难说，因为有很多因素在起作用。在我的机器上，调用一个没有输入参数和返回 int 类型的方法时，用反射执行要慢 11 倍。</p><p>There are a few sophisticated applications that require reflection. Examples include code analysis tools and dependency injection frameworks. Even such tools have been moving away from reflection of late, as its disadvantages become clearer. If you have any doubts as to whether your application requires reflection, it probably doesn’t.</p><p>有一些复杂的应用程序需要反射。包括代码分析工具和依赖注入框架。即使是这样的工具，随着它的缺点变得越来越明显，人们也在逐渐远离并反思这种用法。如果你对应用程序是否需要反射有任何疑问，那么它可能不需要。</p><p><strong>You can obtain many of the benefits of reflection while incurring few of its costs by using it only in a very limited form.</strong> For many programs that must use a class that is unavailable at compile time, there exists at compile time an appropriate interface or superclass by which to refer to the class (Item 64). If this is the case, you can <strong>create instances reflectively and access them normally via their interface or superclass.</strong></p><p><strong>通过非常有限的形式使用反射，你可以获得反射的许多好处，同时花费的代价很少。</strong> 对于许多程序，它们必须用到在编译时无法获取的类，在编译时存在一个适当的接口或超类来引用该类（<a href="/Chapter-9/Chapter-9-Item-64-Refer-to-objects-by-their-interfaces">Item-64</a>）。如果是这种情况，<strong>可以用反射方式创建实例，并通过它们的接口或超类正常地访问它们。</strong></p><p>For example, here is a program that creates a <code>Set&lt;String&gt;</code> instance whose class is specified by the first command line argument. The program inserts the remaining command line arguments into the set and prints it. Regardless of the first argument, the program prints the remaining arguments with duplicates eliminated. The order in which these arguments are printed, however, depends on the class specified in the first argument. If you specify java.util.HashSet, they’re printed in apparently random order; if you specify java.util.TreeSet, they’re printed in alphabetical order because the elements in a TreeSet are sorted:</p><p>例如，这是一个创建 <code>Set&lt;String&gt;</code> 实例的程序，类由第一个命令行参数指定。程序将剩余的命令行参数插入到集合中并打印出来。不管第一个参数是什么，程序都会打印剩余的参数，并去掉重复项。然而，打印这些参数的顺序取决于第一个参数中指定的类。如果你指定 <code>java.util.HashSet</code>，它们显然是随机排列的；如果你指定 <code>java.util.TreeSet</code>，它们是按字母顺序打印的，因为 TreeSet 中的元素是有序的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Reflective instantiation with interface access</span></span>
<span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Translate the class name into a Class object</span></span>
<span class="line"><span>    Class&lt;? extends Set&lt;String&gt;&gt; cl = null;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        cl = (Class&lt;? extends Set&lt;String&gt;&gt;) // Unchecked cast!</span></span>
<span class="line"><span>        Class.forName(args[0]);</span></span>
<span class="line"><span>    } catch (ClassNotFoundException e) {</span></span>
<span class="line"><span>        fatalError(&quot;Class not found.&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Get the constructor</span></span>
<span class="line"><span>    Constructor&lt;? extends Set&lt;String&gt;&gt; cons = null;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        cons = cl.getDeclaredConstructor();</span></span>
<span class="line"><span>    } catch (NoSuchMethodException e) {</span></span>
<span class="line"><span>        fatalError(&quot;No parameterless constructor&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Instantiate the set</span></span>
<span class="line"><span>    Set&lt;String&gt; s = null;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        s = cons.newInstance();</span></span>
<span class="line"><span>    } catch (IllegalAccessException e) {</span></span>
<span class="line"><span>        fatalError(&quot;Constructor not accessible&quot;);</span></span>
<span class="line"><span>    } catch (InstantiationException e) {</span></span>
<span class="line"><span>        fatalError(&quot;Class not instantiable.&quot;);</span></span>
<span class="line"><span>    } catch (InvocationTargetException e) {</span></span>
<span class="line"><span>        fatalError(&quot;Constructor threw &quot; + e.getCause());</span></span>
<span class="line"><span>    } catch (ClassCastException e) {</span></span>
<span class="line"><span>        fatalError(&quot;Class doesn&#39;t implement Set&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Exercise the set</span></span>
<span class="line"><span>    s.addAll(Arrays.asList(args).subList(1, args.length));</span></span>
<span class="line"><span>    System.out.println(s);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private static void fatalError(String msg) {</span></span>
<span class="line"><span>    System.err.println(msg);</span></span>
<span class="line"><span>    System.exit(1);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>While this program is just a toy, the technique it demonstrates is quite powerful. The toy program could easily be turned into a generic set tester that validates the specified Set implementation by aggressively manipulating one or more instances and checking that they obey the Set contract. Similarly, it could be turned into a generic set performance analysis tool. In fact, this technique is sufficiently powerful to implement a full-blown service provider framework (Item 1). Usually, this technique is all that you need in the way of reflection.</p><p>虽然这个程序只是一个小把戏，但它演示的技术非常强大。这个程序可以很容易地转换成一个通用的集合测试器，通过积极地操作一个或多个实例并检查它们是否遵守 Set 接口约定来验证指定的 Set 实现。类似地，它可以变成一个通用的集合性能分析工具。事实上，该技术足够强大，可以实现一个成熟的服务提供者框架（<a href="/Chapter-2/Chapter-2-Item-1-Consider-static-factory-methods-instead-of-constructors">Item-1</a>）。</p><p>This example demonstrates two disadvantages of reflection. First, the example can generate six different exceptions at runtime, all of which would have been compile-time errors if reflective instantiation were not used. (For fun, you can cause the program to generate each of the six exceptions by passing in appropriate command line arguments.) The second disadvantage is that it takes twenty-five lines of tedious code to generate an instance of the class from its name, whereas a constructor invocation would fit neatly on a single line. The length of the program could be reduced by catching ReflectiveOperationException, a superclass of the various reflective exceptions that was introduced in Java 7. Both disadvantages are restricted to the part of the program that instantiates the object. Once instantiated, the set is indistinguishable from any other Set instance. In a real program, the great bulk of the code is thus unaffected by this limited use of reflection.</p><p>这个例子也说明了反射的两个缺点。首先，该示例可以在运行时生成六个不同的异常，如果没有使用反射实例化，所有这些异常都将是编译时错误。（有趣的是，你可以通过传入适当的命令行参数，使程序生成六个异常中的每一个。）第二个缺点是，根据类的名称生成类的实例需要 25 行冗长的代码，而构造函数调用只需要一行。通过捕获 ReflectiveOperationException（Java 7 中引入的各种反射异常的超类），可以减少程序的长度。这两个缺点都只限于实例化对象的程序部分。实例化后，与任何其他 Set 实例将难以区分。在实际的程序中，通过这种限定使用反射的方法，大部分代码可以免受影响。</p><p>If you compile this program, you’ll get an unchecked cast warning. This warning is legitimate, in that the cast to <code>Class&lt;? extends Set&lt;String&gt;&gt;</code> will succeed even if the named class is not a Set implementation, in which case the program with throw a ClassCastException when it instantiates the class. To learn about suppressing the warning, read Item 27.</p><p>如果编译此程序，将得到 unchecked 的强制转换警告。这个警告是合法的，即使指定的类不是 Set 实现，<code>Class&lt;? extends Set&lt;String&gt;&gt;</code> 也会成功，在这种情况下，程序在实例化类时抛出 ClassCastException。要了解如何抑制警告，请阅读 <a href="/Chapter-5/Chapter-5-Item-27-Eliminate-unchecked-warnings">Item-27</a>。</p><p>A legitimate, if rare, use of reflection is to manage a class’s dependencies on other classes, methods, or fields that may be absent at runtime. This can be useful if you are writing a package that must run against multiple versions of some other package. The technique is to compile your package against the minimal environment required to support it, typically the oldest version, and to access any newer classes or methods reflectively. To make this work, you have to take appropriate action if a newer class or method that you are attempting to access does not exist at runtime. Appropriate action might consist of using some alternate means to accomplish the same goal or operating with reduced functionality.</p><p>反射的合法用途（很少）是管理类对运行时可能不存在的其他类、方法或字段的依赖关系。如果你正在编写一个包，并且必须针对其他包的多个版本运行，此时反射将非常有用。该技术是根据支持包所需的最小环境（通常是最老的版本）编译包，并反射性地访问任何较新的类或方法。如果你试图访问的新类或方法在运行时不存在，要使此工作正常进行，则必须采取适当的操作。适当的操作可能包括使用一些替代方法来完成相同的目标，或者使用简化的功能进行操作。</p><p>In summary, reflection is a powerful facility that is required for certain sophisticated system programming tasks, but it has many disadvantages. If you are writing a program that has to work with classes unknown at compile time, you should, if at all possible, use reflection only to instantiate objects, and access the objects using some interface or superclass that is known at compile time.</p><p>总之，反射是一种功能强大的工具，对于某些复杂的系统编程任务是必需的，但是它有很多缺点。如果编写的程序必须在编译时处理未知的类，则应该尽可能只使用反射实例化对象，并使用在编译时已知的接口或超类访问对象。</p><hr><p><strong><a href="/Chapter-9/Chapter-9-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-9/Chapter-9-Item-64-Refer-to-objects-by-their-interfaces">Item 64: Refer to objects by their interfaces（通过接口引用对象）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-9/Chapter-9-Item-66-Use-native-methods-judiciously">Item 66: Use native methods judiciously（明智地使用本地方法）</a></strong></li></ul>`,31),o=[i];function r(c,l,p,h,d,m){return a(),t("div",null,o)}const g=e(n,[["render",r]]);export{f as __pageData,g as default};

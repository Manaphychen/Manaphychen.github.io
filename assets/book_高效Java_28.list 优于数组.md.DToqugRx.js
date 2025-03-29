import{_ as e,c as a,o as t,aj as s}from"./chunks/framework._AF764y6.js";const m=JSON.parse('{"title":"list 优于数组","description":"","frontmatter":{"title":"list 优于数组","date":"2023-10-25T01:05:38.000Z","permalink":"/Chapter-5/Chapter-5-Item-28-Prefer-lists-to-arrays.html","categories":["技术书籍","高效Java","泛型"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/28.list 优于数组.md","filePath":"book/高效Java/28.list 优于数组.md","lastUpdated":1743259133000}'),n={name:"book/高效Java/28.list 优于数组.md"},i=s(`<h3 id="item-28-prefer-lists-to-arrays-list-优于数组" tabindex="-1">Item 28: Prefer lists to arrays（list 优于数组） <a class="header-anchor" href="#item-28-prefer-lists-to-arrays-list-优于数组" aria-label="Permalink to “Item 28: Prefer lists to arrays（list 优于数组）”">​</a></h3><p>Arrays differ from generic types in two important ways. First, arrays are covariant. This scary-sounding word means simply that if Sub is a subtype of Super, then the array type Sub[] is a subtype of the array type Super[]. Generics, by contrast, are invariant: for any two distinct types Type1 and Type2, <code>List&lt;Type1&gt;</code> is neither a subtype nor a supertype of <code>List&lt;Type2&gt;</code> [JLS, 4.10; Naftalin07, 2.5]. You might think this means that generics are deficient, but arguably（可能，大概） it is arrays that are deficient. This code fragment is legal:</p><p>数组与泛型有两个重要区别。首先，数组是协变的。这个听起来很吓人的单词的意思很简单，如果 Sub 是 Super 的一个子类型，那么数组类型 Sub[] 就是数组类型 Super[] 的一个子类型。相比之下，泛型是不变的：对于任何两个不同类型 Type1 和 Type2，<code>List&lt;Type1&gt;</code> 既不是 <code>List&lt;Type2&gt;</code> 的子类型，也不是 <code>List&lt;Type2&gt;</code> 的超类型 [JLS, 4.10; Naftalin07, 2.5]。你可能认为这意味着泛型是有缺陷的，但可以说数组才是有缺陷的。这段代码是合法的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Fails at runtime!</span></span>
<span class="line"><span>Object[] objectArray = new Long[1];</span></span>
<span class="line"><span>objectArray[0] = &quot;I don&#39;t fit in&quot;; // Throws ArrayStoreException</span></span></code></pre></div><p>but this one is not:</p><p>但这一段代码就不是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Won&#39;t compile!</span></span>
<span class="line"><span>List&lt;Object&gt; ol = new ArrayList&lt;Long&gt;(); // Incompatible types</span></span>
<span class="line"><span>ol.add(&quot;I don&#39;t fit in&quot;);</span></span></code></pre></div><p>Either way you can’t put a String into a Long container, but with an array you find out that you’ve made a mistake at runtime; with a list, you find out at compile time. Of course, you’d rather find out at compile time.</p><p>两种方法都不能将 String 放入 Long 容器，但使用数组，你会得到一个运行时错误；使用 list，你可以在编译时发现问题。当然，你更希望在编译时找到问题。</p><p>The second major difference between arrays and generics is that arrays are reified [JLS, 4.7]. This means that arrays know and enforce their element type at runtime. As noted earlier, if you try to put a String into an array of Long, you’ll get an ArrayStoreException. Generics, by contrast, are implemented by erasure [JLS, 4.6]. This means that they enforce their type constraints only at compile time and discard (or erase) their element type information at runtime. Erasure is what allowed generic types to interoperate freely with legacy code that didn’t use generics (Item 26), ensuring a smooth transition to generics in Java 5.</p><p>数组和泛型之间的第二个主要区别：数组是具体化的 [JLS, 4.7]。这意味着数组在运行时知道并强制执行他们的元素类型。如前所述，如果试图将 String 元素放入一个 Long 类型的数组中，就会得到 ArrayStoreException。相比之下，泛型是通过擦除来实现的 [JLS, 4.6]。这意味着它们只在编译时执行类型约束，并在运行时丢弃（或擦除）元素类型信息。擦除允许泛型与不使用泛型的遗留代码自由交互操作（<a href="/Chapter-5/Chapter-5-Item-26-Do-not-use-raw-types">Item-26</a>），确保在 Java 5 中平稳地过渡。</p><p>Because of these fundamental differences, arrays and generics do not mix well. For example, it is illegal to create an array of a generic type, a parameterized type, or a type parameter. Therefore, none of these array creation expressions are legal: <code>new List&lt;E&gt;[]</code>, <code>new List&lt;String&gt;[]</code>, <code>new E[]</code>. All will result in generic array creation errors at compile time.</p><p>由于这些基本差异，数组和泛型不能很好地混合。例如，创建泛型、参数化类型或类型参数的数组是非法的。因此，这些数组创建表达式都不是合法的：<code>new List&lt;E&gt;[]</code>、<code>new List&lt;String&gt;[]</code>、<code>new E[]</code>。所有这些都会在编译时导致泛型数组创建错误。</p><p>Why is it illegal to create a generic array? Because it isn’t typesafe. If it were legal, casts generated by the compiler in an otherwise correct program could fail at runtime with a ClassCastException. This would violate the fundamental guarantee provided by the generic type system.</p><p>为什么创建泛型数组是非法的？因为这不是类型安全的。如果合法，编译器在其他正确的程序中生成的强制转换在运行时可能会失败，并导致 ClassCastException。这将违反泛型系统提供的基本保证。</p><p>To make this more concrete, consider the following code fragment:</p><p>为了更具体，请考虑以下代码片段：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Why generic array creation is illegal - won&#39;t compile!</span></span>
<span class="line"><span>List&lt;String&gt;[] stringLists = new List&lt;String&gt;[1]; // (1)</span></span>
<span class="line"><span>List&lt;Integer&gt; intList = List.of(42); // (2)</span></span>
<span class="line"><span>Object[] objects = stringLists; // (3)</span></span>
<span class="line"><span>objects[0] = intList; // (4)</span></span>
<span class="line"><span>String s = stringLists[0].get(0); // (5)</span></span></code></pre></div><p>Let’s pretend that line 1, which creates a generic array, is legal. Line 2 creates and initializes a <code>List&lt;Integer&gt;</code> containing a single element. Line 3 stores the <code>List&lt;String&gt;</code> array into an Object array variable, which is legal because arrays are covariant. Line 4 stores the <code>List&lt;Integer&gt;</code> into the sole element of the Object array, which succeeds because generics are implemented by erasure: the runtime type of a <code>List&lt;Integer&gt;</code> instance is simply List, and the runtime type of a <code>List&lt;String&gt;</code>[] instance is List[], so this assignment doesn’t generate an ArrayStoreException. Now we’re in trouble. We’ve stored a <code>List&lt;Integer&gt;</code> instance into an array that is declared to hold only <code>List&lt;String&gt;</code> instances. In line 5, we retrieve the sole element from the sole list in this array. The compiler automatically casts the retrieved element to String, but it’s an Integer, so we get a ClassCastException at runtime. In order to prevent this from happening, line 1 (which creates a generic array) must generate a compile-time error.</p><p>假设创建泛型数组的第 1 行是合法的。第 2 行创建并初始化一个包含单个元素的 <code>List&lt;Integer&gt;</code>。第 3 行将 <code>List&lt;String&gt;</code> 数组存储到 Object 类型的数组变量中，这是合法的，因为数组是协变的。第 4 行将 <code>List&lt;Integer&gt;</code> 存储到 Object 类型的数组的唯一元素中，这是成功的，因为泛型是由擦除实现的：<code>List&lt;Integer&gt;</code> 实例的运行时类型是 List，<code>List&lt;String&gt;</code>[] 实例的运行时类型是 List[]，因此这个赋值不会生成 ArrayStoreException。现在我们有麻烦了。我们将一个 <code>List&lt;Integer&gt;</code> 实例存储到一个数组中，该数组声明只保存 <code>List&lt;String&gt;</code> 实例。在第 5 行，我们从这个数组的唯一列表中检索唯一元素。编译器自动将检索到的元素转换为 String 类型，但它是一个 Integer 类型的元素，因此我们在运行时得到一个 ClassCastException。为了防止这种情况发生，第 1 行（创建泛型数组）必须生成编译时错误。</p><p>Types such as E, <code>List&lt;E&gt;</code>, and <code>List&lt;String&gt;</code> are technically known as nonreifiable types [JLS, 4.7]. Intuitively speaking, a non-reifiable type is one whose runtime representation contains less information than its compile-time representation. Because of erasure, the only parameterized types that are reifiable are unbounded wildcard types such as <code>List&lt;?&gt;</code> and <code>Map&lt;?,?&gt;</code> (Item 26). It is legal, though rarely useful, to create arrays of unbounded wildcard types.</p><p>E、<code>List&lt;E&gt;</code> 和 <code>List&lt;string&gt;</code> 等类型在技术上称为不可具体化类型 [JLS, 4.7]。直观地说，非具体化类型的运行时表示包含的信息少于其编译时表示。由于擦除，唯一可具体化的参数化类型是无限制通配符类型，如 <code>List&lt;?&gt;</code> 和 <code>Map&lt;?,?&gt;</code>（<a href="/Chapter-5/Chapter-5-Item-26-Do-not-use-raw-types">Item-26</a>）。创建无边界通配符类型数组是合法的，但不怎么有用。</p><p>The prohibition on generic array creation can be annoying. It means, for example, that it’s not generally possible for a generic collection to return an array of its element type (but see Item 33 for a partial solution). It also means that you get confusing warnings when using varargs methods (Item 53) in combination with generic types. This is because every time you invoke a varargs method, an array is created to hold the varargs parameters. If the element type of this array is not reifiable, you get a warning. The SafeVarargs annotation can be used to address this issue (Item 32).</p><p>禁止创建泛型数组可能很烦人。例如，这意味着泛型集合通常不可能返回其元素类型的数组（部分解决方案请参见 <a href="/Chapter-5/Chapter-5-Item-33-Consider-typesafe-heterogeneous-containers">Item-33</a>）。这也意味着在使用 varargs 方法（<a href="/Chapter-8/Chapter-8-Item-53-Use-varargs-judiciously">Item-53</a>）与泛型组合时，你会得到令人困惑的警告。这是因为每次调用 varargs 方法时，都会创建一个数组来保存 varargs 参数。如果该数组的元素类型不可具体化，则会得到警告。SafeVarargs 注解可以用来解决这个问题（<a href="/Chapter-5/Chapter-5-Item-32-Combine-generics-and-varargs-judiciously">Item-32</a>）。</p><p><strong>译注：varargs 方法，指带有可变参数的方法。</strong></p><p>When you get a generic array creation error or an unchecked cast warning on a cast to an array type, the best solution is often to use the collection type <code>List&lt;E&gt;</code> in preference to the array type E[]. You might sacrifice some conciseness or performance, but in exchange you get better type safety and interoperability.</p><p>当你在转换为数组类型时遇到泛型数组创建错误或 unchecked 强制转换警告时，通常最好的解决方案是使用集合类型 <code>List&lt;E&gt;</code>，而不是数组类型 E[]。你可能会牺牲一些简洁性或性能，但作为交换，你可以获得更好的类型安全性和互操作性。</p><p>For example, suppose you want to write a Chooser class with a constructor that takes a collection, and a single method that returns an element of the collection chosen at random. Depending on what collection you pass to the constructor, you could use a chooser as a game die, a magic 8-ball, or a data source for a Monte Carlo simulation. Here’s a simplistic implementation without generics:</p><p>例如，假设你希望编写一个 Chooser 类，该类的构造函数接受一个集合，而单个方法返回随机选择的集合元素。根据传递给构造函数的集合，可以将选择器用作游戏骰子、魔术 8 球或蒙特卡洛模拟的数据源。下面是一个没有泛型的简单实现：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Chooser - a class badly in need of generics!</span></span>
<span class="line"><span>public class Chooser {</span></span>
<span class="line"><span>  private final Object[] choiceArray;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public Chooser(Collection choices) {</span></span>
<span class="line"><span>    choiceArray = choices.toArray();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public Object choose() {</span></span>
<span class="line"><span>    Random rnd = ThreadLocalRandom.current();</span></span>
<span class="line"><span>    return choiceArray[rnd.nextInt(choiceArray.length)];</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>To use this class, you have to cast the choose method’s return value from Object to the desired type every time you use invoke the method, and the cast will fail at runtime if you get the type wrong. Taking the advice of Item 29 to heart, we attempt to modify Chooser to make it generic. Changes are shown in boldface:</p><p>要使用这个类，每次使用方法调用时，必须将 choose 方法的返回值从对象转换为所需的类型，如果类型错误，转换将在运行时失败。我们认真考虑了 <a href="/Chapter-5/Chapter-5-Item-29-Favor-generic-types">Item-29</a> 的建议，试图对 Chooser 进行修改，使其具有通用性。变化以粗体显示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// A first cut at making Chooser generic - won&#39;t compile</span></span>
<span class="line"><span>public class Chooser&lt;T&gt; {</span></span>
<span class="line"><span>  private final T[] choiceArray;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public Chooser(Collection&lt;T&gt; choices) {</span></span>
<span class="line"><span>    choiceArray = choices.toArray();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // choose method unchanged</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>If you try to compile this class, you’ll get this error message:</p><p>如果你尝试编译这个类，你将得到这样的错误消息：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>Chooser.java:9: error: incompatible types: Object[] cannot be converted to T[]</span></span>
<span class="line"><span>choiceArray = choices.toArray();</span></span>
<span class="line"><span>^ where T is a type-variable:</span></span>
<span class="line"><span>T extends Object declared in class Chooser</span></span></code></pre></div><p>No big deal, you say, I’ll cast the Object array to a T array:</p><p>没什么大不了的，你会说，我把对象数组转换成 T 数组：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>choiceArray = (T[]) choices.toArray();</span></span></code></pre></div><p>This gets rid of the error, but instead you get a warning:</p><p>这样就消除了错误，但你得到一个警告：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>Chooser.java:9: warning: [unchecked] unchecked cast choiceArray = (T[]) choices.toArray();</span></span>
<span class="line"><span>^ required: T[], found: Object[]</span></span>
<span class="line"><span>where T is a type-variable:</span></span>
<span class="line"><span>T extends Object declared in class Chooser</span></span></code></pre></div><p>The compiler is telling you that it can’t vouch for the safety of the cast at runtime because the program won’t know what type T represents—remember, element type information is erased from generics at runtime. Will the program work? Yes, but the compiler can’t prove it. You could prove it to yourself, put the proof in a comment and suppress the warning with an annotation, but you’re better off eliminating the cause of warning (Item 27).</p><p>编译器告诉你，它不能保证在运行时转换的安全性，因为程序不知道类型 T 代表什么。记住，元素类型信息在运行时从泛型中删除。这个计划会奏效吗？是的，但是编译器不能证明它。你可以向自己证明这一点，但是你最好将证据放在注释中，指出消除警告的原因（<a href="/Chapter-5/Chapter-5-Item-27-Eliminate-unchecked-warnings">Item-27</a>），并使用注解隐藏警告。</p><p>To eliminate the unchecked cast warning, use a list instead of an array. Here is a version of the Chooser class that compiles without error or warning:</p><p>若要消除 unchecked 强制转换警告，请使用 list 而不是数组。下面是编译时没有错误或警告的 Chooser 类的一个版本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// List-based Chooser - typesafe</span></span>
<span class="line"><span>public class Chooser&lt;T&gt; {</span></span>
<span class="line"><span>    private final List&lt;T&gt; choiceList;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Chooser(Collection&lt;T&gt; choices) {</span></span>
<span class="line"><span>        choiceList = new ArrayList&lt;&gt;(choices);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public T choose() {</span></span>
<span class="line"><span>        Random rnd = ThreadLocalRandom.current();</span></span>
<span class="line"><span>        return choiceList.get(rnd.nextInt(choiceList.size()));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This version is a tad more verbose, and perhaps a tad slower, but it’s worth it for the peace of mind that you won’t get a ClassCastException at runtime.</p><p>这个版本稍微有点冗长，可能稍微慢一些，但是为了让你安心，在运行时不会得到 ClassCastException 是值得的。</p><p>In summary, arrays and generics have very different type rules. Arrays are covariant and reified; generics are invariant and erased. As a consequence, arrays provide runtime type safety but not compile-time type safety, and vice versa for generics. As a rule, arrays and generics don’t mix well. If you find yourself mixing them and getting compile-time errors or warnings, your first impulse should be to replace the arrays with lists.</p><p>总之，数组和泛型有非常不同的类型规则。数组是协变的、具体化的；泛型是不变的和可被擦除的。因此，数组提供了运行时类型安全，而不是编译时类型安全，对于泛型反之亦然。一般来说，数组和泛型不能很好地混合。如果你发现将它们混合在一起并得到编译时错误或警告，那么你的第一个反应该是将数组替换为 list。</p><hr><p><strong><a href="/Chapter-5/Chapter-5-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-5/Chapter-5-Item-27-Eliminate-unchecked-warnings">Item 27: Eliminate unchecked warnings（消除 unchecked 警告）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-5/Chapter-5-Item-29-Favor-generic-types">Item 29: Favor generic types（优先使用泛型）</a></strong></li></ul>`,54),r=[i];function o(p,c,l,d,h,g){return t(),a("div",null,r)}const y=e(n,[["render",o]]);export{m as __pageData,y as default};

import{_ as e,c as a,o as t,aj as s}from"./chunks/framework._AF764y6.js";const y=JSON.parse('{"title":"依赖注入优于硬连接资源","description":"","frontmatter":{"title":"依赖注入优于硬连接资源","date":"2023-10-25T00:49:10.000Z","categories":["高效Java"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/05.依赖注入优于硬连接资源.md","filePath":"book/高效Java/05.依赖注入优于硬连接资源.md","lastUpdated":1743259133000}'),n={name:"book/高效Java/05.依赖注入优于硬连接资源.md"},i=s(`<h3 id="item-5-prefer-dependency-injection-to-hardwiring-resources-依赖注入优于硬连接资源" tabindex="-1">Item 5: Prefer dependency injection to hardwiring resources（依赖注入优于硬连接资源） <a class="header-anchor" href="#item-5-prefer-dependency-injection-to-hardwiring-resources-依赖注入优于硬连接资源" aria-label="Permalink to “Item 5: Prefer dependency injection to hardwiring resources（依赖注入优于硬连接资源）”">​</a></h3><p>Many classes depend on one or more underlying resources. For example, a spell checker depends on a dictionary. It is not uncommon to see such classes implemented as static utility classes (Item 4):</p><p>许多类依赖于一个或多个底层资源。例如，拼写检查程序依赖于字典。常见做法是，将这种类实现为静态实用工具类（<a href="/Chapter-2/Chapter-2-Item-4-Enforce-noninstantiability-with-a-private-constructor">Item-4</a>）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Inappropriate use of static utility - inflexible &amp; untestable!</span></span>
<span class="line"><span>public class SpellChecker {</span></span>
<span class="line"><span>    private static final Lexicon dictionary = ...;</span></span>
<span class="line"><span>    private SpellChecker() {} // Noninstantiable</span></span>
<span class="line"><span>    public static boolean isValid(String word) { ... }</span></span>
<span class="line"><span>    public static List&lt;String&gt; suggestions(String typo) { ... }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Similarly, it’s not uncommon to see them implemented as singletons (Item 3):</p><p>类似地，我们也经常看到它们的单例实现（<a href="/Chapter-2/Chapter-2-Item-3-Enforce-the-singleton-property-with-a-private-constructor-or-an-enum-type">Item-3</a>）:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Inappropriate use of singleton - inflexible &amp; untestable!</span></span>
<span class="line"><span>public class SpellChecker {</span></span>
<span class="line"><span>    private final Lexicon dictionary = ...;</span></span>
<span class="line"><span>    private SpellChecker(...) {}</span></span>
<span class="line"><span>    public static INSTANCE = new SpellChecker(...);</span></span>
<span class="line"><span>    public boolean isValid(String word) { ... }</span></span>
<span class="line"><span>    public List&lt;String&gt; suggestions(String typo) { ... }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Neither of these approaches is satisfactory, because they assume that there is only one dictionary worth using. In practice, each language has its own dictionary, and special dictionaries are used for special vocabularies. Also, it may be desirable to use a special dictionary for testing. It is wishful thinking to assume that a single dictionary will suffice for all time.</p><p>这两种方法都不令人满意，因为它们假设只使用一个字典。在实际应用中，每种语言都有自己的字典，特殊的字典用于特殊的词汇表。另外，最好使用一个特殊的字典进行测试。认为一本字典就足够了，是一厢情愿的想法。</p><p>You could try to have SpellChecker support multiple dictionaries by making the dictionary field nonfinal and adding a method to change the dictionary in an existing spell checker, but this would be awkward, error-prone,and unworkable in a concurrent setting. <strong>Static utility classes and singletons are inappropriate for classes whose behavior is parameterized by an underlying resource.</strong></p><p>你可以尝试让 SpellChecker 支持多个字典：首先取消 dictionary 字段的 final 修饰，并在现有的拼写检查器中添加更改 dictionary 的方法。但是在并发环境中这种做法是笨拙的、容易出错的和不可行的。<strong>静态实用工具类和单例不适用于由底层资源参数化的类。</strong></p><p>What is required is the ability to support multiple instances of the class (in our example, SpellChecker), each of which uses the resource desired by the client (in our example, the dictionary). A simple pattern that satisfies this requirement is to <strong>pass the resource into the constructor when creating a new instance.</strong> This is one form of dependency injection: the dictionary is a dependency of the spell checker and is injected into the spell checker when it is created.</p><p>所需要的是支持类的多个实例的能力（在我们的示例中是 SpellChecker），每个实例都使用客户端需要的资源（在我们的示例中是 dictionary）。满足此要求的一个简单模式是在<strong>创建新实例时将资源传递给构造函数。</strong> 这是依赖注入的一种形式：字典是拼写检查器的依赖项，在创建它时被注入到拼写检查器中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Dependency injection provides flexibility and testability</span></span>
<span class="line"><span>public class SpellChecker {</span></span>
<span class="line"><span>    private final Lexicon dictionary;</span></span>
<span class="line"><span>    public SpellChecker(Lexicon dictionary) {</span></span>
<span class="line"><span>        this.dictionary = Objects.requireNonNull(dictionary);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    public boolean isValid(String word) { ... }</span></span>
<span class="line"><span>    public List&lt;String&gt; suggestions(String typo) { ... }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The dependency injection pattern is so simple that many programmers use it for years without knowing it has a name. While our spell checker example had only a single resource (the dictionary), dependency injection works with an arbitrary number of resources and arbitrary dependency graphs. It preserves immutability (Item 17), so multiple clients can share dependent objects(assuming the clients desire the same underlying resources). Dependency injection is equally applicable to constructors, static factories (Item 1), and builders (Item 2).</p><p>依赖注入模式非常简单，许多程序员在不知道其名称的情况下使用了多年。虽然拼写检查器示例只有一个资源（字典），但是依赖注入可以处理任意数量的资源和任意依赖路径。它保持了不可变性（<a href="/Chapter-4/Chapter-4-Item-17-Minimize-mutability">Item-17</a>），因此多个客户端可以共享依赖对象（假设客户端需要相同的底层资源）。依赖注入同样适用于构造函数、静态工厂（<a href="/Chapter-2/Chapter-2-Item-1-Consider-static-factory-methods-instead-of-constructors">Item-1</a>）和构建器（<a href="/Chapter-2/Chapter-2-Item-2-Consider-a-builder-when-faced-with-many-constructor-parameters">Item-2</a>）。</p><p>A useful variant of the pattern is to pass a resource factory to the constructor.A factory is an object that can be called repeatedly to create instances of a type.Such factories embody the Factory Method pattern [Gamma95]. The <code>Supplier&lt;T&gt;</code> interface, introduced in Java 8, is perfect for representing factories. Methods that take a <code>Supplier&lt;T&gt;</code> on input should typically constrain the factory’s type parameter using a bounded wildcard type (Item 31) to allow the client to pass in a factory that creates any subtype of a specified type. For example, here is a method that makes a mosaic using a client-provided factory to produce each tile:</p><p>这种模式的一个有用变体是将资源工厂传递给构造函数。工厂是一个对象，可以反复调用它来创建类型的实例。这样的工厂体现了工厂方法模式 [Gamma95]。Java 8 中引入的 <code>Supplier&lt;T&gt;</code> 非常适合表示工厂。在输入中接受 <code>Supplier&lt;T&gt;</code> 的方法通常应该使用有界通配符类型（<a href="/Chapter-5/Chapter-5-Item-31-Use-bounded-wildcards-to-increase-API-flexibility">Item-31</a>）来约束工厂的类型参数，以允许客户端传入创建指定类型的任何子类型的工厂。例如，这里有一个生产瓷砖方法，每块瓷砖都使用客户提供的工厂来制作马赛克：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>Mosaic create(Supplier&lt;? extends Tile&gt; tileFactory) { ... }</span></span></code></pre></div><p>Although dependency injection greatly improves flexibility and testability, it can clutter up（使杂乱） large projects, which typically contain thousands of dependencies.This clutter can be all but eliminated by using a dependency injection framework, such as Dagger [Dagger], Guice [Guice], or Spring [Spring]. The use of these frameworks is beyond the scope of this book, but note that APIs designed for manual dependency injection are trivially adapted for（适用于） use by these frameworks.</p><p>尽管依赖注入极大地提高了灵活性和可测试性，但它可能会使大型项目变得混乱，这些项目通常包含数千个依赖项。通过使用依赖注入框架（如 Dagger、Guice 或 Spring），几乎可以消除这种混乱。这些框架的使用超出了本书的范围，但是请注意，为手动依赖注入而设计的 API 很容易被这些框架所使用。</p><p>In summary, do not use a singleton or static utility class to implement a class that depends on one or more underlying resources whose behavior affects that of the class, and do not have the class create these resources directly. Instead, pass the resources, or factories to create them, into the constructor (or static factory or builder). This practice, known as dependency injection, will greatly enhance the flexibility, reusability, and testability of a class.</p><p>总之，不要使用单例或静态实用工具类来实现依赖于一个或多个底层资源的类，这些资源的行为会影响类的行为，也不要让类直接创建这些资源。相反，将创建它们的资源或工厂传递给构造函数（或静态工厂或构建器）。这种操作称为依赖注入，它将大大增强类的灵活性、可复用性和可测试性。</p><hr><p><strong><a href="/Chapter-2/Chapter-2-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-2/Chapter-2-Item-4-Enforce-noninstantiability-with-a-private-constructor">Item 4: Enforce noninstantiability with a private constructor（用私有构造函数实施不可实例化）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-2/Chapter-2-Item-6-Avoid-creating-unnecessary-objects">Item 6: Avoid creating unnecessary objects（避免创建不必要的对象）</a></strong></li></ul>`,26),r=[i];function o(p,c,l,d,h,u){return t(),a("div",null,r)}const g=e(n,[["render",o]]);export{y as __pageData,g as default};

import{_ as e,c as a,o as s,aj as n}from"./chunks/framework._AF764y6.js";const b=JSON.parse('{"title":"防御性地编写 readObject 方法","description":"","frontmatter":{"title":"防御性地编写 readObject 方法","date":"2023-10-25T01:05:38.000Z","permalink":"/Chapter-12/Chapter-12-Item-88-Write-readObject-methods-defensively.html","categories":["技术书籍","高效Java","序列化"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/88.防御性地编写 readObject 方法.md","filePath":"book/高效Java/88.防御性地编写 readObject 方法.md","lastUpdated":1743259133000}'),t={name:"book/高效Java/88.防御性地编写 readObject 方法.md"},i=n(`<h3 id="item-88-write-readobject-methods-defensively-防御性地编写-readobject-方法" tabindex="-1">Item 88: Write readObject methods defensively（防御性地编写 readObject 方法） <a class="header-anchor" href="#item-88-write-readobject-methods-defensively-防御性地编写-readobject-方法" aria-label="Permalink to “Item 88: Write readObject methods defensively（防御性地编写 readObject 方法）”">​</a></h3><p>Item 50 contains an immutable date-range class with mutable private Date fields. The class goes to great lengths to preserve its invariants and immutability by defensively copying Date objects in its constructor and accessors. Here is the class:</p><p><a href="/Chapter-8/Chapter-8-Item-50-Make-defensive-copies-when-needed">Item-50</a> 包含一个具有可变私有 Date 字段的不可变日期范围类。该类通过在构造函数和访问器中防御性地复制 Date 对象，不遗余力地保持其不变性和不可变性。它是这样的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Immutable class that uses defensive copying</span></span>
<span class="line"><span>public final class Period {</span></span>
<span class="line"><span>    private final Date start;</span></span>
<span class="line"><span>    private final Date end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>    * @param start the beginning of the period</span></span>
<span class="line"><span>    * @param end the end of the period; must not precede start</span></span>
<span class="line"><span>    * @throws IllegalArgumentException if start is after end</span></span>
<span class="line"><span>    * @throws NullPointerException if start or end is null</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    public Period(Date start, Date end) {</span></span>
<span class="line"><span>        this.start = new Date(start.getTime());</span></span>
<span class="line"><span>        this.end = new Date(end.getTime());</span></span>
<span class="line"><span>        if (this.start.compareTo(this.end) &gt; 0)</span></span>
<span class="line"><span>            throw new IllegalArgumentException(start + &quot; after &quot; + end);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Date start () { return new Date(start.getTime()); }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public Date end () { return new Date(end.getTime()); }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String toString() { return start + &quot; - &quot; + end; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ... // Remainder omitted</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Suppose you decide that you want this class to be serializable. Because the physical representation of a Period object exactly mirrors its logical data content, it is not unreasonable to use the default serialized form (Item 87). Therefore, it might seem that all you have to do to make the class serializable is to add the words implements Serializable to the class declaration. If you did so, however, the class would no longer guarantee its critical invariants.</p><p>假设你决定让这个类可序列化。由于 Period 对象的物理表示精确地反映了它的逻辑数据内容，所以使用默认的序列化形式是合理的（<a href="/Chapter-12/Chapter-12-Item-87-Consider-using-a-custom-serialized-form">Item-87</a>）。因此，要使类可序列化，似乎只需将实现 Serializable 接口。但是，如果这样做，该类将不再保证它的临界不变量。</p><p>The problem is that the readObject method is effectively another public constructor, and it demands all of the same care as any other constructor. Just as a constructor must check its arguments for validity (Item 49) and make defensive copies of parameters where appropriate (Item 50), so must a readObject method. If a readObject method fails to do either of these things, it is a relatively simple matter for an attacker to violate the class’s invariants.</p><p>问题是 readObject 方法实际上是另一个公共构造函数，它与任何其他构造函数有相同的注意事项。如，构造函数必须检查其参数的有效性（<a href="/Chapter-8/Chapter-8-Item-49-Check-parameters-for-validity">Item-49</a>）并在适当的地方制作防御性副本（<a href="/Chapter-8/Chapter-8-Item-50-Make-defensive-copies-when-needed">Item-50</a>）一样，readObject 方法也必须这样做。如果 readObject 方法没有做到这两件事中的任何一件，那么攻击者就很容易违反类的不变性。</p><p>Loosely speaking, readObject is a constructor that takes a byte stream as its sole parameter. In normal use, the byte stream is generated by serializing a normally constructed instance. The problem arises when readObject is presented with a byte stream that is artificially constructed to generate an object that violates the invariants of its class. Such a byte stream can be used to create an impossible object, which could not have been created using a normal constructor.</p><p>不严格地说，readObject 是一个构造函数，它唯一的参数是字节流。在正常使用中，字节流是通过序列化一个正常构造的实例生成的。当 readObject 呈现一个字节流时，问题就出现了，这个字节流是人为构造的，用来生成一个违反类不变性的对象。这样的字节流可用于创建一个不可思议的对象，而该对象不能使用普通构造函数创建。</p><p>Assume that we simply added implements Serializable to the class declaration for Period. This ugly program would then generate a Period instance whose end precedes its start. The casts on byte values whose highorder bit is set is a consequence of Java’s lack of byte literals combined with the unfortunate decision to make the byte type signed:</p><p>假设我们只是简单地让 Period 实现 Serializable 接口。然后，这个有问题的程序将生成一个 Period 实例，其结束比起始时间还要早。对其高位位设置的字节值进行强制转换，这是由于 Java 缺少字节字面值，再加上让字节类型签名的错误决定导致的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>public class BogusPeriod {</span></span>
<span class="line"><span>// Byte stream couldn&#39;t have come from a real Period instance!</span></span>
<span class="line"><span>    private static final byte[] serializedForm = {</span></span>
<span class="line"><span>        (byte)0xac, (byte)0xed, 0x00, 0x05, 0x73, 0x72, 0x00, 0x06,</span></span>
<span class="line"><span>        0x50, 0x65, 0x72, 0x69, 0x6f, 0x64, 0x40, 0x7e, (byte)0xf8,</span></span>
<span class="line"><span>        0x2b, 0x4f, 0x46, (byte)0xc0, (byte)0xf4, 0x02, 0x00, 0x02,</span></span>
<span class="line"><span>        0x4c, 0x00, 0x03, 0x65, 0x6e, 0x64, 0x74, 0x00, 0x10, 0x4c,</span></span>
<span class="line"><span>        0x6a, 0x61, 0x76, 0x61, 0x2f, 0x75, 0x74, 0x69, 0x6c, 0x2f,</span></span>
<span class="line"><span>        0x44, 0x61, 0x74, 0x65, 0x3b, 0x4c, 0x00, 0x05, 0x73, 0x74,</span></span>
<span class="line"><span>        0x61, 0x72, 0x74, 0x71, 0x00, 0x7e, 0x00, 0x01, 0x78, 0x70,</span></span>
<span class="line"><span>        0x73, 0x72, 0x00, 0x0e, 0x6a, 0x61, 0x76, 0x61, 0x2e, 0x75,</span></span>
<span class="line"><span>        0x74, 0x69, 0x6c, 0x2e, 0x44, 0x61, 0x74, 0x65, 0x68, 0x6a,</span></span>
<span class="line"><span>        (byte)0x81, 0x01, 0x4b, 0x59, 0x74, 0x19, 0x03, 0x00, 0x00,</span></span>
<span class="line"><span>        0x78, 0x70, 0x77, 0x08, 0x00, 0x00, 0x00, 0x66, (byte)0xdf,</span></span>
<span class="line"><span>        0x6e, 0x1e, 0x00, 0x78, 0x73, 0x71, 0x00, 0x7e, 0x00, 0x03,</span></span>
<span class="line"><span>        0x77, 0x08, 0x00, 0x00, 0x00, (byte)0xd5, 0x17, 0x69, 0x22,</span></span>
<span class="line"><span>        0x00, 0x78</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        Period p = (Period) deserialize(serializedForm);</span></span>
<span class="line"><span>        System.out.println(p);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Returns the object with the specified serialized form</span></span>
<span class="line"><span>    static Object deserialize(byte[] sf) {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            return new ObjectInputStream(new ByteArrayInputStream(sf)).readObject();</span></span>
<span class="line"><span>        } catch (IOException | ClassNotFoundException e) {</span></span>
<span class="line"><span>            throw new IllegalArgumentException(e);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The byte array literal used to initialize serializedForm was generated by serializing a normal Period instance and hand-editing the resulting byte stream. The details of the stream are unimportant to the example, but if you’re curious, the serialization byte-stream format is described in the Java Object Serialization Specification [Serialization, 6]. If you run this program, it prints Fri Jan 01 12:00:00 PST 1999 - Sun Jan 01 12:00:00 PST 1984. Simply declaring Period serializable enabled us to create an object that violates its class invariants.</p><p>用于初始化 serializedForm 的字节数组文本是通过序列化一个普通 Period 实例并手工编辑得到的字节流生成的。流的细节对示例并不重要，但是如果你感兴趣，可以在《JavaTM Object Serialization Specification》[serialization, 6]中查到序列化字节流的格式描述。如果你运行这个程序，它将打印 <code>Fri Jan 01 12:00:00 PST 1999 - Sun Jan 01 12:00:00 PST 1984</code>。只需声明 Period 可序列化，就可以创建一个违反其类不变性的对象。</p><p>To fix this problem, provide a readObject method for Period that calls defaultReadObject and then checks the validity of the deserialized object. If the validity check fails, the readObject method throws InvalidObjectException, preventing the deserialization from completing:</p><p>要解决此问题，请为 Period 提供一个 readObject 方法，该方法调用 defaultReadObject，然后检查反序列化对象的有效性。如果有效性检查失败，readObject 方法抛出 InvalidObjectException，阻止反序列化完成：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// readObject method with validity checking - insufficient!</span></span>
<span class="line"><span>private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {</span></span>
<span class="line"><span>    s.defaultReadObject();</span></span>
<span class="line"><span>    // Check that our invariants are satisfied</span></span>
<span class="line"><span>    if (start.compareTo(end) &gt; 0)</span></span>
<span class="line"><span>        throw new InvalidObjectException(start +&quot; after &quot;+ end);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>While this prevents an attacker from creating an invalid Period instance, there is a more subtle problem still lurking. It is possible to create a mutable Period instance by fabricating a byte stream that begins with a valid Period instance and then appends extra references to the private Date fields internal to the Period instance. The attacker reads the Period instance from the ObjectInputStream and then reads the “rogue object references” that were appended to the stream. These references give the attacker access to the objects referenced by the private Date fields within the Period object. By mutating these Date instances, the attacker can mutate the Period instance. The following class demonstrates this attack:</p><p>虽然这可以防止攻击者创建无效的 Period 实例，但还有一个更微妙的问题仍然潜伏着。可以通过字节流来创建一个可变的 Period 实例，该字节流以一个有效的 Period 实例开始，然后向 Period 实例内部的私有日期字段追加额外的引用。攻击者从 ObjectInputStream 中读取 Period 实例，然后读取附加到流中的「恶意对象引用」。这些引用使攻击者能够访问 Period 对象中的私有日期字段引用的对象。通过修改这些日期实例，攻击者可以修改 Period 实例。下面的类演示了这种攻击：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>public class MutablePeriod {</span></span>
<span class="line"><span>    // A period instance</span></span>
<span class="line"><span>    public final Period period;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // period&#39;s start field, to which we shouldn&#39;t have access</span></span>
<span class="line"><span>    public final Date start;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // period&#39;s end field, to which we shouldn&#39;t have access</span></span>
<span class="line"><span>    public final Date end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public MutablePeriod() {</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            ByteArrayOutputStream bos = new ByteArrayOutputStream();</span></span>
<span class="line"><span>            ObjectOutputStream out = new ObjectOutputStream(bos);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // Serialize a valid Period instance</span></span>
<span class="line"><span>            out.writeObject(new Period(new Date(), new Date()));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            /*</span></span>
<span class="line"><span>            * Append rogue &quot;previous object refs&quot; for internal</span></span>
<span class="line"><span>            * Date fields in Period. For details, see &quot;Java</span></span>
<span class="line"><span>            * Object Serialization Specification,&quot; Section 6.4.</span></span>
<span class="line"><span>            */</span></span>
<span class="line"><span>            byte[] ref = { 0x71, 0, 0x7e, 0, 5 }; // Ref #5</span></span>
<span class="line"><span>            bos.write(ref); // The start field</span></span>
<span class="line"><span>            ref[4] = 4; // Ref # 4</span></span>
<span class="line"><span>            bos.write(ref); // The end field</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // Deserialize Period and &quot;stolen&quot; Date references</span></span>
<span class="line"><span>            ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bos.toByteArray()));</span></span>
<span class="line"><span>            period = (Period) in.readObject();</span></span>
<span class="line"><span>            start = (Date) in.readObject();</span></span>
<span class="line"><span>            end = (Date) in.readObject();</span></span>
<span class="line"><span>        } catch (IOException | ClassNotFoundException e) {</span></span>
<span class="line"><span>            throw new AssertionError(e);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>To see the attack in action, run the following program:</p><p>要查看攻击的实际效果，请运行以下程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>public static void main(String[] args) {</span></span>
<span class="line"><span>    MutablePeriod mp = new MutablePeriod();</span></span>
<span class="line"><span>    Period p = mp.period;</span></span>
<span class="line"><span>    Date pEnd = mp.end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Let&#39;s turn back the clock</span></span>
<span class="line"><span>    pEnd.setYear(78);</span></span>
<span class="line"><span>    System.out.println(p);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Bring back the 60s!</span></span>
<span class="line"><span>    pEnd.setYear(69);</span></span>
<span class="line"><span>    System.out.println(p);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>In my locale, running this program produces the following output:</p><p>在我的语言环境中，运行这个程序会产生以下输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>Wed Nov 22 00:21:29 PST 2017 - Wed Nov 22 00:21:29 PST 1978</span></span>
<span class="line"><span>Wed Nov 22 00:21:29 PST 2017 - Sat Nov 22 00:21:29 PST 1969</span></span></code></pre></div><p>While the Period instance is created with its invariants intact, it is possible to modify its internal components at will. Once in possession of a mutable Period instance, an attacker might cause great harm by passing the instance to a class that depends on Period’s immutability for its security. This is not so farfetched: there are classes that depend on String’s immutability for their security.</p><p>虽然创建 Period 实例时保留了它的不变性，但是可以随意修改它的内部组件。一旦拥有一个可变的 Period 实例，攻击者可能会将实例传递给一个依赖于 Period 的不变性来保证其安全性的类，从而造成极大的危害。这并不是牵强附会的：有些类依赖于 String 的不变性来保证其安全。</p><p>The source of the problem is that Period’s readObject method is not doing enough defensive copying. <strong>When an object is deserialized, it is critical to defensively copy any field containing an object reference that a client must not possess.</strong> Therefore, every serializable immutable class containing private mutable components must defensively copy these components in its readObject method. The following readObject method suffices to ensure Period’s invariants and to maintain its immutability:</p><p>问题的根源在于 Period 的 readObject 方法没有进行足够的防御性复制。<strong>当对象被反序列化时，对任何客户端不能拥有的对象引用的字段进行防御性地复制至关重要。</strong> 因此，对于每个可序列化的不可变类，如果它包含了私有的可变组件，那么在它的 readObjec 方法中，必须要对这些组件进行防御性地复制。下面的 readObject 方法足以保证周期的不变性，并保持其不变性：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// readObject method with defensive copying and validity checking</span></span>
<span class="line"><span>private void readObject(ObjectInputStream s) throws IOException, ClassNotFoundException {</span></span>
<span class="line"><span>    s.defaultReadObject();</span></span>
<span class="line"><span>    // Defensively copy our mutable components</span></span>
<span class="line"><span>    start = new Date(start.getTime());</span></span>
<span class="line"><span>    end = new Date(end.getTime());</span></span>
<span class="line"><span>    // Check that our invariants are satisfied</span></span>
<span class="line"><span>    if (start.compareTo(end) &gt; 0)</span></span>
<span class="line"><span>        throw new InvalidObjectException(start +&quot; after &quot;+ end);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Note that the defensive copy is performed prior to the validity check and that we did not use Date’s clone method to perform the defensive copy. Both of these details are required to protect Period against attack (Item 50). Note also that defensive copying is not possible for final fields. To use the readObject method, we must make the start and end fields nonfinal. This is unfortunate, but it is the lesser of two evils. With the new readObject method in place and the final modifier removed from the start and end fields, the MutablePeriod class is rendered ineffective. The above attack program now generates this output:</p><p>注意，防御副本是在有效性检查之前执行的，我们没有使用 Date 的 clone 方法来执行防御副本。这两个细节对于保护 Period 免受攻击是必要的(第50项)。还要注意，防御性复制不可能用于 final 字段。要使用 readObject 方法，必须使 start 和 end 字段非 final。这是不幸的，但却是权衡利弊后的方案。使用新的 readObject 方法，并从 start 和 end 字段中删除 final 修饰符，MutablePeriod 类将无效。上面的攻击程序现在生成这个输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>Wed Nov 22 00:23:41 PST 2017 - Wed Nov 22 00:23:41 PST 2017</span></span>
<span class="line"><span>Wed Nov 22 00:23:41 PST 2017 - Wed Nov 22 00:23:41 PST 2017</span></span></code></pre></div><p>Here is a simple litmus test for deciding whether the default readObject method is acceptable for a class: would you feel comfortable adding a public constructor that took as parameters the values for each nontransient field in the object and stored the values in the fields with no validation whatsoever? If not, you must provide a readObject method, and it must perform all the validity checking and defensive copying that would be required of a constructor. Alternatively, you can use the serialization proxy pattern (Item 90). This pattern is highly recommended because it takes much of the effort out of safe deserialization.</p><p>下面是一个简单的测试，用于判断默认 readObject 方法是否可用于类：你是否愿意添加一个公共构造函数，该构造函数将对象中每个非 transient 字段的值作为参数，并在没有任何验证的情况下将值存储在字段中？如果没有，则必须提供 readObject 方法，并且它必须执行构造函数所需的所有有效性检查和防御性复制。或者，你可以使用序列化代理模式（<a href="/Chapter-12/Chapter-12-Item-90-Consider-serialization-proxies-instead-of-serialized-instances">Item-90</a>）。强烈推荐使用这种模式，否则会在安全反序列化方面花费大量精力。</p><p>There is one other similarity between readObject methods and constructors that applies to nonfinal serializable classes. Like a constructor, a readObject method must not invoke an overridable method, either directly or indirectly (Item 19). If this rule is violated and the method in question is overridden, the overriding method will run before the subclass’s state has been deserialized. A program failure is likely to result [Bloch05, Puzzle 91].</p><p>readObject 方法和构造函数之间还有一个相似之处，适用于非 final 序列化类。与构造函数一样，readObject 方法不能直接或间接调用可覆盖的方法（<a href="/Chapter-4/Chapter-4-Item-19-Design-and-document-for-inheritance-or-else-prohibit-it">Item-19</a>）。如果违反了这条规则，并且涉及的方法被覆盖，则覆盖方法将在子类的状态反序列化之前运行。很可能导致程序失败 [Bloch05, Puzzle 91]。</p><p>To summarize, anytime you write a readObject method, adopt the mindset that you are writing a public constructor that must produce a valid instance regardless of what byte stream it is given. Do not assume that the byte stream represents an actual serialized instance. While the examples in this item concern a class that uses the default serialized form, all of the issues that were raised apply equally to classes with custom serialized forms. Here, in summary form, are the guidelines for writing a readObject method:</p><p>总而言之，无论何时编写 readObject 方法，都要采用这样的思维方式，即编写一个公共构造函数，该构造函数必须生成一个有效的实例，而不管给定的是什么字节流。不要假设字节流表示实际的序列化实例。虽然本条目中的示例涉及使用默认序列化形式的类，但是所引发的所有问题都同样适用于具有自定义序列化形式的类。下面是编写 readObject 方法的指导原则：</p><ul><li>For classes with object reference fields that must remain private, defensively copy each object in such a field. Mutable components of immutable classes fall into this category.</li></ul><p>对象引用字段必须保持私有的的类，应防御性地复制该字段中的每个对象。不可变类的可变组件属于这一类。</p><ul><li>Check any invariants and throw an InvalidObjectException if a check fails. The checks should follow any defensive copying.</li></ul><p>检查任何不变量，如果检查失败，则抛出 InvalidObjectException。检查动作应该跟在任何防御性复制之后。</p><ul><li>If an entire object graph must be validated after it is deserialized, use the ObjectInputValidation interface (not discussed in this book).</li></ul><p>如果必须在反序列化后验证整个对象图，那么使用 ObjectInputValidation 接口（在本书中没有讨论）。</p><ul><li>Do not invoke any overridable methods in the class, directly or indirectly.</li></ul><p>不要直接或间接地调用类中任何可被覆盖的方法。</p><hr><p><strong><a href="/Chapter-12/Chapter-12-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-12/Chapter-12-Item-87-Consider-using-a-custom-serialized-form">Item 87: Consider using a custom serialized form（考虑使用自定义序列化形式）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-12/Chapter-12-Item-89-For-instance-control-prefer-enum-types-to-readResolve">Item 89: For instance control prefer enum types to readResolve（对于实例控制，枚举类型优于 readResolve）</a></strong></li></ul>`,52),p=[i];function l(r,o,c,d,h,u){return s(),a("div",null,p)}const f=e(t,[["render",l]]);export{b as __pageData,f as default};

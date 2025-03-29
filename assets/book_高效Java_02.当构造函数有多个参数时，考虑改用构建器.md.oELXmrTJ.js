import{_ as s,c as a,o as n,aj as e}from"./chunks/framework._AF764y6.js";const b=JSON.parse('{"title":"当构造函数有多个参数时，考虑改用构建器","description":"","frontmatter":{"title":"当构造函数有多个参数时，考虑改用构建器","date":"2023-10-25T00:49:10.000Z","categories":["高效Java"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/02.当构造函数有多个参数时，考虑改用构建器.md","filePath":"book/高效Java/02.当构造函数有多个参数时，考虑改用构建器.md","lastUpdated":1743259133000}'),p={name:"book/高效Java/02.当构造函数有多个参数时，考虑改用构建器.md"},t=e(`<h3 id="item-2-consider-a-builder-when-faced-with-many-constructor-parameters-当构造函数有多个参数时-考虑改用构建器" tabindex="-1">Item 2: Consider a builder when faced with many constructor parameters（当构造函数有多个参数时，考虑改用构建器） <a class="header-anchor" href="#item-2-consider-a-builder-when-faced-with-many-constructor-parameters-当构造函数有多个参数时-考虑改用构建器" aria-label="Permalink to “Item 2: Consider a builder when faced with many constructor parameters（当构造函数有多个参数时，考虑改用构建器）”">​</a></h3><p>Static factories and constructors share a limitation: they do not scale well to large numbers of optional parameters. Consider the case of a class representing the Nutrition Facts label that appears on packaged foods. These labels have a few required fields—serving size, servings per container, and calories per serving— and more than twenty optional fields—total fat, saturated fat, trans fat,cholesterol, sodium, and so on. Most products have nonzero values for only a few of these optional fields.</p><p>静态工厂和构造函数都有一个局限：它们不能对大量可选参数做很好的扩展。以一个类为例，它表示包装食品上的营养标签。这些标签上有一些字段是必需的，如：净含量、毛重和每单位份量的卡路里，另有超过 20 个可选的字段，如：总脂肪、饱和脂肪、反式脂肪、胆固醇、钠等等。大多数产品只有这些可选字段中的少数，且具有非零值。</p><p>What sort of constructors or static factories should you write for such a class?Traditionally, programmers have used the telescoping constructor pattern, in which you provide a constructor with only the required parameters, another with a single optional parameter, a third with two optional parameters, and so on,culminating in a constructor with all the optional parameters. Here’s how it looks in practice. For brevity’s sake, only four optional fields are shown:</p><p>应该为这样的类编写什么种类的构造函数或静态工厂呢？传统的方式是使用可伸缩构造函数，在这种模式中，只向构造函数提供必需的参数。即，向第一个构造函数提供单个可选参数，向第二个构造函数提供两个可选参数，以此类推，最后一个构造函数是具有所有可选参数的。这是它在实际应用中的样子。为了简洁起见，只展示具备四个可选字段的情况：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Telescoping constructor pattern - does not scale well!</span></span>
<span class="line"><span>public class NutritionFacts {</span></span>
<span class="line"><span>    private final int servingSize; // (mL) required</span></span>
<span class="line"><span>    private final int servings; // (per container) required</span></span>
<span class="line"><span>    private final int calories; // (per serving) optional</span></span>
<span class="line"><span>    private final int fat; // (g/serving) optional</span></span>
<span class="line"><span>    private final int sodium; // (mg/serving) optional</span></span>
<span class="line"><span>    private final int carbohydrate; // (g/serving) optional</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public NutritionFacts(int servingSize, int servings) {</span></span>
<span class="line"><span>        this(servingSize, servings, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public NutritionFacts(int servingSize, int servings, int calories) {</span></span>
<span class="line"><span>        this(servingSize, servings, calories, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public NutritionFacts(int servingSize, int servings, int calories, int fat) {</span></span>
<span class="line"><span>        this(servingSize, servings, calories, fat, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium) {</span></span>
<span class="line"><span>        this(servingSize, servings, calories, fat, sodium, 0);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {</span></span>
<span class="line"><span>        this.servingSize = servingSize;</span></span>
<span class="line"><span>        this.servings = servings;</span></span>
<span class="line"><span>        this.calories = calories;</span></span>
<span class="line"><span>        this.fat = fat;</span></span>
<span class="line"><span>        this.sodium = sodium;</span></span>
<span class="line"><span>        this.carbohydrate = carbohydrate;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>When you want to create an instance, you use the constructor with the shortest parameter list containing all the parameters you want to set:</p><p>当你想要创建一个实例时，可以使用包含所需的参数的最短参数列表的构造函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>NutritionFacts cocaCola =new NutritionFacts(240, 8, 100, 0, 35, 27);</span></span></code></pre></div><p>Typically this constructor invocation will require many parameters that you don’t want to set, but you’re forced to pass a value for them anyway. In this case,we passed a value of 0 for fat. With “only” six parameters this may not seem so bad, but it quickly gets out of hand as the number of parameters increases.</p><p>通常，这个构造函数包含许多额外的参数，但是你必须为它们传递一个值。在本例中，我们为 fat 传递了一个值 0。只有六个参数时，这可能看起来不那么糟，但随着参数的增加，它很快就会失控。</p><p>In short, <strong>the telescoping constructor pattern works, but it is hard to write client code when there are many parameters, and harder still to read it.</strong> The reader is left wondering what all those values mean and must carefully count parameters to find out. Long sequences of identically typed parameters can cause subtle bugs. If the client accidentally reverses two such parameters, the compiler won’t complain, but the program will misbehave at runtime (Item 51).</p><p>简单地说，<strong>可伸缩构造函数模式可以工作，但是当有很多参数时，编写客户端代码是很困难的，而且读起来更困难。</strong> 读者想知道所有这些值是什么意思，必须仔细清点参数。相同类型参数的长序列会导致细微的错误。如果客户端不小心倒转了两个这样的参数，编译器不会报错，但是程序会在运行时出错（<a href="/Chapter-8/Chapter-8-Item-51-Design-method-signatures-carefully">Item-51</a>）。</p><p>A second alternative when you’re faced with many optional parameters in a constructor is the JavaBeans pattern, in which you call a parameterless constructor to create the object and then call setter methods to set each required parameter and each optional parameter of interest:</p><p>当你在构造函数中遇到许多可选参数时，另一种选择是 JavaBean 模式，在这种模式中，你调用一个无参数的构造函数来创建对象，然后调用 setter 方法来设置每个所需的参数和每个感兴趣的可选参数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// JavaBeans Pattern - allows inconsistency, mandates mutability</span></span>
<span class="line"><span>public class NutritionFacts {</span></span>
<span class="line"><span>    // Parameters initialized to default values (if any)</span></span>
<span class="line"><span>    private int servingSize = -1; // Required; no default value</span></span>
<span class="line"><span>    private int servings = -1; // Required; no default value</span></span>
<span class="line"><span>    private int calories = 0;</span></span>
<span class="line"><span>    private int fat = 0;</span></span>
<span class="line"><span>    private int sodium = 0;</span></span>
<span class="line"><span>    private int carbohydrate = 0;</span></span>
<span class="line"><span>    public NutritionFacts() { }</span></span>
<span class="line"><span>    // Setters</span></span>
<span class="line"><span>    public void setServingSize(int val) { servingSize = val; }</span></span>
<span class="line"><span>    public void setServings(int val) { servings = val; }</span></span>
<span class="line"><span>    public void setCalories(int val) { calories = val; }</span></span>
<span class="line"><span>    public void setFat(int val) { fat = val; }</span></span>
<span class="line"><span>    public void setSodium(int val) { sodium = val; }</span></span>
<span class="line"><span>    public void setCarbohydrate(int val) { carbohydrate = val; }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This pattern has none of the disadvantages of the telescoping constructor pattern.It is easy, if a bit wordy, to create instances, and easy to read the resulting code:</p><p>这个模式没有可伸缩构造函数模式的缺点。创建实例很容易，虽然有点冗长，但很容易阅读生成的代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>NutritionFacts cocaCola = new NutritionFacts();</span></span>
<span class="line"><span>cocaCola.setServingSize(240);</span></span>
<span class="line"><span>cocaCola.setServings(8);</span></span>
<span class="line"><span>cocaCola.setCalories(100);</span></span>
<span class="line"><span>cocaCola.setSodium(35);</span></span>
<span class="line"><span>cocaCola.setCarbohydrate(27);</span></span></code></pre></div><p>Unfortunately, the JavaBeans pattern has serious disadvantages of its own. Because construction is split across multiple calls, a JavaBean may be in an inconsistent state partway through its construction. The class does not have the option of enforcing consistency merely by checking the validity of the constructor parameters. Attempting to use an object when it’s in an inconsistent state may cause failures that are far removed from the code containing the bug and hence difficult to debug. A related disadvantage is that the JavaBeans pattern precludes the possibility of making a class immutable (Item 17) and requires added effort on the part of the programmer to ensure thread safety.</p><p>不幸的是，JavaBean 模式本身有严重的缺点。因为构建是在多个调用之间进行的，所以 JavaBean 可能在构建的过程中处于不一致的状态。该类不能仅通过检查构造函数参数的有效性来强制一致性。在不一致的状态下尝试使用对象可能会导致错误的发生，而包含这些错误的代码很难调试。一个相关的缺点是，JavaBean 模式排除了使类不可变的可能性（<a href="/Chapter-4/Chapter-4-Item-17-Minimize-mutability">Item-17</a>），并且需要程序员额外的努力来确保线程安全。</p><p>It is possible to reduce these disadvantages by manually “freezing” the object when its construction is complete and not allowing it to be used until frozen, but this variant is unwieldy and rarely used in practice. Moreover, it can cause errors at runtime because the compiler cannot ensure that the programmer calls the freeze method on an object before using it.</p><p>通过在对象构建完成时手动「冻结」对象，并在冻结之前不允许使用对象，可以减少这些缺陷，但是这种变通方式很笨拙，在实践中很少使用。此外，它可能在运行时导致错误，因为编译器不能确保程序员在使用对象之前调用它的 freeze 方法。</p><p>Luckily, there is a third alternative that combines the safety of the telescoping constructor pattern with the readability of the JavaBeans pattern. It is a form of the Builder pattern [Gamma95]. Instead of making the desired object directly,the client calls a constructor (or static factory) with all of the required parameters and gets a builder object. Then the client calls setter-like methods on the builder object to set each optional parameter of interest. Finally, the client calls a parameterless build method to generate the object, which is typically immutable. The builder is typically a static member class (Item 24) of the class itbuilds. Here’s how it looks in practice:</p><p>幸运的是，还有第三种选择，它结合了可伸缩构造函数模式的安全性和 JavaBean 模式的可读性。它是建造者模式的一种形式 [Gamma95]。客户端不直接生成所需的对象，而是使用所有必需的参数调用构造函数（或静态工厂），并获得一个 builder 对象。然后，客户端在构建器对象上调用像 setter 这样的方法来设置每个感兴趣的可选参数。最后，客户端调用一个无参数的构建方法来生成对象，这通常是不可变的。构建器通常是它构建的类的静态成员类（<a href="/Chapter-4/Chapter-4-Item-24-Favor-static-member-classes-over-nonstatic">Item-24</a>）。下面是它在实际应用中的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Builder Pattern</span></span>
<span class="line"><span>public class NutritionFacts {</span></span>
<span class="line"><span>    private final int servingSize;</span></span>
<span class="line"><span>    private final int servings;</span></span>
<span class="line"><span>    private final int calories;</span></span>
<span class="line"><span>    private final int fat;</span></span>
<span class="line"><span>    private final int sodium;</span></span>
<span class="line"><span>    private final int carbohydrate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static class Builder {</span></span>
<span class="line"><span>        // Required parameters</span></span>
<span class="line"><span>        private final int servingSize;</span></span>
<span class="line"><span>        private final int servings;</span></span>
<span class="line"><span>        // Optional parameters - initialized to default values</span></span>
<span class="line"><span>        private int calories = 0;</span></span>
<span class="line"><span>        private int fat = 0;</span></span>
<span class="line"><span>        private int sodium = 0;</span></span>
<span class="line"><span>        private int carbohydrate = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder(int servingSize, int servings) {</span></span>
<span class="line"><span>            this.servingSize = servingSize;</span></span>
<span class="line"><span>            this.servings = servings;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder calories(int val) {</span></span>
<span class="line"><span>            calories = val;</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder fat(int val) {</span></span>
<span class="line"><span>            fat = val;</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder sodium(int val) {</span></span>
<span class="line"><span>            sodium = val;</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder carbohydrate(int val) {</span></span>
<span class="line"><span>            carbohydrate = val;</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public NutritionFacts build() {</span></span>
<span class="line"><span>            return new NutritionFacts(this);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private NutritionFacts(Builder builder) {</span></span>
<span class="line"><span>        servingSize = builder.servingSize;</span></span>
<span class="line"><span>        servings = builder.servings;</span></span>
<span class="line"><span>        calories = builder.calories;</span></span>
<span class="line"><span>        fat = builder.fat;</span></span>
<span class="line"><span>        sodium = builder.sodium;</span></span>
<span class="line"><span>        carbohydrate = builder.carbohydrate;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The NutritionFacts class is immutable, and all parameter default values are in one place. The builder’s setter methods return the builder itself so that invocations can be chained, resulting in a fluent API. Here’s how the client code looks:</p><p>NutritionFacts 类是不可变的，所有参数默认值都在一个位置。构建器的 setter 方法返回构建器本身，这样就可以链式调用，从而得到一个流畅的 API。下面是客户端代码的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8)</span></span>
<span class="line"><span>.calories(100).sodium(35).carbohydrate(27).build();</span></span></code></pre></div><p>This client code is easy to write and, more importantly, easy to read. The Builder pattern simulates named optional parameters as found in Python and Scala.</p><p>该客户端代码易于编写，更重要的是易于阅读。建造者模式模拟 Python 和 Scala 中的可选参数。</p><p>Validity checks were omitted for brevity. To detect invalid parameters as soon as possible, check parameter validity in the builder’s constructor and methods.Check invariants involving multiple parameters in the constructor invoked by the build method. To ensure these invariants against attack, do the checks on object fields after copying parameters from the builder (Item 50). If a check fails, throw an IllegalArgumentException (Item 72) whose detail message indicates which parameters are invalid (Item 75).</p><p><strong>译注：若实体类数量较多时，内嵌静态类的方式还是比较冗长。或可将「构建器」独立出来，广泛适应多个实体类。以下案例仅供参考：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>class EntityCreator&lt;T&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Field[] fieldArray;</span></span>
<span class="line"><span>    private Class&lt;T&gt; className;</span></span>
<span class="line"><span>    private T entityObj;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public EntityCreator(Class&lt;T&gt; className) throws Exception {</span></span>
<span class="line"><span>        this.fieldArray = className.getDeclaredFields();</span></span>
<span class="line"><span>        this.className = className;</span></span>
<span class="line"><span>        Constructor&lt;T&gt; constructor = className.getDeclaredConstructor();</span></span>
<span class="line"><span>        constructor.setAccessible(true);</span></span>
<span class="line"><span>        this.entityObj = constructor.newInstance();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public EntityCreator&lt;T&gt; setValue(String paramName, Object paramValue) throws Exception {</span></span>
<span class="line"><span>        for (Field field : fieldArray) {</span></span>
<span class="line"><span>            if (field.getName().equals(paramName)) {</span></span>
<span class="line"><span>                PropertyDescriptor descriptor = new PropertyDescriptor(field.getName(), className);</span></span>
<span class="line"><span>                Method method = descriptor.getWriteMethod();</span></span>
<span class="line"><span>                method.invoke(entityObj, paramValue);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return this;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public T build() {</span></span>
<span class="line"><span>        return entityObj;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>如此，可移除整个 Builder 类，NutritionFacts 类保留无参无方法体的私有构造；类成员必须实现 setter 和 getter：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>import lombok.Getter;</span></span>
<span class="line"><span>import lombok.Setter;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Setter</span></span>
<span class="line"><span>@Getter</span></span>
<span class="line"><span>public class NutritionFacts {</span></span>
<span class="line"><span>    private final int servingSize;</span></span>
<span class="line"><span>    private final int servings;</span></span>
<span class="line"><span>    private final int calories;</span></span>
<span class="line"><span>    private final int fat;</span></span>
<span class="line"><span>    private final int sodium;</span></span>
<span class="line"><span>    private final int carbohydrate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private NutritionFacts() {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>使用案例改为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>NutritionFacts cocaCola = new EntityCreator&lt;&gt;(NutritionFacts.class)</span></span>
<span class="line"><span>    .setValue(&quot;servingSize&quot;,240)</span></span>
<span class="line"><span>    .setValue(&quot;servings&quot;,8)</span></span>
<span class="line"><span>    .setValue(&quot;calories&quot;,100)</span></span>
<span class="line"><span>    .setValue(&quot;sodium&quot;,35)</span></span>
<span class="line"><span>    .setValue(&quot;carbohydrate&quot;,27).build();</span></span></code></pre></div><p>为了简洁，省略了有效性检查。为了尽快检测无效的参数，请检查构建器的构造函数和方法中的参数有效性。检查构建方法调用的构造函数中涉及多个参数的不变量。为了确保这些不变量不受攻击，在从构建器复制参数之后检查对象字段（<a href="/Chapter-8/Chapter-8-Item-50-Make-defensive-copies-when-needed">Item-50</a>）。如果检查失败，抛出一个 IllegalArgumentException（<a href="/Chapter-10/Chapter-10-Item-72-Favor-the-use-of-standard-exceptions">Item-72</a>），它的详细消息指示哪些参数无效（<a href="/Chapter-10/Chapter-10-Item-75-Include-failure-capture-information-in-detail-messages">Item-75</a>）。</p><p>The Builder pattern is well suited to class hierarchies. Use a parallel hierarchy of builders, each nested in the corresponding class. Abstract classes have abstract builders; concrete classes have concrete builders. For example,consider an abstract class at the root of a hierarchy representing various kinds of pizza:</p><p>建造者模式非常适合于类层次结构。使用构建器的并行层次结构，每个构建器都嵌套在相应的类中。抽象类有抽象类构建器；具体类有具体类构建器。例如，考虑一个在层次结构处于最低端的抽象类，它代表各种比萨饼：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>import java.util.EnumSet;</span></span>
<span class="line"><span>import java.util.Objects;</span></span>
<span class="line"><span>import java.util.Set;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Builder pattern for class hierarchies</span></span>
<span class="line"><span>public abstract class Pizza {</span></span>
<span class="line"><span>    public enum Topping {HAM, MUSHROOM, ONION, PEPPER, SAUSAGE}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    final Set&lt;Topping&gt; toppings;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    abstract static class Builder&lt;T extends Builder&lt;T&gt;&gt; {</span></span>
<span class="line"><span>        EnumSet&lt;Topping&gt; toppings = EnumSet.noneOf(Topping.class);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public T addTopping(Topping topping) {</span></span>
<span class="line"><span>            toppings.add(Objects.requireNonNull(topping));</span></span>
<span class="line"><span>            return self();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        abstract Pizza build();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // Subclasses must override this method to return &quot;this&quot;</span></span>
<span class="line"><span>        protected abstract T self();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Pizza(Builder&lt;?&gt; builder) {</span></span>
<span class="line"><span>        toppings = builder.toppings.clone(); // See Item 50</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Note that Pizza.Builder is a generic type with a recursive type parameter (Item 30). This, along with the abstract self method, allows method chaining to work properly in subclasses, without the need for casts. This workaround for the fact that Java lacks a self type is known as the simulated self-type idiom. Here are two concrete subclasses of Pizza, one of which represents a standard New-York-style pizza, the other a calzone. The former has a required size parameter,while the latter lets you specify whether sauce should be inside or out:</p><p>请注意，<code>Pizza.Builder</code> 是具有递归类型参数的泛型类型（<a href="/Chapter-5/Chapter-5-Item-31-Use-bounded-wildcards-to-increase-API-flexibility">Item-31</a>）。这与抽象 self 方法一起，允许方法链接在子类中正常工作，而不需要强制转换。对于 Java 缺少自类型这一事实，这种变通方法称为模拟自类型习惯用法。这里有两个具体的比萨子类，一个是标准的纽约风格的比萨，另一个是 calzone。前者有一个所需的大小参数，而后者让你指定酱料应该是内部还是外部：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>import java.util.Objects;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class NyPizza extends Pizza {</span></span>
<span class="line"><span>    public enum Size {SMALL, MEDIUM, LARGE}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private final Size size;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static class Builder extends Pizza.Builder&lt;Builder&gt; {</span></span>
<span class="line"><span>        private final Size size;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder(Size size) {</span></span>
<span class="line"><span>            this.size = Objects.requireNonNull(size);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public NyPizza build() {</span></span>
<span class="line"><span>            return new NyPizza(this);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        protected Builder self() {</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private NyPizza(Builder builder) {</span></span>
<span class="line"><span>        super(builder);</span></span>
<span class="line"><span>        size = builder.size;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class Calzone extends Pizza {</span></span>
<span class="line"><span>    private final boolean sauceInside;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static class Builder extends Pizza.Builder&lt;Builder&gt; {</span></span>
<span class="line"><span>        private boolean sauceInside = false; // Default</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        public Builder sauceInside() {</span></span>
<span class="line"><span>            sauceInside = true;</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        public Calzone build() {</span></span>
<span class="line"><span>            return new Calzone(this);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        @Override</span></span>
<span class="line"><span>        protected Builder self() {</span></span>
<span class="line"><span>            return this;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private Calzone(Builder builder) {</span></span>
<span class="line"><span>        super(builder);</span></span>
<span class="line"><span>        sauceInside = builder.sauceInside;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Note that the build method in each subclass’s builder is declared to return the correct subclass: the build method of NyPizza.Builder returns NyPizza, while the one in Calzone.Builder returns Calzone. This technique, wherein a subclass method is declared to return a subtype of the return type declared in the super-class, is known as covariant return typing. It allows clients to use these builders without the need for casting.The client code for these “hierarchical builders” is essentially identical to the code for the simple NutritionFacts builder. The example client code shown next assumes static imports on enum constants for brevity:</p><p>注意，每个子类的构建器中的构建方法声明为返回正确的子类：构建的方法 <code>NyPizza.Builder</code> 返回 NyPizza，而在 <code>Calzone.Builder</code> 则返回 Calzone。这种技术称为协变返回类型，其中一个子类方法声明为返回超类中声明的返回类型的子类型。它允许客户使用这些构建器，而不需要强制转换。这些「层次构建器」的客户端代码与简单的 NutritionFacts 构建器的代码基本相同。为简洁起见，下面显示的示例客户端代码假定枚举常量上的静态导入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>NyPizza pizza = new NyPizza.Builder(SMALL)</span></span>
<span class="line"><span>.addTopping(SAUSAGE).addTopping(ONION).build();</span></span>
<span class="line"><span>Calzone calzone = new Calzone.Builder()</span></span>
<span class="line"><span>.addTopping(HAM).sauceInside().build();</span></span></code></pre></div><p>A minor advantage of builders over constructors is that builders can have multiple varargs parameters because each parameter is specified in its own method. Alternatively, builders can aggregate the parameters passed into multiple calls to a method into a single field, as demonstrated in the addTopping method earlier.</p><p>与构造函数相比，构造函数的一个小优点是构造函数可以有多个变量参数，因为每个参数都是在自己的方法中指定的。或者，构建器可以将传递给一个方法的多个调用的参数聚合到单个字段中，如前面的 addTopping 方法中所示。</p><p>The Builder pattern is quite flexible. A single builder can be used repeatedly to build multiple objects. The parameters of the builder can be tweaked between invocations of the build method to vary the objects that are created. A builder can fill in some fields automatically upon object creation, such as a serial number that increases each time an object is created.</p><p>建造者模式非常灵活。一个构建器可以多次用于构建多个对象。构建器的参数可以在构建方法的调用之间进行调整，以改变创建的对象。构建器可以在创建对象时自动填充某些字段，例如在每次创建对象时增加的序列号。</p><p>The Builder pattern has disadvantages as well. In order to create an object,you must first create its builder. While the cost of creating this builder is unlikely to be noticeable in practice, it could be a problem in performance-critical situations. Also, the Builder pattern is more verbose than the telescoping constructor pattern, so it should be used only if there are enough parameters to make it worthwhile, say four or more. But keep in mind that you may want to add more parameters in the future. But if you start out with constructors or static factories and switch to a builder when the class evolves to the point where the number of parameters gets out of hand, the obsolete constructors or static factories will stick out like a sore thumb. Therefore, it’s often better to start with a builder in the first place.</p><p>建造者模式也有缺点。为了创建一个对象，你必须首先创建它的构建器。虽然在实际应用中创建这个构建器的成本可能并不显著，但在以性能为关键的场景下，这可能会是一个问题。而且，建造者模式比可伸缩构造函数模式更冗长，因此只有在有足够多的参数时才值得使用，比如有 4 个或更多参数时，才应该使用它。但是请记住，你可能希望在将来添加更多的参数。但是，如果你以构造函数或静态工厂开始，直至类扩展到参数数量无法控制的程度时，也会切换到构建器，但是过时的构造函数或静态工厂将很难处理。因此，最好一开始就从构建器开始。</p><p>In summary, the Builder pattern is a good choice when designing classes whose constructors or static factories would have more than a handful of parameters, especially if many of the parameters are optional or of identical type. Client code is much easier to read and write with builders than with telescoping constructors, and builders are much safer than JavaBeans.</p><p>总之，在设计构造函数或静态工厂的类时，建造者模式是一个很好的选择，特别是当许多参数是可选的或具有相同类型时。与可伸缩构造函数相比，使用构建器客户端代码更容易读写，而且构建器比 JavaBean 更安全。</p><hr><p><strong><a href="/Chapter-2/Chapter-2-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-2/Chapter-2-Item-1-Consider-static-factory-methods-instead-of-constructors">Item 1: Consider static factory methods instead of constructors（考虑以静态工厂方法代替构造函数）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-2/Chapter-2-Item-3-Enforce-the-singleton-property-with-a-private-constructor-or-an-enum-type">Item 3: Enforce the singleton property with a private constructor or an enum type（使用私有构造函数或枚举类型实施单例属性）</a></strong></li></ul>`,59),i=[t];function l(r,c,o,d,u,h){return n(),a("div",null,i)}const v=s(p,[["render",l]]);export{b as __pageData,v as default};

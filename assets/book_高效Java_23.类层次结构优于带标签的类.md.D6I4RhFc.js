import{_ as a,c as s,o as e,aj as n}from"./chunks/framework._AF764y6.js";const f=JSON.parse('{"title":"类层次结构优于带标签的类","description":"","frontmatter":{"title":"类层次结构优于带标签的类","date":"2023-10-25T01:05:38.000Z","permalink":"/Chapter-4/Chapter-4-Item-23-Prefer-class-hierarchies-to-tagged-classes.html","categories":["技术书籍","高效Java","类和接口"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/23.类层次结构优于带标签的类.md","filePath":"book/高效Java/23.类层次结构优于带标签的类.md","lastUpdated":1743259133000}'),t={name:"book/高效Java/23.类层次结构优于带标签的类.md"},i=n(`<h3 id="item-23-prefer-class-hierarchies-to-tagged-classes-类层次结构优于带标签的类" tabindex="-1">Item 23: Prefer class hierarchies to tagged classes（类层次结构优于带标签的类） <a class="header-anchor" href="#item-23-prefer-class-hierarchies-to-tagged-classes-类层次结构优于带标签的类" aria-label="Permalink to “Item 23: Prefer class hierarchies to tagged classes（类层次结构优于带标签的类）”">​</a></h3><p>Occasionally you may run across a class whose instances come in two or more flavors and contain a tag field indicating the flavor of the instance. For example, consider this class, which is capable of representing a circle or a rectangle:</p><p>有时候，你可能会遇到这样一个类，它的实例有两种或两种以上的样式，并且包含一个标签字段来表示实例的样式。例如，考虑这个类，它能够表示一个圆或一个矩形：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Tagged class - vastly inferior to a class hierarchy!</span></span>
<span class="line"><span>class Figure {</span></span>
<span class="line"><span>    enum Shape {RECTANGLE, CIRCLE};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Tag field - the shape of this figure</span></span>
<span class="line"><span>    final Shape shape;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // These fields are used only if shape is RECTANGLE</span></span>
<span class="line"><span>    double length;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    double width;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // This field is used only if shape is CIRCLE</span></span>
<span class="line"><span>    double radius;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Constructor for circle</span></span>
<span class="line"><span>    Figure(double radius) {</span></span>
<span class="line"><span>        shape = Shape.CIRCLE;</span></span>
<span class="line"><span>        this.radius = radius;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // Constructor for rectangle</span></span>
<span class="line"><span>    Figure(double length, double width) {</span></span>
<span class="line"><span>        shape = Shape.RECTANGLE;</span></span>
<span class="line"><span>        this.length = length;</span></span>
<span class="line"><span>        this.width = width;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    double area() {</span></span>
<span class="line"><span>        switch (shape) {</span></span>
<span class="line"><span>            case RECTANGLE:</span></span>
<span class="line"><span>                return length * width;</span></span>
<span class="line"><span>            case CIRCLE:</span></span>
<span class="line"><span>                return Math.PI * (radius * radius);</span></span>
<span class="line"><span>            default:</span></span>
<span class="line"><span>                throw new AssertionError(shape);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Such tagged classes have numerous shortcomings. They are cluttered with boilerplate, including enum declarations, tag fields, and switch statements. Readability is further harmed because multiple implementations are jumbled together in a single class. Memory footprint is increased because instances are burdened with irrelevant fields belonging to other flavors. Fields can’t be made final unless constructors initialize irrelevant fields, resulting in more boilerplate. Constructors must set the tag field and initialize the right data fields with no help from the compiler: if you initialize the wrong fields, the program will fail at runtime. You can’t add a flavor to a tagged class unless you can modify its source file. If you do add a flavor, you must remember to add a case to every switch statement, or the class will fail at runtime. Finally, the data type of an instance gives no clue as to its flavor. In short, <strong>tagged classes are verbose, error-prone, and inefficient.</strong></p><p>这样的标签类有许多缺点。它们充斥着样板代码，包括 enum 声明、标签字段和 switch 语句。因为多个实现在一个类中混杂，会造成可读性受损。内存占用也增加了，因为实例被其他类型的不相关字段所拖累。除非构造函数初始化不相关的字段，否则不能将字段设置为 final，但这会导致更多的样板文件。构造函数必须设置标签字段并在没有编译器帮助的情况下初始化正确的数据字段：如果初始化了错误的字段，程序将在运行时失败。除非你能够修改它的源文件，否则你不能向标签类添加样式。如果你确实添加了一个样式，那么你必须记住要为每个 switch 语句添加一个 case，否则类将在运行时出错。最后，实例的数据类型没有给出它任何关于样式的提示。简而言之，<strong>标签类冗长、容易出错和低效。</strong></p><p>Luckily, object-oriented languages such as Java offer a far better alternative for defining a single data type capable of representing objects of multiple flavors: subtyping. <strong>A tagged class is just a pallid imitation of a class hierarchy.</strong></p><p>幸运的是，面向对象的语言（如 Java）提供了一个更好的选择来定义能够表示多种类型对象的单一数据类型：子类型。<strong>标签类只是类层次结构的简易模仿。</strong></p><p>To transform a tagged class into a class hierarchy, first define an abstract class containing an abstract method for each method in the tagged class whose behavior depends on the tag value. In the Figure class, there is only one such method, which is area. This abstract class is the root of the class hierarchy. If there are any methods whose behavior does not depend on the value of the tag, put them in this class. Similarly, if there are any data fields used by all the flavors, put them in this class. There are no such flavor-independent methods or fields in the Figure class.</p><p>要将已标签的类转换为类层次结构，首先为标签类中的每个方法定义一个包含抽象方法的抽象类，其行为依赖于标签值。在 Figure 类中，只有一个这样的方法，即 area 方法。这个抽象类是类层次结构的根。如果有任何方法的行为不依赖于标签的值，请将它们放在这个类中。类似地，如果有任何数据字段被所有样式使用，将它们放在这个类中。在 Figure 类中没有这样的独立于样式的方法或字段。</p><p>Next, define a concrete subclass of the root class for each flavor of the original tagged class. In our example, there are two: circle and rectangle. Include in each subclass the data fields particular to its flavor. In our example, radius is particular to circle, and length and width are particular to rectangle. Also include in each subclass the appropriate implementation of each abstract method in the root class. Here is the class hierarchy corresponding to the original Figure class:</p><p>接下来，为原始标签类的每个类型定义根类的具体子类。在我们的例子中，有两个：圆形和矩形。在每个子类中包含特定于其样式的数据字段。在我们的例子中，半径是特定于圆的，长度和宽度是特定于矩形的。还应在每个子类中包含根类中每个抽象方法的适当实现。下面是原 Figure 类对应的类层次结构：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Class hierarchy replacement for a tagged class</span></span>
<span class="line"><span>abstract class Figure {</span></span>
<span class="line"><span>    abstract double area();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Circle extends Figure {</span></span>
<span class="line"><span>    final double radius;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Circle(double radius) {</span></span>
<span class="line"><span>        this.radius = radius;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    double area() {</span></span>
<span class="line"><span>        return Math.PI * (radius * radius);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Rectangle extends Figure {</span></span>
<span class="line"><span>    final double length;</span></span>
<span class="line"><span>    final double width;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Rectangle(double length, double width) {</span></span>
<span class="line"><span>        this.length = length;</span></span>
<span class="line"><span>        this.width = width;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    double area() {</span></span>
<span class="line"><span>        return length * width;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This class hierarchy corrects every shortcoming of tagged classes noted previously. The code is simple and clear, containing none of the boilerplate found in the original. The implementation of each flavor is allotted its own class, and none of these classes is encumbered by irrelevant data fields. All fields are final. The compiler ensures that each class’s constructor initializes its data fields and that each class has an implementation for every abstract method declared in the root class. This eliminates the possibility of a runtime failure due to a missing switch case. Multiple programmers can extend the hierarchy independently and interoperably without access to the source for the root class. There is a separate data type associated with each flavor, allowing programmers to indicate the flavor of a variable and to restrict variables and input parameters to a particular flavor.</p><p>这个类层次结构纠正了前面提到的标签类的所有缺点。代码简单明了，不包含原始代码中的样板代码。每种样式的实现都分配有自己的类，这些类没有被不相关的数据字段拖累。所有字段为 final 字段。编译器确保每个类的构造函数初始化它的数据字段，并且每个类对于根类中声明的抽象方法都有一个实现。这消除了由于缺少 switch case 而导致运行时出错的可能性。多个程序员可以独立地、可互操作地扩展层次结构，而无需查看根类的源代码。每种样式都有一个单独的数据类型，允许程序员指出变量的样式，并将变量和输入参数限制为特定的样式。</p><p>Another advantage of class hierarchies is that they can be made to reflect natural hierarchical relationships among types, allowing for increased flexibility and better compile-time type checking. Suppose the tagged class in the original example also allowed for squares. The class hierarchy could be made to reflect the fact that a square is a special kind of rectangle (assuming both are immutable):</p><p>类层次结构的另一个优点是，可以反映类型之间的自然层次关系，从而提高灵活性和更好的编译时类型检查。假设原始示例中的标签类也允许使用正方形。类层次结构可以反映这样一个事实：正方形是一种特殊的矩形（假设两者都是不可变的）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>class Square extends Rectangle {</span></span>
<span class="line"><span>  Square(double side) {</span></span>
<span class="line"><span>    super(side, side);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Note that the fields in the above hierarchy are accessed directly rather than by accessor methods. This was done for brevity and would be a poor design if the hierarchy were public (Item 16).</p><p>注意，上面层次结构中的字段是直接访问的，而不是通过访问器方法访问的。这样做是为了简洁，如果层次结构是公共的，那么这将是一个糟糕的设计（<a href="/Chapter-4/Chapter-4-Item-16-In-public-classes-use-accessor-methods-not-public-fields">Item-16</a>）。</p><p>In summary, tagged classes are seldom appropriate. If you’re tempted to write a class with an explicit tag field, think about whether the tag could be eliminated and the class replaced by a hierarchy. When you encounter an existing class with a tag field, consider refactoring it into a hierarchy.</p><p>总之，标签类很少有合适的使用场景。如果想编写一个带有显式标签字段的类，请考虑是否可以删除标签并用层次结构替换。当遇到具有标签字段的现有类时，请考虑将其重构为层次结构。</p><hr><p><strong><a href="/Chapter-4/Chapter-4-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-4/Chapter-4-Item-22-Use-interfaces-only-to-define-types">Item 22: Use interfaces only to define types（接口只用于定义类型）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-4/Chapter-4-Item-24-Favor-static-member-classes-over-nonstatic">Item 24: Favor static member classes over nonstatic（静态成员类优于非静态成员类）</a></strong></li></ul>`,25),p=[i];function l(r,c,o,h,d,u){return e(),s("div",null,p)}const m=a(t,[["render",l]]);export{f as __pageData,m as default};

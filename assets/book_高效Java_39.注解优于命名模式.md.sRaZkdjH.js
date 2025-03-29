import{_ as n,c as a,o as s,aj as e}from"./chunks/framework._AF764y6.js";const g=JSON.parse('{"title":"注解优于命名模式","description":"","frontmatter":{"title":"注解优于命名模式","date":"2023-10-25T01:05:38.000Z","permalink":"/Chapter-6/Chapter-6-Item-39-Prefer-annotations-to-naming-patterns.html","categories":["技术书籍","高效Java","枚举和注解"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/39.注解优于命名模式.md","filePath":"book/高效Java/39.注解优于命名模式.md","lastUpdated":1743259133000}'),t={name:"book/高效Java/39.注解优于命名模式.md"},p=e(`<h3 id="item-39-prefer-annotations-to-naming-patterns-注解优于命名模式" tabindex="-1">Item 39: Prefer annotations to naming patterns（注解优于命名模式） <a class="header-anchor" href="#item-39-prefer-annotations-to-naming-patterns-注解优于命名模式" aria-label="Permalink to “Item 39: Prefer annotations to naming patterns（注解优于命名模式）”">​</a></h3><p>Historically, it was common to use naming patterns to indicate that some program elements demanded special treatment by a tool or framework. For example, prior to release 4, the JUnit testing framework required its users to designate test methods by beginning their names with the characters test [Beck04]. This technique works, but it has several big disadvantages. First, typographical errors result in silent failures. For example, suppose you accidentally named a test method tsetSafetyOverride instead of testSafetyOverride. JUnit 3 wouldn’t complain, but it wouldn’t execute the test either, leading to a false sense of security.</p><p>从历史上看，使用命名模式来标明某些程序元素需要工具或框架特殊处理的方式是很常见的。例如，在版本 4 之前，JUnit 测试框架要求其用户通过以字符 test [Beck04] 开头的名称来指定测试方法。这种技术是有效的，但是它有几个很大的缺点。首先，排版错误会导致没有提示的失败。例如，假设你意外地将一个测试方法命名为 tsetSafetyOverride，而不是 testSafetyOverride。JUnit 3 不会报错，但它也不会执行测试，这导致一种正确执行了测试的假象。</p><p>A second disadvantage of naming patterns is that there is no way to ensure that they are used only on appropriate program elements. For example, suppose you called a class TestSafetyMechanisms in hopes that JUnit 3 would automatically test all of its methods, regardless of their names. Again, JUnit 3 wouldn’t complain, but it wouldn’t execute the tests either.</p><p>命名模式的第二个缺点是，无法确保只在相应的程序元素上使用它们。例如，假设你调用了一个类 TestSafetyMechanisms，希望 JUnit 3 能够自动测试它的所有方法，而不管它们的名称是什么。同样，JUnit 3 不会报错，但它也不会执行测试。</p><p>A third disadvantage of naming patterns is that they provide no good way to associate parameter values with program elements. For example, suppose you want to support a category of test that succeeds only if it throws a particular exception. The exception type is essentially a parameter of the test. You could encode the exception type name into the test method name using some elaborate naming pattern, but this would be ugly and fragile (Item 62). The compiler would have no way of knowing to check that the string that was supposed to name an exception actually did. If the named class didn’t exist or wasn’t an exception, you wouldn’t find out until you tried to run the test.</p><p>命名模式的第三个缺点是，它们没有提供将参数值与程序元素关联的好方法。例如，假设你希望支持只有在抛出特定异常时才成功的测试类别。异常类型本质上是测试的一个参数。你可以使用一些精心设计的命名模式，将异常类型名称编码到测试方法名称中，但这样的代码将不好看且脆弱（<a href="/Chapter-9/Chapter-9-Item-62-Avoid-strings-where-other-types-are-more-appropriate">Item-62</a>）。编译器将无法检查这些用于命名异常的字符串是否确实执行了。如果指定的类不存在或不是异常，则在运行测试之前不会被发现。</p><p>Annotations [JLS, 9.7] solve all of these problems nicely, and JUnit adopted them starting with release 4. In this item, we’ll write our own toy testing framework to show how annotations work. Suppose you want to define an annotation type to designate simple tests that are run automatically and fail if they throw an exception. Here’s how such an annotation type, named Test, might look:</p><p>注解 [JLS, 9.7] 很好地解决了所有这些问题，JUnit 从版本 4 开始就采用了它们。在本条目中，我们将编写自己的示例测试框架来展示注解是如何工作的。假设你希望定义注解类型，以指定自动运行的简单测试，并在抛出异常时失败。下面是这种名为 Test 的注解类型的概貌：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Marker annotation type declaration</span></span>
<span class="line"><span>import java.lang.annotation.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>* Indicates that the annotated method is a test method.</span></span>
<span class="line"><span>* Use only on parameterless static methods.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Target(ElementType.METHOD)</span></span>
<span class="line"><span>public @interface Test {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The declaration for the Test annotation type is itself annotated with Retention and Target annotations. Such annotations on annotation type declarations are known as meta-annotations. The @Retention(RetentionPolicy.RUNTIME) meta-annotation indicates that Test annotations should be retained at runtime. Without it, Test annotations would be invisible to the test tool. The @Target.get(ElementType.METHOD) meta-annotation indicates that the Test annotation is legal only on method declarations: it cannot be applied to class declarations, field declarations, or other program elements.</p><p>Test 注解类型的声明本身带有 Retention 注解和 Target 注解。这种注解类型声明上的注解称为元注解。<code>@Retention(RetentionPolicy.RUNTIME)</code> 元注解表明测试注解应该在运行时保留。没有它，测试工具将无法识别测试注解。<code>@Target.get(ElementType.METHOD)</code> 元注解表明测试注解仅对方法声明合法：它不能应用于类声明、字段声明或其他程序元素。</p><p><strong>译注 1：注解的保留策略</strong></p><p>保留策略决定了在什么位置丢弃注解。Java 定义了 3 种策略，它们被封装到 <code>java.lang.annotation.RetentionPolicy</code> 枚举中。这 3 种策略分别是 SOURCE、CLASS 和 RUNTIME。</p><ul><li>使用 SOURCE 保留策略的注解，只在源文件中保留，在编译期间会被抛弃。</li><li>使用 CLASS 保留策略的注解，在编译时被存储到 <code>.class</code> 文件中。但是，在运行时不能通过 JVM 得到这些注解。</li><li>使用 RUNTIME 保留策略的注解，在编译时被存储到 <code>.class</code> 文件中，并且在运行时可以通过 JVM 获取这些注解。因此，RUNTIME 保留策略提供了最永久的注解。</li></ul><p><strong>译注 2：ElementType 各常量定义的范围</strong></p><ul><li>ElementType.TYPE <ul><li>Class, interface (including annotation type), or enum declaration（类、接口、注解、枚举）</li></ul></li><li>ElementType.FIELD <ul><li>Field declaration (includes enum constants)（字段、枚举常量）</li></ul></li><li>ElementType.METHOD <ul><li>Method declaration（方法）</li></ul></li><li>ElementType.PARAMETER <ul><li>Formal parameter declaration（方法参数）</li></ul></li><li>ElementType.CONSTRUCTOR <ul><li>Constructor declaration（构造）</li></ul></li><li>ElementType.LOCAL_VARIABLE <ul><li>Local variable declaration（局部变量）</li></ul></li><li>ElementType.ANNOTATION_TYPE <ul><li>Annotation type declaration（注解）</li></ul></li><li>ElementType.PACKAGE <ul><li>Package declaration（包）</li></ul></li><li>ElementType.TYPE_PARAMETER <ul><li>Type parameter declaration（泛型参数）</li><li>Since: 1.8</li></ul></li><li>ElementType.TYPE_USE <ul><li>Use of a type（任意类型，获取 class 对象和 import 两种情况除外）</li><li>Since: 1.8</li></ul></li><li>ElementType.MODULE <ul><li>Module declaration（<a href="https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-C23AFD78-C777-460B-8ACE-58BE5EA681F6" target="_blank" rel="noreferrer">模块</a>）</li><li>Since: 9</li></ul></li></ul><p>The comment before the Test annotation declaration says, “Use only on parameterless static methods.” It would be nice if the compiler could enforce this, but it can’t, unless you write an annotation processor to do so. For more on this topic, see the documentation for javax.annotation.processing. In the absence of such an annotation processor, if you put a Test annotation on the declaration of an instance method or on a method with one or more parameters, the test program will still compile, leaving it to the testing tool to deal with the problem at runtime.</p><p>Test 注解声明之前的代码注释是这么描述的:「Use only on parameterless static methods.（只对无参数的静态方法使用）」如果编译器能够强制执行这一点，那就太好了，但是它不能，除非你编写代码注释处理器来执行。有关此主题的更多信息，请参阅 <code>javax.annotation.processing</code> 的文档。在没有这样的代码注释处理程序的情况下，如果你将 Test 注解放在实例方法的声明上，或者放在带有一个或多个参数的方法上，测试程序仍然会编译，让测试工具在运行时处理。</p><p>Here is how the Test annotation looks in practice. It is called a marker annotation because it has no parameters but simply “marks” the annotated element. If the programmer were to misspell Test or to apply the Test annotation to a program element other than a method declaration, the program wouldn’t compile:</p><p>下面是 Test 注解实际使用时的样子。它被称为标记注解，因为它没有参数，只是对带注解的元素进行「标记」。如果程序员拼错 Test 或将 Test 注解应用于除方法声明之外的程序元素，程序将无法编译：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Program containing marker annotations</span></span>
<span class="line"><span>public class Sample {</span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public static void m1() { } // Test should pass</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void m2() { }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public static void m3() { // Test should fail</span></span>
<span class="line"><span>        throw new RuntimeException(&quot;Boom&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void m4() { }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void m5() { } // INVALID USE: nonstatic method</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void m6() { }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public static void m7() { // Test should fail</span></span>
<span class="line"><span>        throw new RuntimeException(&quot;Crash&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void m8() { }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The Sample class has seven static methods, four of which are annotated as tests. Two of these, m3 and m7, throw exceptions, and two, m1 and m5, do not. But one of the annotated methods that does not throw an exception, m5, is an instance method, so it is not a valid use of the annotation. In sum, Sample contains four tests: one will pass, two will fail, and one is invalid. The four methods that are not annotated with the Test annotation will be ignored by the testing tool.</p><p>Sample 类有 7 个静态方法，其中 4 个被注解为 Test。其中两个方法 m3 和 m7 抛出异常，另外两个 m1 和 m5 没有抛出异常。但是，不抛出异常的带注解的方法 m5 是一个实例方法，因此它不是注解的有效使用。总之，Sample 包含四个测试：一个通过，两个失败，一个无效。没有使用 Test 注释的四个方法将被测试工具忽略。</p><p>The Test annotations have no direct effect on the semantics of the Sample class. They serve only to provide information for use by interested programs. More generally, annotations don’t change the semantics of the annotated code but enable it for special treatment by tools such as this simple test runner:</p><p>Test 注解对 Sample 类的语义没有直接影响。它们仅用于向相关程序提供信息。更普遍的是，注解不会改变被注解代码的语义，而是通过工具（就像如下这个简单的 RunTests 类）对其进行特殊处理：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Program to process marker annotations</span></span>
<span class="line"><span>import java.lang.reflect.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class RunTests {</span></span>
<span class="line"><span>    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span>        int tests = 0;</span></span>
<span class="line"><span>        int passed = 0;</span></span>
<span class="line"><span>        Class&lt;?&gt; testClass = Class.forName(args[0]);</span></span>
<span class="line"><span>        for (Method m : testClass.getDeclaredMethods()) {</span></span>
<span class="line"><span>            if (m.isAnnotationPresent(Test.class)) {</span></span>
<span class="line"><span>                tests++;</span></span>
<span class="line"><span>                try {</span></span>
<span class="line"><span>                    m.invoke(null);</span></span>
<span class="line"><span>                    passed++;</span></span>
<span class="line"><span>                } catch (InvocationTargetException wrappedExc) {</span></span>
<span class="line"><span>                    Throwable exc = wrappedExc.getCause();</span></span>
<span class="line"><span>                    System.out.println(m + &quot; failed: &quot; + exc);</span></span>
<span class="line"><span>                } catch (Exception exc) {</span></span>
<span class="line"><span>                    System.out.println(&quot;Invalid @Test: &quot; + m);</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    System.out.printf(&quot;Passed: %d, Failed: %d%n&quot;,passed, tests - passed);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The test runner tool takes a fully qualified class name on the command line and runs all of the class’s Test-annotated methods reflectively, by calling Method.invoke. The isAnnotationPresent method tells the tool which methods to run. If a test method throws an exception, the reflection facility wraps it in an InvocationTargetException. The tool catches this exception and prints a failure report containing the original exception thrown by the test method, which is extracted from the InvocationTargetException with the getCause method.</p><p>test runner 工具以命令行方式接受一个完全限定的类名，并通过调用 <code>Method.invoke</code> 以反射方式运行类的所有带测试注解的方法。isAnnotationPresent 方法告诉工具要运行哪些方法。如果测试方法抛出异常，反射工具将其封装在 InvocationTargetException 中。该工具捕获这个异常并打印一个失败报告，其中包含测试方法抛出的原始异常，该异常是用 getCause 方法从 InvocationTargetException 提取的。</p><p>If an attempt to invoke a test method by reflection throws any exception other than InvocationTargetException, it indicates an invalid use of the Test annotation that was not caught at compile time. Such uses include annotation of an instance method, of a method with one or more parameters, or of an inaccessible method. The second catch block in the test runner catches these Test usage errors and prints an appropriate error message. Here is the output that is printed if RunTests is run on Sample:</p><p>如果通过反射调用测试方法时抛出除 InvocationTargetException 之外的任何异常，则表明在编译时存在未捕获的 Test 注解的无效用法。这些用途包括实例方法的注解、带有一个或多个参数的方法的注解或不可访问方法的注解。测试运行程序中的第二个 catch 块捕获这些 Test 使用错误并打印对应的错误消息。如果在 Sample 上运行 RunTests，输出如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>public static void Sample.m3() failed: RuntimeException: Boom</span></span>
<span class="line"><span>Invalid @Test: public void Sample.m5()</span></span>
<span class="line"><span>public static void Sample.m7() failed: RuntimeException: Crash</span></span>
<span class="line"><span>Passed: 1, Failed: 3</span></span></code></pre></div><p>Now let’s add support for tests that succeed only if they throw a particular exception. We’ll need a new annotation type for this:</p><p>现在让我们添加一个只在抛出特定异常时才成功的测试支持。我们需要一个新的注解类型：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Annotation type with a parameter</span></span>
<span class="line"><span>import java.lang.annotation.*;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>* Indicates that the annotated method is a test method that</span></span>
<span class="line"><span>* must throw the designated exception to succeed.</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Target(ElementType.METHOD)</span></span>
<span class="line"><span>public @interface ExceptionTest {</span></span>
<span class="line"><span>    Class&lt;? extends Throwable&gt; value();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The type of the parameter for this annotation is <code>Class&lt;? extends Throwable&gt;</code>. This wildcard type is, admittedly, a mouthful. In English, it means “the Class object for some class that extends Throwable,” and it allows the user of the annotation to specify any exception (or error) type. This usage is an example of a bounded type token (Item 33). Here’s how the annotation looks in practice. Note that class literals are used as the values for the annotation parameter:</p><p>这个注解的参数类型是 <code>Class&lt;? extends Throwable&gt;</code>，这个通配符类型确实很复杂。在英语中，它的意思是「某个扩展自 Throwable 的类的 Class 对象」，它允许注解的用户指定任何异常（或错误）类型。这种用法是有界类型令牌（<a href="/Chapter-5/Chapter-5-Item-33-Consider-typesafe-heterogeneous-containers">Item-33</a>）的一个示例。下面是这个注解在实际应用时的样子。注意，类的字面量被用作注解参数的值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Program containing annotations with a parameter</span></span>
<span class="line"><span>public class Sample2 {</span></span>
<span class="line"><span>    @ExceptionTest(ArithmeticException.class)</span></span>
<span class="line"><span>    public static void m1() { // Test should pass</span></span>
<span class="line"><span>        int i = 0;</span></span>
<span class="line"><span>        i = i / i;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ExceptionTest(ArithmeticException.class)</span></span>
<span class="line"><span>    public static void m2() { // Should fail (wrong exception)</span></span>
<span class="line"><span>        int[] a = new int[0];</span></span>
<span class="line"><span>        int i = a[1];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ExceptionTest(ArithmeticException.class)</span></span>
<span class="line"><span>    public static void m3() { } // Should fail (no exception)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Now let’s modify the test runner tool to process the new annotation. Doing so consists of adding the following code to the main method:</p><p>现在让我们修改 test runner 工具来处理新的注解。向 main 方法添加以下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>if (m.isAnnotationPresent(ExceptionTest.class)) {</span></span>
<span class="line"><span>    tests++;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        m.invoke(null);</span></span>
<span class="line"><span>        System.out.printf(&quot;Test %s failed: no exception%n&quot;, m);</span></span>
<span class="line"><span>    } catch (InvocationTargetException wrappedEx) {</span></span>
<span class="line"><span>        Throwable exc = wrappedEx.getCause();</span></span>
<span class="line"><span>        Class&lt;? extends Throwable&gt; excType =m.getAnnotation(ExceptionTest.class).value();</span></span>
<span class="line"><span>        if (excType.isInstance(exc)) {</span></span>
<span class="line"><span>            passed++;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            System.out.printf(&quot;Test %s failed: expected %s, got %s%n&quot;,m, excType.getName(), exc);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    catch (Exception exc) {</span></span>
<span class="line"><span>        System.out.println(&quot;Invalid @Test: &quot; + m);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>This code is similar to the code we used to process Test annotations, with one exception: this code extracts the value of the annotation parameter and uses it to check if the exception thrown by the test is of the right type. There are no explicit casts, and hence no danger of a ClassCastException. The fact that the test program compiled guarantees that its annotation parameters represent valid exception types, with one caveat: if the annotation parameters were valid at compile time but the class file representing a specified exception type is no longer present at runtime, the test runner will throw TypeNotPresentException.</p><p>这段代码与我们用来处理 Test 注解的代码类似，只有一个不同：这段代码提取注解参数的值，并使用它来检查测试抛出的异常是否是正确的类型。这里没有显式的强制类型转换，因此没有 ClassCastException 的危险。编译的测试程序保证其注解参数表示有效的异常类型，但有一点需要注意：如果注解参数在编译时有效，但表示指定异常类型的类文件在运行时不再存在，那么测试运行程序将抛出 TypeNotPresentException。</p><p>Taking our exception testing example one step further, it is possible to envision a test that passes if it throws any one of several specified exceptions. The annotation mechanism has a facility that makes it easy to support this usage. Suppose we change the parameter type of the ExceptionTest annotation to be an array of Class objects:</p><p>进一步修改我们的异常测试示例，如果它抛出几个指定异常中的任意一个，那么可以认为测试通过了。注解机制具有一种工具，可以轻松地支持这种用法。假设我们将 ExceptionTest 注解的参数类型更改为一个 Class 对象数组：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Annotation type with an array parameter</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Target(ElementType.METHOD)</span></span>
<span class="line"><span>public @interface ExceptionTest {</span></span>
<span class="line"><span>    Class&lt;? extends Exception&gt;[] value();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>The syntax for array parameters in annotations is flexible. It is optimized for single-element arrays. All of the previous ExceptionTest annotations are still valid with the new array-parameter version of ExceptionTest and result in single-element arrays. To specify a multiple-element array, surround the elements with curly braces and separate them with commas:</p><p>注解中数组参数的语法是灵活的。它针对单元素数组进行了优化。前面的 ExceptionTest 注解对于 ExceptionTest 的新数组参数版本仍然有效，并且可以生成单元素数组。要指定一个多元素数组，用花括号包围元素，并用逗号分隔它们：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Code containing an annotation with an array parameter</span></span>
<span class="line"><span>@ExceptionTest({ IndexOutOfBoundsException.class,NullPointerException.class })</span></span>
<span class="line"><span>public static void doublyBad() {</span></span>
<span class="line"><span>    List&lt;String&gt; list = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span>    // The spec permits this method to throw either</span></span>
<span class="line"><span>    // IndexOutOfBoundsException or NullPointerException</span></span>
<span class="line"><span>    list.addAll(5, null);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>It is reasonably straightforward to modify the test runner tool to process the new version of ExceptionTest. This code replaces the original version:</p><p>修改测试运行器工具来处理 ExceptionTest 的新版本是相当简单的。这段代码替换了原来的版本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>if (m.isAnnotationPresent(ExceptionTest.class)) {</span></span>
<span class="line"><span>    tests++;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        m.invoke(null);</span></span>
<span class="line"><span>        System.out.printf(&quot;Test %s failed: no exception%n&quot;, m);</span></span>
<span class="line"><span>    } catch (Throwable wrappedExc) {</span></span>
<span class="line"><span>        Throwable exc = wrappedExc.getCause();</span></span>
<span class="line"><span>        int oldPassed = passed;</span></span>
<span class="line"><span>        Class&lt;? extends Exception&gt;[] excTypes =m.getAnnotation(ExceptionTest.class).value();</span></span>
<span class="line"><span>        for (Class&lt;? extends Exception&gt; excType : excTypes) {</span></span>
<span class="line"><span>            if (excType.isInstance(exc)) {</span></span>
<span class="line"><span>                passed++;</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (passed == oldPassed)</span></span>
<span class="line"><span>            System.out.printf(&quot;Test %s failed: %s %n&quot;, m, exc);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>As of Java 8, there is another way to do multivalued annotations. Instead of declaring an annotation type with an array parameter, you can annotate the declaration of an annotation with the @Repeatable meta-annotation, to indicate that the annotation may be applied repeatedly to a single element. This meta-annotation takes a single parameter, which is the class object of a containing annotation type, whose sole parameter is an array of the annotation type [JLS, 9.6.3]. Here’s how the annotation declarations look if we take this approach with our ExceptionTest annotation. Note that the containing annotation type must be annotated with an appropriate retention policy and target, or the declarations won’t compile:</p><p>在 Java 8 中，还有另一种方法可以执行多值注解。你可以在注解声明上使用 <code>@Repeatable</code> 元注解，以表明注解可以重复地应用于单个元素，而不是使用数组参数来声明注解类型。这个元注解只接受一个参数，这个参数是包含注解类型的类对象，它的唯一参数是注解类型的数组 [JLS, 9.6.3]。如果我们对 ExceptionTest 注解采用这种方法，那么注解声明是这样的。注意，包含的注解类型必须使用适当的 Retention 注解和 Target 注解，否则声明将无法编译：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Repeatable annotation type</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Target(ElementType.METHOD)</span></span>
<span class="line"><span>@Repeatable(ExceptionTestContainer.class)</span></span>
<span class="line"><span>public @interface ExceptionTest {</span></span>
<span class="line"><span>    Class&lt;? extends Exception&gt; value();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Target(ElementType.METHOD)</span></span>
<span class="line"><span>public @interface ExceptionTestContainer {</span></span>
<span class="line"><span>    ExceptionTest[] value();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Here’s how our doublyBad test looks with a repeated annotation in place of an array-valued annotation:</p><p>下面是使用重复注解代替数组值注解的 doublyBad 测试：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Code containing a repeated annotation</span></span>
<span class="line"><span>@ExceptionTest(IndexOutOfBoundsException.class)</span></span>
<span class="line"><span>@ExceptionTest(NullPointerException.class)</span></span>
<span class="line"><span>public static void doublyBad() { ... }</span></span></code></pre></div><p>Processing repeatable annotations requires care. A repeated annotation generates a synthetic annotation of the containing annotation type. The getAnnotationsByType method glosses over this fact, and can be used to access both repeated and non-repeated annotations of a repeatable annotation type. But isAnnotationPresent makes it explicit that repeated annotations are not of the annotation type, but of the containing annotation type. If an element has a repeated annotation of some type and you use the isAnnotationPresent method to check if the element has an annotation of that type, you’ll find that it does not. Using this method to check for the presence of an annotation type will therefore cause your program to silently ignore repeated annotations. Similarly, using this method to check for the containing annotation type will cause the program to silently ignore non-repeated annotations. To detect repeated and non-repeated annotations with isAnnotationPresent, you much check for both the annotation type and its containing annotation type. Here’s how the relevant part of our RunTests program looks when modified to use the repeatable version of the ExceptionTest annotation:</p><p>处理可重复注解需要小心。「重复状态」会生成名为「容器注解类型」的合成注解。getAnnotationsByType 方法可忽略这一区别，它可以用于访问可重复注解类型的「重复状态」和「非重复状态」。但是 isAnnotationPresent 明确指出，「重复状态」的情况不属于注解类型，而是「容器注解类型」。如果一个元素是某种类型的「重复状态」注解，并且你使用 isAnnotationPresent 方法检查该元素是否具有该类型的注解，你将发现它提示不存在。因此，使用此方法检查注解类型的存在与否，将导致你的程序忽略「重复状态」。类似地，使用此方法检查「容器注解类型」将导致程序忽略「非重复状态」。要使用 isAnnotationPresent 检测「重复状态」和「非重复状态」，需要同时检查注解类型及其「容器注解类型」。下面是我们的 RunTests 程序的相关部分修改为使用 ExceptionTest 注解的可重复版本时的样子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>// Processing repeatable annotations</span></span>
<span class="line"><span>if (m.isAnnotationPresent(ExceptionTest.class)|| m.isAnnotationPresent(ExceptionTestContainer.class)) {</span></span>
<span class="line"><span>    tests++;</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        m.invoke(null);</span></span>
<span class="line"><span>        System.out.printf(&quot;Test %s failed: no exception%n&quot;, m);</span></span>
<span class="line"><span>    } catch (Throwable wrappedExc) {</span></span>
<span class="line"><span>        Throwable exc = wrappedExc.getCause();</span></span>
<span class="line"><span>        int oldPassed = passed;</span></span>
<span class="line"><span>        ExceptionTest[] excTests =m.getAnnotationsByType(ExceptionTest.class);</span></span>
<span class="line"><span>        for (ExceptionTest excTest : excTests) {</span></span>
<span class="line"><span>            if (excTest.value().isInstance(exc)) {</span></span>
<span class="line"><span>                passed++;</span></span>
<span class="line"><span>                break;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (passed == oldPassed)</span></span>
<span class="line"><span>            System.out.printf(&quot;Test %s failed: %s %n&quot;, m, exc);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>译注：比较原文中提及的 getAnnotationsByType 与 isAnnotationPresent 在可重复注解的「重复状态」和「非重复状态」下的使用差别：</strong></p><p><strong>原 doublyBad 方法不变，属于「重复状态」（重复注解大于等于两个的，都属于「重复状态」）；新增一个 doublyBad2 方法，仅使用一个重复注解，属于「非重复状态」</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>class Simple4 {</span></span>
<span class="line"><span>    // Code containing a repeated annotation</span></span>
<span class="line"><span>    @ExceptionTest(IndexOutOfBoundsException.class)</span></span>
<span class="line"><span>    @ExceptionTest(NullPointerException.class)</span></span>
<span class="line"><span>    public static void doublyBad() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @ExceptionTest(ArithmeticException.class)</span></span>
<span class="line"><span>    public static void doublyBad2() {</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>测试代码</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>public static void main(String[] args) throws NoSuchMethodException {</span></span>
<span class="line"><span>    Class&lt;?&gt; testClass = Simple4.class;</span></span>
<span class="line"><span>    for (int count = 1; count &lt;= 2; count++) {</span></span>
<span class="line"><span>        Method m = testClass.getMethod(count == 1 ? &quot;doublyBad&quot; : &quot;doublyBad&quot; + count);</span></span>
<span class="line"><span>        System.out.println(m.getName() + &quot;「重复状态」：&quot; + m.isAnnotationPresent(ExceptionTest.class));</span></span>
<span class="line"><span>        System.out.println(m.getName() + &quot;「容器注解类型」：&quot; + m.isAnnotationPresent(ExceptionTestContainer.class));</span></span>
<span class="line"><span>        System.out.println(m.getName() + &quot;「非重复状态」：&quot; + m.isAnnotationPresent(ExceptionTest.class));</span></span>
<span class="line"><span>        System.out.println(m.getName() + &quot;「重复状态」：&quot; + m.getAnnotationsByType(ExceptionTest.class));</span></span>
<span class="line"><span>        System.out.println(m.getName() + &quot;「容器注解类型」：&quot; + m.getAnnotationsByType(ExceptionTestContainer.class));</span></span>
<span class="line"><span>        System.out.println(m.getName() + &quot;「非重复状态」：&quot; + m.getAnnotationsByType(ExceptionTest.class));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>结果</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>doublyBad「重复状态」：false</span></span>
<span class="line"><span>doublyBad「容器注解类型」：true</span></span>
<span class="line"><span>doublyBad「非重复状态」：false</span></span>
<span class="line"><span>doublyBad「重复状态」：[LItem_39.ExceptionTest;@1593948d</span></span>
<span class="line"><span>doublyBad「容器注解类型」：[LItem_39.ExceptionTestContainer;@1b604f19</span></span>
<span class="line"><span>doublyBad「非重复状态」：[LItem_39.ExceptionTest;@7823a2f9</span></span>
<span class="line"><span></span></span>
<span class="line"><span>doublyBad2「重复状态」：true</span></span>
<span class="line"><span>doublyBad2「容器注解类型」：false</span></span>
<span class="line"><span>doublyBad2「非重复状态」：true</span></span>
<span class="line"><span>doublyBad2「重复状态」：[LItem_39.ExceptionTest;@cb5822</span></span>
<span class="line"><span>doublyBad2「容器注解类型」：[LItem_39.ExceptionTestContainer;@4b9e13df</span></span>
<span class="line"><span>doublyBad2「非重复状态」：[LItem_39.ExceptionTest;@2b98378d</span></span></code></pre></div><p>Repeatable annotations were added to improve the readability of source code that logically applies multiple instances of the same annotation type to a given program element. If you feel they enhance the readability of your source code, use them, but remember that there is more boilerplate in declaring and processing repeatable annotations, and that processing repeatable annotations is error-prone.</p><p>添加可重复注解是为了提高源代码的可读性，源代码在逻辑上将同一注解类型的多个实例应用于给定的程序元素。如果你觉得它们增强了源代码的可读性，那么就使用它们，但是请记住，在声明和处理可重复注解方面有更多的样板，并且处理可重复注解很容易出错。</p><p>The testing framework in this item is just a toy, but it clearly demonstrates the superiority of annotations over naming patterns, and it only scratches the surface of what you can do with them. If you write a tool that requires programmers to add information to source code, define appropriate annotation types. <strong>There is simply no reason to use naming patterns when you can use annotations instead.</strong></p><p>本条目中的测试框架只是一个示例，但是它清楚地展示了注解相对于命名模式的优势，并且它只涉及到你可以使用它们做什么。如果你编写的工具要求程序员向源代码中添加信息，请定义适当的注解类型。<strong>如果可以使用注解，那么就没有理由使用命名模式。</strong></p><p>That said, with the exception of toolsmiths, most programmers will have no need to define annotation types. But <strong>all programmers should use the predefined annotation types that Java provides</strong> (Items 40, 27). Also, consider using the annotations provided by your IDE or static analysis tools. Such annotations can improve the quality of the diagnostic information provided by these tools. Note, however, that these annotations have yet to be standardized, so you may have some work to do if you switch tools or if a standard emerges.</p><p>也就是说，除了 toolsmiths 之外，大多数程序员不需要定义注解类型。但是所有程序员都应该使用 Java 提供的预定义注解类型（<a href="/Chapter-6/Chapter-6-Item-40-Consistently-use-the-Override-annotation">Item-40</a> 和 <a href="/Chapter-5/Chapter-5-Item-27-Eliminate-unchecked-warnings">Item-27</a>）。另外，考虑使用 IDE 或静态分析工具提供的注解。这些注解可以提高这些工具提供的诊断信息的质量。但是，请注意，这些注解还没有标准化，因此，如果你切换了工具或出现了标准，那么你可能需要做一些工作。</p><hr><p><strong><a href="/Chapter-6/Chapter-6-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-6/Chapter-6-Item-38-Emulate-extensible-enums-with-interfaces">Item 38: Emulate extensible enums with interfaces（使用接口模拟可扩展枚举）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-6/Chapter-6-Item-40-Consistently-use-the-Override-annotation">Item 40: Consistently use the Override annotation（坚持使用 @Override 注解）</a></strong></li></ul>`,77),i=[p];function o(l,c,r,d,h,m){return s(),a("div",null,i)}const y=n(t,[["render",o]]);export{g as __pageData,y as default};

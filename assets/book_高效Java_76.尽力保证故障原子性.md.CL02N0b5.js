import{_ as e,c as t,o as a,aj as o}from"./chunks/framework._AF764y6.js";const u=JSON.parse('{"title":"尽力保证故障原子性","description":"","frontmatter":{"title":"尽力保证故障原子性","date":"2023-10-25T01:05:38.000Z","permalink":"/pages/Chapter-10-Item-76-Strive-for-failure-atomicity.html","categories":["技术书籍","高效Java","异常"],"tags":["高效Java"],"author":"Manaphy"},"headers":[],"relativePath":"book/高效Java/76.尽力保证故障原子性.md","filePath":"book/高效Java/76.尽力保证故障原子性.md","lastUpdated":1743259133000}'),i={name:"book/高效Java/76.尽力保证故障原子性.md"},n=o(`<h3 id="item-76-strive-for-failure-atomicity-尽力保证故障原子性" tabindex="-1">Item 76: Strive for failure atomicity（尽力保证故障原子性） <a class="header-anchor" href="#item-76-strive-for-failure-atomicity-尽力保证故障原子性" aria-label="Permalink to “Item 76: Strive for failure atomicity（尽力保证故障原子性）”">​</a></h3><p>After an object throws an exception, it is generally desirable that the object still be in a well-defined, usable state, even if the failure occurred in the midst of performing an operation. This is especially true for checked exceptions, from which the caller is expected to recover. <strong>Generally speaking, a failed method invocation should leave the object in the state that it was in prior to the invocation.</strong> A method with this property is said to be failure-atomic.</p><p>在对象抛出异常之后，通常希望对象仍然处于定义良好的可用状态，即使在执行操作时发生了故障。对于 checked 异常尤其如此，调用者希望从异常中恢复。<strong>一般来说，失败的方法调用应该使对象处于调用之前的状态。</strong> 具有此属性的方法称为具备故障原子性。</p><p>There are several ways to achieve this effect. The simplest is to design immutable objects (Item 17). If an object is immutable, failure atomicity is free. If an operation fails, it may prevent a new object from getting created, but it will never leave an existing object in an inconsistent state, because the state of each object is consistent when it is created and can’t be modified thereafter.</p><p>有几种方式可以达到这种效果。最简单的方法是设计不可变对象（<a href="/Chapter-4/Chapter-4-Item-17-Minimize-mutability">Item-17</a>）。如果对象是不可变的，则故障原子性是必然的。如果一个操作失败，它可能会阻止创建一个新对象，但是它不会让一个现有对象处于不一致的状态，因为每个对象的状态在创建时是一致的，并且在创建后不能修改。</p><p>For methods that operate on mutable objects, the most common way to achieve failure atomicity is to check parameters for validity before performing the operation (Item 49). This causes most exceptions to get thrown before object modification commences. For example, consider the Stack.pop method in Item 7:</p><p>对于操作可变对象的方法，实现故障原子性的最常见方法是在执行操作之前检查参数的有效性（<a href="/Chapter-8/Chapter-8-Item-49-Check-parameters-for-validity">Item-49</a>）。这使得大多数异常在对象修改开始之前被抛出。例如，考虑 <code>Stack.pop</code> 方法（<a href="/Chapter-2/Chapter-2-Item-7-Eliminate-obsolete-object-references">Item-7</a>）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>public Object pop() {</span></span>
<span class="line"><span>    if (size == 0)</span></span>
<span class="line"><span>        throw new EmptyStackException();</span></span>
<span class="line"><span>    Object result = elements[--size];</span></span>
<span class="line"><span>    elements[size] = null; // Eliminate obsolete reference</span></span>
<span class="line"><span>    return result;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>If the initial size check were eliminated, the method would still throw an exception when it attempted to pop an element from an empty stack. It would, however, leave the size field in an inconsistent (negative) state, causing any future method invocations on the object to fail. Additionally, the ArrayIndexOutOfBoundsException thrown by the pop method would be inappropriate to the abstraction (Item 73).</p><p>如果取消了初始大小检查，当该方法试图从空堆栈中弹出元素时，仍然会抛出异常。但是，这会使 size 字段处于不一致的（负值）状态，导致以后该对象的任何方法调用都会失败。此外，pop 方法抛出的 ArrayIndexOutOfBoundsException 也不适于高层抽象解释（<a href="/Chapter-10/Chapter-10-Item-73-Throw-exceptions-appropriate-to-the-abstraction">Item-73</a>）。</p><p>A closely related approach to achieving failure atomicity is to order the computation so that any part that may fail takes place before any part that modifies the object. This approach is a natural extension of the previous one when arguments cannot be checked without performing a part of the computation. For example, consider the case of TreeMap, whose elements are sorted according to some ordering. In order to add an element to a TreeMap, the element must be of a type that can be compared using the TreeMap’s ordering. Attempting to add an incorrectly typed element will naturally fail with a ClassCastException as a result of searching for the element in the tree, before the tree has been modified in any way.</p><p>实现故障原子性的另一种方式是对计算进行排序，以便可能发生故障的部分都先于修改对象的部分发生。当执行某部分计算才能检查参数时，这种方法是前一种方法的自然扩展。例如，考虑 TreeMap 的情况，它的元素按照一定的顺序排序。为了向 TreeMap 中添加元素，元素的类型必须能够使用 TreeMap 的顺序进行比较。在以任何方式修改「树」之前，由于在「树」中搜索元素，试图添加类型不正确的元素自然会失败，并导致 ClassCastException 异常。</p><p>A third approach to achieving failure atomicity is to perform the operation on a temporary copy of the object and to replace the contents of the object with the temporary copy once the operation is complete. This approach occurs naturally when the computation can be performed more quickly once the data has been stored in a temporary data structure. For example, some sorting functions copy their input list into an array prior to sorting to reduce the cost of accessing elements in the inner loop of the sort. This is done for performance, but as an added benefit, it ensures that the input list will be untouched if the sort fails.</p><p>实现故障原子性的第三种方法是以对象的临时副本执行操作，并在操作完成后用临时副本替换对象的内容。当数据存储在临时数据结构中后，计算过程会更加迅速，这种办法就是很自然的。例如，一些排序函数在排序之前将其输入 list 复制到数组中，以降低访问排序内循环中的元素的成本。这样做是为了提高性能，但是作为一个额外的好处，它确保如果排序失败，输入 list 将保持不变。</p><p>A last and far less common approach to achieving failure atomicity is to write recovery code that intercepts a failure that occurs in the midst of an operation, and causes the object to roll back its state to the point before the operation began. This approach is used mainly for durable (disk-based) data structures.</p><p>实现故障原子性的最后一种不太常见的方法是编写恢复代码，拦截在操作过程中发生的故障，并使对象回滚到操作开始之前的状态。这种方法主要用于持久的（基于磁盘的）数据结构。</p><p>While failure atomicity is generally desirable, it is not always achievable. For example, if two threads attempt to modify the same object concurrently without proper synchronization, the object may be left in an inconsistent state. It would therefore be wrong to assume that an object was still usable after catching a ConcurrentModificationException. Errors are unrecoverable, so you need not even attempt to preserve failure atomicity when throwing AssertionError.</p><p>虽然故障原子性通常是可取的，但它并不总是可以实现的。例如，如果两个线程试图在没有适当同步的情况下并发地修改同一个对象，那么该对象可能会处于不一致的状态。因此，如果假定在捕捉到 ConcurrentModificationException 之后对象仍然可用，那就错了。该错误是不可恢复的，所以在抛出 AssertionError 时，你甚至不需要尝试保存故障原子性。</p><p>Even where failure atomicity is possible, it is not always desirable. For some operations, it would significantly increase the cost or complexity. That said, it is often both free and easy to achieve failure atomicity once you’re aware of the issue.</p><p>即使在可以实现故障原子性的情况下，也并不总是可取的。对于某些操作，它将显著增加成本或复杂性。也就是说，一旦意识到这个问题，就可以轻松地实现故障原子性。</p><p>In summary, as a rule, any generated exception that is part of a method’s specification should leave the object in the same state it was in prior to the method invocation. Where this rule is violated, the API documentation should clearly indicate what state the object will be left in. Unfortunately, plenty of existing API documentation fails to live up to this ideal.</p><p>总之，作为规则，也作为方法规范的一部分，生成的任何异常都应该使对象保持在方法调用之前的状态。如果违反了这条规则，API 文档应该清楚地指出对象将处于什么状态。不幸的是，许多现有的 API 文档都没有做到。</p><hr><p><strong><a href="/Chapter-10/Chapter-10-Introduction">Back to contents of the chapter（返回章节目录）</a></strong></p><ul><li><strong>Previous Item（上一条目）：<a href="/Chapter-10/Chapter-10-Item-75-Include-failure-capture-information-in-detail-messages">Item 75: Include failure capture information in detail messages（异常详细消息中应包含捕获失败的信息）</a></strong></li><li><strong>Next Item（下一条目）：<a href="/Chapter-10/Chapter-10-Item-77-Don’t-ignore-exceptions">Item 77: Don’t ignore exceptions（不要忽略异常）</a></strong></li></ul>`,25),r=[n];function s(p,c,l,h,m,d){return a(),t("div",null,r)}const b=e(i,[["render",s]]);export{u as __pageData,b as default};

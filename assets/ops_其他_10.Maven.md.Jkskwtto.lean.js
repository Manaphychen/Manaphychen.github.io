import{_ as u}from"./chunks/ArticleMetadata.BPSr9oED.js";import{_ as E,E as l,c as b,o as e,j as i,I as a,aj as k,a as s,w as n,b as A,e as o}from"./chunks/framework._AF764y6.js";const f="/assets/1656053431094-d8401156-41fe-45a2-b2da-47e7cb4eb5fe.DY1dVB8Q.png",X=JSON.parse('{"title":"Maven","description":"","frontmatter":{"title":"Maven","date":"2023-10-26T20:24:39.000Z","permalink":"/maven/","categories":["运维"],"tags":["maven"],"author":"Manaphy"},"headers":[],"relativePath":"ops/其他/10.Maven.md","filePath":"ops/其他/10.Maven.md","lastUpdated":1743259619000}'),x={name:"ops/其他/10.Maven.md"},_=i("h1",{id:"maven的使用",tabindex:"-1"},[s("Maven的使用 "),i("a",{class:"header-anchor",href:"#maven的使用","aria-label":"Permalink to “Maven的使用”"},"​")],-1),M=k("",26),j=i("li",null,[i("strong",null,[s("compile "),i("strong",null,"是"),s("默认值")]),s("，当我们引入依赖时，如果标签没有指定，那么"),i("strong",null,"默认"),s("就是complie。 compile表示被依赖项目需要参与当前项目的编译，包括后续的测试，运行周期也参与其中，同时打包的时候也会包含进去。是最常用的，所以也是默认的。")],-1),w=i("li",null,"**runtime **表示被依赖项目无需参与项目的编译，不过后期的测试和运行周期需要其参与。与compile相比，跳过编译而已。 数据库的驱动包一般都是runtime，因为在我们在编码时只会使用JDK提供的jdbc接口，而具体的实现是有对应的厂商提供的驱动(如mysql驱动)，实在运行时生效的，所以这类jar包无需参与项目的编译。",-1),I=i("li",null,'**test **表示只会在测试阶段使用，在src/main/java里面的代码是无法使用这些api的，并且项目打包时，也不会将"test"标记的打入"jar"包或者"war"包。',-1),P=k("",45),S=k("",26),T=i("pre",null,[i("code",null,`<!-- 插件组 -->
<pluginGroups/>

<!-- 代理 -->
<proxies/>

<!-- servers服务器(其中username和password是私服的用户名和密码) -->
<servers>
    <server>
        <id>maven-releases</id>
        <username>admin</username>
        <password>admin111</password>
    </server>

    <server>
        <id>maven-snapshots</id>
        <username>admin</username>
        <password>admin111</password>
    </server>
</servers>

<!-- 镜像
 | 这是从远程存储库下载依赖时使用的镜像列表。
 |-->
<mirrors>
    <!--<mirror>
        <id>alimaven</id>
        <mirrorOf>central</mirrorOf>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    </mirror>-->
    <mirror>
        <id>ManaphyMirror</id>
        <mirrorOf>*</mirrorOf>
        <name>Manaphy Repository Mirror.</name>
        <url>http://192.168.2.132:8081/repository/maven-public/</url>
    </mirror>
</mirrors>

<!-- 服务器配置 -->
<profiles>
    <!-- java编译插件,配jdk的编译版本-->
    <profile>
        <id>jdk-1.8</id>
        <activation>
            <activeByDefault>true</activeByDefault>
            <jdk>1.8</jdk>
        </activation>
        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
            <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
        </properties>
    </profile>
    <!-- 自定义私服的配置 -->
    <profile>
        <id>Manaphy</id>
        <repositories>
            <repository>
                <id>nexus</id>
                <name>Public Repositories</name>
                <url>http://192.168.2.132:8081/repository/maven-public/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
            </repository>
            <repository>
                <id>maven-central</id>
                <name>Central Repositories</name>
                <url>http://192.168.2.132:8082/repository/maven-central/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
            </repository>
            <repository>
                <id>maven-releases</id>
                <name>Release Repositories</name>
                <url>http://192.168.2.132:8081/repository/maven-releases/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
            </repository>
            <repository>
                <id>maven-snapshots</id>
                <name>Snapshot Repositories</name>
                <url>http://192.168.2.132:8081/repository/maven-snapshots/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>true</enabled>
                </snapshots>
            </repository>
        </repositories>

        <pluginRepositories>
            <pluginRepository>
                <id>plugins</id>
                <name>Plugin Repositories</name>
                <url>http://192.168.2.132:8081/repository/maven-public/</url>
            </pluginRepository>
        </pluginRepositories>
    </profile>
</profiles>

<!-- 激活Profiles
 | 为所有生成激活的配置文件的列表。
 |-->
<activeProfiles>
    <activeProfile>jdk-1.8</activeProfile>
    <activeProfile>Manaphy</activeProfile>
</activeProfiles>
`)],-1),q=i("img",{src:"https://www.pnglog.com/DUDSSj.png"},null,-1),V=i("p",null,"注意以下几点：",-1),R=i("ul",null,[i("li",null,"若项目版本号末尾带有 -SNAPSHOT，则会发布到snapshots快照版本仓库"),i("li",null,"若项目版本号末尾带有 -RELEASES 或什么都不带，则会发布到releases正式版本仓库")],-1);function N(t,O,J,H,$,G){const r=u,d=l("ClientOnly"),c=l("includeSystemScope"),C=l("localRepository"),B=l("settings"),g=l("id"),D=l("name"),y=l("url"),F=l("repository"),m=l("snapshotRepository"),v=l("distributionManagement");return e(),b("div",null,[_,a(d,null,{default:n(()=>{var p,h;return[(((p=t.$frontmatter)==null?void 0:p.aside)??!0)&&(((h=t.$frontmatter)==null?void 0:h.showArticleMetadata)??!0)?(e(),A(r,{key:0,article:t.$frontmatter},null,8,["article"])):o("",!0)]}),_:1}),M,i("ul",null,[j,w,I,i("li",null,[s("**system **依赖不是由maven仓库，而是本地的jar包，因此必须配合systemPath标签来指定本地的jar包所在全路径。这类jar包默认会参与编译、测试、运行，但是不会被参与打包阶段。如果也想打包进去的话，需要在插件里做配置"),a(c,null,{default:n(()=>[s("true")]),_:1})])]),P,a(d,null,{default:n(()=>{var p,h;return[(((p=t.$frontmatter)==null?void 0:p.aside)??!0)&&(((h=t.$frontmatter)==null?void 0:h.showArticleMetadata)??!0)?(e(),A(r,{key:0,article:t.$frontmatter},null,8,["article"])):o("",!0)]}),_:1}),S,s(" ### 4、Maven配置使用Nexus 修改Maven的`settings.xml`文件 ```xml "),a(B,{xmlns:"http://maven.apache.org/SETTINGS/1.0.0","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation":"http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"},{default:n(()=>[a(C,null,{default:n(()=>[s("D:\\maven\\repository")]),_:1}),T]),_:1}),s(" ``` ## 创建私有公库 ### 1、打开要发布的maven项目 ### 2、修改项目的pom.xml ```xml "),a(v,null,{default:n(()=>[a(F,null,{default:n(()=>[a(g,null,{default:n(()=>[s("maven-releases")]),_:1}),a(D,null,{default:n(()=>[s("Nexus Release Repository")]),_:1}),a(y,null,{default:n(()=>[s("http://192.168.2.132:8081/repository/maven-releases/")]),_:1})]),_:1}),a(m,null,{default:n(()=>[a(g,null,{default:n(()=>[s("maven-snapshots")]),_:1}),a(D,null,{default:n(()=>[s("Nexus Snapshot Repository")]),_:1}),a(y,null,{default:n(()=>[s("http://192.168.2.132:8081/repository/maven-snapshots/")]),_:1})]),_:1})]),_:1}),s(" ``` ### 3、发布私有公库 ```shell mvn clean deploy ``` 登录Nexus，查看对应的仓库已经有相关的依赖包了 "),q,V,R])}const z=E(x,[["render",N]]);export{X as __pageData,z as default};

@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

REM 步骤1：执行yarn run build构建
echo 🚀 开始执行 vite build...
call yarn run build
if %errorlevel% neq 0 (
    echo ❌ yarn run build 失败！
    pause
    exit /b 1
)

REM 步骤2：将dist目录打包为tar.gz（使用Windows自带tar命令）
echo 📦 打包dist目录...
tar -czf vitepress.tar.gz -C docs\.vitepress\dist .
if %errorlevel% neq 0 (
    echo ❌ 打包失败！
    pause
    exit /b 1
)

REM 步骤3：上传压缩包到服务器
echo ☁️ 上传到云服务器...
scp vitepress.tar.gz aliyun:/tmp/
if %errorlevel% neq 0 (
    echo ❌ 上传失败！
    pause
    exit /b 1
)

REM 步骤4：服务器操作（清空目录、解压、清理）
echo 🔄 在服务器上更新文件...
ssh aliyun "DEPLOY_DIR='/root/docker/nginx/html/vitepress' && TMP_FILE='/tmp/vitepress.tar.gz' && if [ -d \"$DEPLOY_DIR\" ]; then rm -rf \"${DEPLOY_DIR:?}\"/*; else mkdir -p \"$DEPLOY_DIR\" && echo '⚠️ 目录不存在，已自动创建：$DEPLOY_DIR'; fi && tar -xzf \"$TMP_FILE\" -C \"$DEPLOY_DIR\" && rm -f \"$TMP_FILE\" && if [ -f \"${DEPLOY_DIR}/index.html\" ]; then echo '✅ 部署成功！文件位置：${DEPLOY_DIR}'; else echo '❌ 部署异常！未找到index.html' && exit 1; fi"

if %errorlevel% neq 0 (
    echo ❌ 服务器操作失败！
    pause
    exit /b 1
)

REM 清理本地临时文件
del /f /q vitepress.tar.gz >nul 2>&1
rmdir /s /q docs\.vitepress\dist >nul 2>&1

echo 🎉 所有操作已完成！
pause

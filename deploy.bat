@echo off
echo ========================================
echo   نشر المنصة على Vercel (مجاني)
echo ========================================
echo.
echo الخطوة 1: تسجيل الدخول إلى Vercel
echo.
node node_modules\vercel\dist\index.js login
echo.
echo ========================================
echo الخطوة 2: نشر المشروع
echo.
node node_modules\vercel\dist\index.js --yes
echo.
echo ========================================
echo  بعد النشر ستحصل على رابط مثل:
echo  https://your-project.vercel.app
echo ========================================
pause

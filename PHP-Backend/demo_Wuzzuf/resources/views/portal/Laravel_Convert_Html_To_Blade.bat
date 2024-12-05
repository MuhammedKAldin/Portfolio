@echo off
for %%f in (*.html) do (
    ren "%%f" "%%~nf.blade.php"
)
echo All .html files have been renamed to .blade.php.
pause

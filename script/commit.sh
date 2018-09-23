## basepath 为项目所在的目录
basepath=$(dirname $(cd `dirname $0`; pwd))

cd $basepath

git add -A
git commit -m "update wiki"
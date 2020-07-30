```shell
git clone xxx # 克隆代码

git status # 查看修改文件

git add -A  # 提交所有变化

git add -u #  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)

git add .  # 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件

git commit -m
git commit -m xxx #提交到本地仓库
git commit --amend # 追加提交

git fetch # 拉取数据
git merge # 合并
git pull # 从仓库拉取代码并合并

git push # 推送到仓库
git push origin xxx #推送到某个分支



git branch -l # 查看本地分支
git branch -r # 查看远程分支
git branch -a # 查看全部分支（远程的和本地的）
git checkout xxx # 切换分支
git branch -d [branchname] # 删除本地分支
git push origin --delete [branchname] # 删除本地分支
git branch [branchname] # 创建分支
git branch -a # 查看全部分支(包含本地和远程)
git checkout -b branchName commitId #根据指定版本号创建分支
```


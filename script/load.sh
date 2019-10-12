## basepath 为项目所在的目录
basepath=$(dirname $(cd `dirname $0`; pwd))
WIKI_NODE_PATH=$(which node)

cat >wiki.plist <<EOF
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>Label</key>
        <string>wiki</string>
        <key>ProgramArguments</key>
        <array>
                <string>${WIKI_NODE_PATH}</string>
                <string>${basepath}/index.js</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>KeepAlive</key>
        <true/>
</dict>
</plist>
EOF

## 设置 Mac 开机自启动
mv wiki.plist $HOME/Library/LaunchAgents/wiki.plist

launchctl load  -w $HOME/Library/LaunchAgents/wiki.plist

launchctl start wiki

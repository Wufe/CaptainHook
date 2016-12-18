/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import './style.scss';

export default class CommandLine extends Component<{}, {}>{
	render(){
		return (
			<div>
				<div className="commandLineBar">
					<div className="centeredBarContent">Command Line Log</div>
				</div>
				<div className="commandLineContainer">
					<div className="commandLine">
						<div className="commandHeader success">
							[/webhook/1234test1341asd40] - [192.168.1.0]
								<br />
							$ npm install -s
						</div>
						<div>Downloading binary from https://github.com/sass/node-sass/releases/download/v3.13.1/linux-x64-48_binding.node</div>
						<div>Download complete</div>
						<div>Binary saved to /home/ubuntu/CaptainHookDev/node_modules/node-sass/vendor/linux-x64-48/binding.node</div>
						<div>Caching binary to /home/ubuntu/.npm/node-sass/3.13.1/linux-x64-48_binding.node</div>
						<div>make: Entering directory `/home/ubuntu/CaptainHookDev/node_modules/bcrypt/build'</div>
						<div>&nbsp;&nbsp;CXX(target)&nbsp;Release/obj.target/bcrypt_lib/src/blowfish.o</div>
						<div>./Release/.deps/Release/obj.target/bcrypt_lib/src/blowfish.o.d.raw&nbsp;{'{'}&nbsp;dev:&nbsp;56,</div>
						<div>&nbsp;&nbsp;mode:&nbsp;33204,</div>
						<div>&nbsp;&nbsp;nlink:&nbsp;1,</div>
						<div>&nbsp;&nbsp;uid:&nbsp;1000,</div>
						<div>&nbsp;&nbsp;gid:&nbsp;1000,</div>
						<div>&nbsp;&nbsp;rdev:&nbsp;0,</div>
						<div>&nbsp;&nbsp;blksize:&nbsp;4096,</div>
						<div>&nbsp;&nbsp;ino:&nbsp;486654,</div>
						<div>&nbsp;&nbsp;size:&nbsp;86,</div>
						<div>&nbsp;&nbsp;blocks:&nbsp;8,</div>
						<div>&nbsp;&nbsp;atime:&nbsp;2016-12-12T20:02:48.000Z,</div>
						<div>&nbsp;&nbsp;mtime:&nbsp;2016-12-12T20:02:48.000Z,</div>
						<div>&nbsp;&nbsp;ctime:&nbsp;2016-12-12T20:02:48.321Z,</div>
						<div>&nbsp;&nbsp;birthtime:&nbsp;2016-12-12T20:02:48.321Z&nbsp;{'}'}</div>
						<div>&nbsp;&nbsp;CXX(target)&nbsp;Release/obj.target/bcrypt_lib/src/bcrypt.o</div>
						<div>./Release/.deps/Release/obj.target/bcrypt_lib/src/bcrypt.o.d.raw&nbsp;{'{'}&nbsp;dev:&nbsp;56,</div>
						<div>&nbsp;&nbsp;mode:&nbsp;33204,</div>
						<div>&nbsp;&nbsp;nlink:&nbsp;1,</div>
						<div>&nbsp;&nbsp;uid:&nbsp;1000,</div>
						<div>&nbsp;gid:&nbsp;1000,</div>
						<div>&nbsp;&nbsp;rdev:&nbsp;0,</div>
						<div>&nbsp;&nbsp;blksize:&nbsp;4096,</div>
						<div>&nbsp;&nbsp;ino:&nbsp;486658,</div>
						<div>&nbsp;&nbsp;size:&nbsp;82,</div>
						<div>&nbsp;&nbsp;blocks:&nbsp;8,</div>
						<div>&nbsp;&nbsp;atime:&nbsp;2016-12-12T20:02:48.000Z,</div>
						<div>&nbsp;&nbsp;mtime:&nbsp;2016-12-12T20:02:48.000Z,</div>
						<div>&nbsp;&nbsp;ctime:&nbsp;2016-12-12T20:02:48.549Z,</div>
						<div>&nbsp;&nbsp;birthtime:&nbsp;2016-12-12T20:02:48.549Z&nbsp;{'}'}</div>
						<div>&nbsp;&nbsp;CXX(target)&nbsp;Release/obj.target/bcrypt_lib/src/bcrypt_node.o</div>
						<div>./Release/.deps/Release/obj.target/bcrypt_lib/src/bcrypt_node.o.d.raw&nbsp;{'{'}&nbsp;dev:&nbsp;56,</div>
						<div>&nbsp;&nbsp;mode:&nbsp;33204,</div>
						<div>&nbsp;&nbsp;nlink:&nbsp;1,</div>
						<div>&nbsp;&nbsp;uid:&nbsp;1000,</div>
						<div>&nbsp;&nbsp;gid:&nbsp;1000,</div>
						<div>&nbsp;&nbsp;rdev:&nbsp;0,</div>
						<div>&nbsp;&nbsp;blksize:&nbsp;4096,</div>
						<div>&nbsp;&nbsp;ino:&nbsp;486662,</div>
						<div>&nbsp;&nbsp;size:&nbsp;1296,</div>
						<div>&nbsp;&nbsp;blocks:&nbsp;8,</div>
						<div>&nbsp;&nbsp;atime:&nbsp;2016-12-12T20:02:49.000Z,</div>
						<div>&nbsp;&nbsp;mtime:&nbsp;2016-12-12T20:02:49.000Z,</div>
						<div>&nbsp;&nbsp;ctime:&nbsp;2016-12-12T20:02:49.721Z,</div>
						<div>&nbsp;&nbsp;birthtime:&nbsp;2016-12-12T20:02:49.721Z&nbsp;{'}'}</div>
						<div>&nbsp;&nbsp;SOLINK_MODULE(target)&nbsp;Release/obj.target/bcrypt_lib.node</div>
						<div>&nbsp;&nbsp;COPY&nbsp;Release/bcrypt_lib.node</div>
						<div>make:&nbsp;Leaving&nbsp;directory&nbsp;`/home/ubuntu/CaptainHookDev/node_modules/bcrypt/build'</div>
						<div>[sqlite3]&nbsp;Success:&nbsp;"/home/ubuntu/CaptainHookDev/node_modules/sqlite3/lib/binding/node-v48-linux-x64/node_sqlite3.node"&nbsp;is&nbsp;installed&nbsp;via&nbsp;remote</div>
						<div>Binary&nbsp;found&nbsp;at&nbsp;/home/ubuntu/CaptainHookDev/node_modules/node-sass/vendor/linux-x64-48/binding.node</div>
						<div>Testing&nbsp;binary</div>
						<div>Binary&nbsp;is&nbsp;fine</div>
						<div>⠙</div>
						<div>⠹&nbsp;Resolved&nbsp;"undefined"</div>
						<div>⠸&nbsp;Resolved&nbsp;"undefined"</div>
						<div>⠼&nbsp;Resolved&nbsp;"undefined"</div>
						<div>⠴&nbsp;Resolved&nbsp;"body-parser"</div>
						<div>⠦&nbsp;Resolved&nbsp;"argparse"</div>
						<div>⠧&nbsp;Resolved&nbsp;"chalk"</div>
						<div>⠇&nbsp;Resolved&nbsp;"faker"</div>
						<div>⠏&nbsp;Resolved&nbsp;"form-data"</div>
						<div>⠋&nbsp;Resolved&nbsp;"form-data"</div>
						<div>⠙&nbsp;Resolved&nbsp;"form-data"</div>
						<div>⠹&nbsp;Resolved&nbsp;"handlebars"</div>
						<div>⠸&nbsp;Resolved&nbsp;"js-yaml"</div>
						<div>⠼&nbsp;Resolved&nbsp;"js-yaml"</div>
						<div>⠴&nbsp;Resolved&nbsp;"mocha"</div>
						<div>typings&nbsp;WARN&nbsp;deprecated&nbsp;12/3/2016:&nbsp;"registry:dt/react#0.14.0+20161117000655"&nbsp;is&nbsp;deprecated&nbsp;(updated,&nbsp;replaced&nbsp;or&nbsp;removed)</div>
						<div>
							OK
						</div>
					</div>
				</div>
			</div>
		);
	}
}
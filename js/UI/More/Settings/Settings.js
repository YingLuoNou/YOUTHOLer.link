import App from "../../../App";
import { addOnOffTile, addOptionsTile } from "./tiles";
import * as EVENTS from "./events"


export default class Settings {
	constructor() {
		this.app = new App()
		this.config = this.app.config
	}

	init() {
		this.checkLocalStorage()
		this.initSettings()
	}

	initSettings() {
		let darkMode = addOptionsTile(this.config,
			"dark_mode", "黑夜模式",
			"让整体配色对黑暗环境更加友好",
			"dark_mode", EVENTS.onThemeChange
		)

		addOnOffTile(this.config,
			"open_in_new", "在新标签页中打开",
			"启用后，点击应用将在新的浏览器标签页中打开",
			"open_new_tab", EVENTS.onNewTabChange
		)

		addOnOffTile(this.config,
			"sensors", "Ping 点",
			"在友情链接前显示小圆点，用于指示服务当前是否正常运行",
			"ping_dots", EVENTS.onPingDotsChange
		)

		addOnOffTile(this.config,
			"blur_on", "启用模糊效果",
			"可以提升界面的精致感和观感，但可能会对性能产生较大影响",
			"blur", EVENTS.onBlurChange
		)

		addOnOffTile(this.config,
			"animation", "动画效果",
			"开启后将展示更加精致、炫酷的页面过渡动画，可以提升整体使用体验",
			"animations", EVENTS.onAnimationChange
		)

		document.querySelector("#theme-switcher").addEventListener("click", () => {
			let targetButtons = darkMode.querySelector(".options").children
			let storedValue = this.config.get("dark_mode")
			let target;
			if (storedValue == "Auto") {
				let isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
				target = 2 - isSystemDark
			}
			else {
				let isEnforcedDark = storedValue == "On"
				target = !isEnforcedDark + 1
			}
			targetButtons[target].click()
		})
	}

	checkLocalStorage() {
		let warn = document.querySelector("#no-cookies").classList
		if (this.config.storageAvailable) warn.add("hidden")
	}
}
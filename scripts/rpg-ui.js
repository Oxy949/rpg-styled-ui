Hooks.on('init', () => {
	// Register module settings.
	game.settings.register('rpg-styled-ui', 'navigationVerticalToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.NAVIGATION'),
		hint: game.i18n.localize('RPGUI.SETTINGS.NAVIGATION_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('rpg-styled-ui', 'compactModeToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.COMPACT_MODE'),
		hint: game.i18n.localize('RPGUI.SETTINGS.COMPACT_MODE_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('rpg-styled-ui', 'standardLogoToggle', {
		name: game.i18n.localize('RPGUI.SETTINGS.STANDARD_LOGO'),
		hint: game.i18n.localize('RPGUI.SETTINGS.STANDARD_LOGO_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('rpg-styled-ui', 'minimalUICompatibility', {
		name: game.i18n.localize('RPGUI.SETTINGS.MINIMAL_UI'),
		hint: game.i18n.localize('RPGUI.SETTINGS.MINIMAL_UI_HINT'),
		scope: "world",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});
	game.settings.register('rpg-styled-ui', 'disableAllStyles', {
		name: game.i18n.localize('RPGUI.SETTINGS.DISABLE_STYLES'),
		hint: game.i18n.localize('RPGUI.SETTINGS.DISABLE_STYLES_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});


	if (!game.settings.get('rpg-styled-ui', 'disableAllStyles')) {
		rpgUIAddMainCss()
		addCompatibilityCss()
	}

	if (game.settings.get('rpg-styled-ui', 'minimalUICompatibility')) {
		addClassByQuerySelector('minimal-ui-mode', 'body.vtt')
	}

});

// Retreat class of Monk's Little Details
Hooks.on('ready', async () => {
	$("body").removeClass("change-windows");
});

Hooks.on('getSceneNavigationContext', () => {
	if (!game.settings.get('rpg-styled-ui', 'navigationVerticalToggle')) {
		navigation = document.querySelector("nav.app > ol#scene-list");
		if (navigation) {
			navigation.classList.add("vertical")
		}
	}
	if (game.settings.get('rpg-styled-ui', 'compactModeToggle')) {
		addClassByQuerySelector("compact-mode", "body")
	}
});

Hooks.on('renderCombatCarousel', () => {
	let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
	if (carouselSize !== "") {
		addClassByQuerySelector(carouselSize, "#combat-carousel")
	}
});

function addClassByQuerySelector(className, selector) {
	let navigation = document.querySelector(selector);
	navigation.classList.add(className)
}

function rpgUIAddMainCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/rpg-styled-ui/css/rpg-ui.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

function addCompatibilityCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/rpg-styled-ui/css/compatibility.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

function adjustControls() {
	const uiTopHeight = $('#ui-top').outerHeight();
	const statusBar = $('#controls');
	statusBar.css('margin-top', `${uiTopHeight}px`);

}

//Someone could help me how to do this with Hooks for first load
$(document).ready(() => {
	setTimeout(adjustControls, 1000);
  });
$(window).on('resize', adjustControls);

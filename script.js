void function (f) {
	const forceBranch = addr => '02' + addr + ' 00004800',
		nopBranch = addr => '04' + addr + ' 60000000',
		GAME_ADDRESSES = {
		jap: {c: ['120D34'], g: ['121054', '121160', '1211E4'], h: ['120FB8', '12112C', '1211AC'], i: ['12CB18', '12CE6C', '14530C'], s: ['12C9B0']},
		jpa: {c: ['22193C'], g: ['221C5C', '221D68', '221DEC'], h: ['221BC0', '221D34', '221DB8'], i: ['22D394', '22D6E8', '2459B8'], s: ['22D22C']},
		pal: {c: ['239980'], g: ['239CA0', '239DAC', '239E30'], h: ['239C04', '239D78', '239DFC'], i: ['2453D0', '245724', '25D9F4'], s: ['245268']},
		usa: {c: ['241BF4'], g: ['241F14', '242020', '2420A4'], h: ['241E78', '241FEC', '242070'], i: ['24D644', '24D998', '265C68'], s: ['24D4DC']}
	}

	function updateCodes() {
		if (!f.elements.v.value) {
			f.elements.out.value = 'Please select your game version'
			return
		}

		const gameAddrs = GAME_ADDRESSES[f.elements.v.value]

		let codes = []

		if (f.elements.i.checked) {
			codes = [nopBranch(gameAddrs.i[0]), forceBranch(gameAddrs.i[1]), forceBranch(gameAddrs.i[2])]
		} else {
			for (const i of 'hcgs') {
				codes = codes.concat(gameAddrs[i].map({y: nopBranch, n: forceBranch}[f.elements[i].value] || (() => '')).filter(Boolean))
			}
		}

		f.elements.out.innerHTML = codes.join('<br />')
	}

	window.addEventListener('load', updateCodes)
	f.addEventListener('change', updateCodes)

	f.addEventListener('submit', function (e) {
		e.preventDefault()
		return false
	})
}(document.forms[0])
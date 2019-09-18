const puppeteer = require('puppeteer');
const cookieBumble = ''; // example: s2:98:ZX65sd656lfasdfoW5DFA25asdf845asfd48rt4U
let limit = 200; // Likes to do

async function initApp(){
	const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});  
	const page = await browser.newPage();
    
    let count = 0;
    const url = 'https://bumble.com/app';

	function loveClick(x) { 
		return new Promise(resolve => {
		  setTimeout(() => {
			page.keyboard.press('ArrowRight');
			if (count < limit) {
				count++;
				loveClick();
			}
			resolve(x);
		  }, 1000);
		});
	  }
	  
	async function toMatch() {
		var x = await loveClick(10);
		console.log(x); // 10
	}

    await page.goto(url);
	const cookies = [{
		'name': 'session',
		'value': cookieBumble
		},{
		'name': 'cookie2',
		'value': 'val2'
		},{
		'name': 'cookie3',
		'value': 'val3'
    }];
    await page.goto(url);
    
	console.log(cookieBumble)
    await page.setCookie(...cookies);
    const cookiesSet = await page.cookies(url);
    await page.goto(url);
    await toMatch();
}

initApp();
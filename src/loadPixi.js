const loadPixi = (callback) => {
	const existingScript = document.getElementById('pixijs');
	if (!existingScript) {
	  const script = document.createElement('script');
	  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.0.4/pixi.min.js';
	//   script.integrity = "sha512-UQMlkbatDPsiH7tXKzfeZaPbR/TB1ThUOD6cjqmWPyKhdBl5jHiCVpSrfl+8n3KfEDhnhPhA+/8joiYpTHeC6w==";
	  script.crossorigin="anonymous" 
	  script.referrerpolicy="no-referrer"
	  script.id = 'pixijs';
	  document.body.appendChild(script);
	  script.onload = () => { 
		if (callback) callback();
	  };
	}
	if (existingScript && callback) {callback();}
  };
  export default loadPixi;
const { exec } = require('child_process');
const os = require('os');

const scriptPath = './start_tools.sh';

// Fonction pour exécuter le script
const runScript = () => {
	const currentOS = os.platform();

	let command;
	if (currentOS === 'darwin') {
		// macOS
		command = `osascript -e 'tell application "Terminal" to do script "cd ${__dirname} && bash ${scriptPath}"'`;
	} else if (currentOS === 'linux') {
		// Linux
		command = `gnome-terminal -- bash -c "cd ${__dirname} && bash ${scriptPath}"`;
	} else if (currentOS === 'win32') {
		// Windows
		command = `start cmd.exe /K "cd ${__dirname} && bash ${scriptPath}"`;
	} else {
		console.log('Système d\'exploitation non supporté');
		return;
	}

	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Erreur: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`Erreur: ${stderr}`);
			return;
		}
		console.log(`Sortie: ${stdout}`);
	});
};

runScript();
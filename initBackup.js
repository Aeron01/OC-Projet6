const fs = require('fs');
const readline = require('readline');

const databaseFile = 'database.sqlite';
const backupFile = 'database.sqlite.bak';
const packageFile = 'package.json';

const env = "LINUX" // "WINDOWS" | "LINUX" | "MACOS"
const remove_commands = new Map();
remove_commands.set("LINUX", "rm -f database.sqlite && cp -f database.sqlite.bak database.sqlite");
remove_commands.set("MACOS", "rm -f database.sqlite && cp -f database.sqlite.bak database.sqlite");
remove_commands.set("WINDOWS", "del /f database.sqlite && copy database.sqlite.bak database.sqlite");
const remove_cmd = remove_commands.get(env)


// Vérification de l'existence des fichiers "database.sqlite", "database.sqlite.bak" et "package.js" 
if (fs.existsSync(databaseFile) && fs.existsSync(packageFile)) {

    // Vérification de l'existence du fichier de sauvegarde "database.sqlite.bak"
    if (fs.existsSync(backupFile)) {
        const rl = readline.createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        rl.question(`Le fichier de sauvegarde ${backupFile} existe déjà. Voulez-vous l'écraser ? (O/N) `, (answer) => {
            rl.close();
            if (answer.toLocaleUpperCase() !== 'O') {
                console.log('Opération annulée. Le fichier de sauvegarde n\'a pas été écrasé.');
                process.exit(0)
            }
            performBackup();
        });
    } else {
        performBackup();
    }
} else {
    if (!fs.existsSync(databaseFile)) {
        console.error(`Erreur : Le fichiers ${databaseFile} nécessaire n'existe pas.`);
    }
    if (!fs.existsSync(packageFile)) {
        console.error(`Erreur : Le fichiers ${packageFile} nécessaire n'existe pas.`);
    }
    console.log('Assurez-vous que le fichier existe dans le répertoire courant.');
    process.exit(1);
}


function performBackup() {

    // Copie du fichier "database.sqlite" et renomage de la copie en "database.squlite.bak"
    fs.copyFileSync(databaseFile, backupFile);
    
    // Modification du fichier "package.json"
    fs.readFile(packageFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    
        // Ajout de la virgue à la fin de la ligne 8
        let modifiedData = data.replace(/("test": "echo \\\"Error: no test specified\\\" && exit 1")/, '$1,');
    
        // Ajout de la ligne "backup" en ligne 9
        modifiedData = data.replace(/("test": "echo \\"Error: no test specified\\" && exit 1")/, `$&,\n    "backup": "${remove_cmd}"`);
        // Écriture du fichier modifié
        fs.writeFile(packageFile, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Les opérations de sauvegarde ont été effectuées avec succès !');
        });
    });
}

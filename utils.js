const { exec } = require("child_process");

function shutdown() {
  exec("sudo shutdown -h now", (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'arrêt : ${error}`);
      return;
    }
    console.log("Arrêt en cours...");
  });
}

function reboot() {
  exec("sudo reboot", (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors du redémarrage : ${error}`);
      return;
    }
    console.log("Redémarrage en cours...");
  });
}

// Export de la fonction pour éteindre le Raspberry Pi
module.exports = {
  shutdown,
  reboot,
};

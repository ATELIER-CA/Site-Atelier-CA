#!/bin/bash

PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"

# Obtenir le chemin du dossier contenant le script
PROJECT_PATH="$(cd "$(dirname "$0")" && pwd)"

# Déterminer le système d'exploitation
OS="$(uname)"

# Commande pour ouvrir un terminal et lancer le serveur Node.js
if [[ "$OS" == "Linux" ]]; then
    # Pour Linux
    gnome-terminal -- bash -c "cd $PROJECT_PATH && node server.js; exec bash"
    sleep 2
    xdg-open "http://localhost:2419"
elif [[ "$OS" == "Darwin" ]]; then
    # Pour macOS
    osascript -e "tell application \"Terminal\" to do script \"cd $PROJECT_PATH && node server.js\""
    sleep 2
    open "http://localhost:2419"
elif [[ "$OS" == *"_NT"* ]]; then
    # Pour Windows (cmd.exe ou PowerShell)
    start cmd.exe /K "cd /d $PROJECT_PATH && node server.js"
    sleep 2
    start "http://localhost:2419"
else
    echo "Système d'exploitation non pris en charge."
fi
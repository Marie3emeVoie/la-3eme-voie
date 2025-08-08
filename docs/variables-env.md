# Variables d’environnement

Ce projet utilise un fichier `.env` pour stocker des informations sensibles, comme des clés API.

## Bonnes pratiques

- Ne **jamais** ajouter le fichier `.env` au dépôt Git.
- Utiliser un fichier `.env.example` pour indiquer quelles variables sont nécessaires.

## Exemple de variable

```env
VITE_PUBLIC_API_KEY=ma_clé_api_publique

À quoi ça sert ?
Cette variable est un exemple de clé API publique.

Elle permettrait au site de communiquer avec des services externes (ex : météo, traduction, etc.).

Pour l’instant, elle n’est pas utilisée, mais elle est prête à être configurée.

Comment y accéder dans le code ?
Dans votre code JavaScript, utilisez :

import.meta.env.VITE_PUBLIC_API_KEY;

⚠️ Important : Les variables doivent commencer par VITE_ pour être accessibles dans Vite.

N’hésitez pas à consulter ce fichier pour comprendre comment gérer vos secrets en toute sécurité.








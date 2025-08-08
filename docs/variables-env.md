# 🔐 Fichier .env

Ce projet utilise un fichier `.env` pour stocker des informations sensibles (ex : clés API).

## Bonnes pratiques

- Ne **jamais** ajouter le fichier `.env` au dépôt Git.
- Utiliser le fichier `.env.example` pour indiquer quelles variables sont nécessaires.

## Exemple :

VITE_PUBLIC_API_KEY=ma_clé_api_publique


Dans le code, on y accède avec :

```js
import.meta.env.VITE_PUBLIC_API_KEY


⚠️ Les variables doivent commencer par VITE_ pour être accessibles dans Vite.


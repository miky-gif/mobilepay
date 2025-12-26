# 🚀 Hébergement moobilpay sur Vercel

## ⚠️ Important : Vercel ne supporte pas PHP

Vercel est conçu pour les sites statiques et JavaScript. Le fichier PHP ne fonctionnera pas.

## ✅ Solution Simple : Formspree (GRATUIT)

Formspree est un service gratuit qui gère l'envoi d'emails sans backend.

### Étape 1 : Créer un compte Formspree

1. Aller sur https://formspree.io/
2. Créer un compte gratuit
3. Cliquer sur "New Form"
4. Entrer l'email : **contact@moobilpay.com**
5. Copier l'URL du formulaire (ex: `https://formspree.io/f/xyzabc123`)

### Étape 2 : Modifier le formulaire HTML

Remplacer l'attribut `action` dans `index.html` :

```html
<!-- Avant -->
<form action="forms/contact.php" method="post" class="php-email-form">

<!-- Après -->
<form action="https://formspree.io/f/VOTRE_ID_ICI" method="post" class="php-email-form">
```

### Étape 3 : C'est tout ! 🎉

Le formulaire enverra automatiquement les emails à contact@moobilpay.com

---

## 📦 Déploiement sur Vercel

### Méthode 1 : Via GitHub (Recommandé)

1. **Créer un repo GitHub**
   ```bash
   cd e:\mobilpay-site\SoftLand
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/moobilpay.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Aller sur https://vercel.com
   - Cliquer "New Project"
   - Importer votre repo GitHub
   - Cliquer "Deploy"

### Méthode 2 : Via Vercel CLI

1. **Installer Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Se connecter**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   cd e:\mobilpay-site\SoftLand
   vercel
   ```

4. **Suivre les instructions** :
   - Set up and deploy? → Yes
   - Which scope? → Votre compte
   - Link to existing project? → No
   - Project name? → moobilpay
   - Directory? → ./
   - Override settings? → No

---

## 🎨 Configuration Vercel

### Fichier `vercel.json` (optionnel)

Créer ce fichier à la racine pour optimiser :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## 🔄 Alternative : EmailJS (Aussi gratuit)

Si tu préfères une autre solution :

### 1. Créer un compte EmailJS

1. Aller sur https://www.emailjs.com/
2. Créer un compte gratuit (200 emails/mois)
3. Ajouter un service email (Gmail, Outlook, etc.)
4. Créer un template d'email
5. Copier les IDs : Service ID, Template ID, Public Key

### 2. Ajouter EmailJS au site

```html
<!-- Dans index.html, avant </body> -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  (function(){
    emailjs.init("VOTRE_PUBLIC_KEY");
  })();
</script>
```

### 3. Modifier contact-form.js

```javascript
document.querySelector('.php-email-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    name: this.querySelector('[name="name"]').value,
    email: this.querySelector('[name="email"]').value,
    subject: this.querySelector('[name="subject"]').value,
    message: this.querySelector('[name="message"]').value
  };
  
  emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', formData)
    .then(function() {
      alert('Message envoyé avec succès!');
    }, function(error) {
      alert('Erreur: ' + error.text);
    });
});
```

---

## 📊 Comparaison des Solutions

| Solution | Prix | Limite | Difficulté | Recommandation |
|----------|------|--------|------------|----------------|
| **Formspree** | Gratuit | 50 emails/mois | ⭐ Très facile | ✅ **MEILLEURE** |
| **EmailJS** | Gratuit | 200 emails/mois | ⭐⭐ Facile | ✅ Bonne |
| **Web3Forms** | Gratuit | 250 emails/mois | ⭐ Très facile | ✅ Bonne |
| **Gmail SMTP** | Gratuit | 500 emails/jour | ⭐⭐⭐⭐ Complexe | ❌ Trop compliqué |

---

## 🎯 Ma Recommandation : FORMSPREE

C'est la solution la plus simple :
1. Pas de code à écrire
2. Pas de configuration complexe
3. Gratuit pour 50 emails/mois (largement suffisant au début)
4. Fonctionne parfaitement avec Vercel

---

## 🔗 Domaine Personnalisé

Une fois déployé sur Vercel, tu peux ajouter ton propre domaine :

1. Aller dans Project Settings
2. Cliquer sur "Domains"
3. Ajouter ton domaine (ex: moobilpay.com)
4. Suivre les instructions DNS

---

## 📝 Checklist Avant Déploiement

- [ ] Créer compte Formspree
- [ ] Modifier l'attribut `action` du formulaire
- [ ] Tester le formulaire en local
- [ ] Créer repo GitHub (optionnel)
- [ ] Déployer sur Vercel
- [ ] Tester le formulaire en production
- [ ] Configurer domaine personnalisé (optionnel)

---

## 🆘 Besoin d'Aide ?

Si tu veux que je configure Formspree directement dans ton code, dis-le moi et je le fais !

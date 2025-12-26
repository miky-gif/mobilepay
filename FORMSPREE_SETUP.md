# 📧 Configuration Formspree pour moobilpay

## 🎯 Étapes Simples (5 minutes)

### 1️⃣ Créer un compte Formspree

1. Va sur **https://formspree.io/**
2. Clique sur **"Get Started"** ou **"Sign Up"**
3. Crée un compte avec ton email ou GitHub

### 2️⃣ Créer ton formulaire

1. Une fois connecté, clique sur **"+ New Form"**
2. Entre l'email de réception : **contact@moobilpay.com**
3. Donne un nom au formulaire : **moobilpay Contact**
4. Clique sur **"Create Form"**

### 3️⃣ Copier l'ID du formulaire

Tu verras une URL comme :
```
https://formspree.io/f/xyzabc123
```

L'ID est la partie après `/f/` → **xyzabc123**

### 4️⃣ Remplacer dans index.html

Ouvre `index.html` et cherche la ligne 836 :

**Avant :**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="post" class="php-email-form">
```

**Après :**
```html
<form action="https://formspree.io/f/xyzabc123" method="post" class="php-email-form">
```

(Remplace `xyzabc123` par TON vrai ID)

### 5️⃣ C'est terminé ! 🎉

Le formulaire est maintenant prêt pour Vercel !

---

## 📊 Plan Gratuit Formspree

- ✅ **50 soumissions/mois** (gratuit)
- ✅ Protection anti-spam
- ✅ Notifications email instantanées
- ✅ Fonctionne avec Vercel
- ✅ Pas de code backend nécessaire

---

## 🚀 Déployer sur Vercel

### Option 1 : Via le site web (Plus facile)

1. Va sur **https://vercel.com**
2. Connecte-toi avec GitHub
3. Clique **"Add New Project"**
4. Importe ton projet
5. Clique **"Deploy"**

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd e:\mobilpay-site\SoftLand
vercel --prod
```

---

## ✅ Checklist

- [ ] Créer compte Formspree
- [ ] Créer un formulaire avec email contact@moobilpay.com
- [ ] Copier l'ID du formulaire
- [ ] Remplacer `YOUR_FORM_ID` dans index.html ligne 836
- [ ] Déployer sur Vercel
- [ ] Tester le formulaire

---

## 🧪 Test

Après déploiement :
1. Va sur ton site Vercel
2. Remplis le formulaire de contact
3. Vérifie l'email à contact@moobilpay.com

---

## 💡 Astuce

Si tu dépasses 50 emails/mois, tu peux :
- Passer au plan payant Formspree (10$/mois)
- Utiliser Web3Forms (250 emails/mois gratuit)
- Utiliser EmailJS (200 emails/mois gratuit)

---

## 🆘 Problème ?

Si le formulaire ne fonctionne pas :
1. Vérifie que l'ID Formspree est correct
2. Vérifie que l'email contact@moobilpay.com est confirmé dans Formspree
3. Regarde les logs dans ton dashboard Formspree

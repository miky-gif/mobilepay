# Configuration du Formulaire de Contact - moobilpay

## ✅ Ce qui a été fait

Le formulaire de contact a été configuré pour envoyer les messages à **contact@moobilpay.com**.

### Fichiers modifiés/créés :
1. **`forms/contact.php`** - Script PHP qui traite et envoie les emails
2. **`assets/js/contact-form.js`** - Gestion JavaScript du formulaire avec AJAX
3. **`index.html`** - Ajout du script contact-form.js

## 📋 Fonctionnalités

- ✅ Validation des champs (nom, email, sujet, message)
- ✅ Protection contre les injections XSS
- ✅ Messages d'erreur en français et anglais
- ✅ Envoi AJAX sans rechargement de page
- ✅ Messages de confirmation visuels
- ✅ Réinitialisation automatique du formulaire après envoi

## ⚙️ Configuration Serveur Requise

### 1. Fonction mail() PHP

Le script utilise la fonction native `mail()` de PHP. Pour que cela fonctionne, votre serveur web doit avoir :

**Sur un serveur Linux/cPanel :**
- PHP installé (version 7.0+)
- Service de mail configuré (Sendmail, Postfix, ou SMTP)
- Généralement déjà configuré par défaut

**Test rapide :**
```php
<?php
if (function_exists('mail')) {
    echo "La fonction mail() est disponible";
} else {
    echo "La fonction mail() n'est pas disponible";
}
?>
```

### 2. Configuration DNS (Important !)

Pour éviter que vos emails soient marqués comme SPAM, configurez ces enregistrements DNS :

**SPF Record :**
```
Type: TXT
Nom: @
Valeur: v=spf1 a mx ip4:VOTRE_IP_SERVEUR ~all
```

**DMARC Record :**
```
Type: TXT
Nom: _dmarc
Valeur: v=DMARC1; p=none; rua=mailto:contact@moobilpay.com
```

### 3. Alternative : Utiliser un Service SMTP

Si la fonction `mail()` ne fonctionne pas bien, vous pouvez utiliser un service SMTP externe.

**Services recommandés :**
- **Gmail SMTP** (gratuit, 500 emails/jour)
- **SendGrid** (gratuit, 100 emails/jour)
- **Mailgun** (gratuit, 5000 emails/mois)
- **Amazon SES** (très bon marché)

## 🔧 Configuration SMTP (Optionnelle)

Si vous voulez utiliser SMTP au lieu de mail(), installez PHPMailer :

### Étape 1 : Installer PHPMailer
```bash
composer require phpmailer/phpmailer
```

### Étape 2 : Modifier forms/contact.php

Remplacez le contenu par :

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$receiving_email_address = 'contact@moobilpay.com';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Récupération et validation des données (même code)
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation...
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tous les champs sont requis']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email invalide']);
    exit;
}

// Configuration PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuration SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';  // Ou votre serveur SMTP
    $mail->SMTPAuth   = true;
    $mail->Username   = 'votre-email@gmail.com';
    $mail->Password   = 'votre-mot-de-passe-app';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    
    // Destinataire
    $mail->setFrom($email, $name);
    $mail->addAddress($receiving_email_address);
    $mail->addReplyTo($email, $name);
    
    // Contenu
    $mail->isHTML(false);
    $mail->Subject = "Contact moobilpay: " . $subject;
    $mail->Body    = "Nouveau message de contact\n\n" .
                     "Nom: $name\n" .
                     "Email: $email\n" .
                     "Sujet: $subject\n\n" .
                     "Message:\n$message";
    
    $mail->send();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès!'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => "Erreur d'envoi: {$mail->ErrorInfo}"
    ]);
}
?>
```

### Configuration Gmail SMTP :
1. Activer la validation en 2 étapes sur votre compte Gmail
2. Générer un "Mot de passe d'application" : https://myaccount.google.com/apppasswords
3. Utiliser ce mot de passe dans le script

## 🧪 Test du Formulaire

### Test en local (XAMPP/WAMP) :
1. Installer un serveur local avec PHP
2. Configurer le serveur SMTP dans php.ini (ou utiliser PHPMailer)
3. Accéder à http://localhost/moobilpay-site/SoftLand/

### Test en production :
1. Uploader tous les fichiers sur votre hébergeur
2. Vérifier que PHP est activé
3. Tester le formulaire sur votre site

## 📧 Format de l'Email Reçu

Quand quelqu'un remplit le formulaire, vous recevrez un email comme ceci :

```
De: Nom du Client <email@client.com>
À: contact@moobilpay.com
Sujet: Contact moobilpay: [Sujet du message]

Nouveau message de contact depuis moobilpay.com

Nom: Nom du Client
Email: email@client.com
Sujet: Demande d'information

Message:
[Le message du client]
```

## 🔒 Sécurité

Le formulaire inclut :
- ✅ Validation côté serveur
- ✅ Protection XSS (htmlspecialchars)
- ✅ Validation d'email
- ✅ Protection contre les injections
- ✅ Limitation aux requêtes POST uniquement

## 🐛 Dépannage

### Le formulaire ne s'envoie pas :
1. Vérifier que PHP est installé sur le serveur
2. Vérifier les permissions du fichier contact.php (644)
3. Vérifier les logs d'erreur PHP
4. Tester avec un email différent

### Les emails arrivent dans SPAM :
1. Configurer les enregistrements SPF/DMARC
2. Utiliser un service SMTP professionnel
3. Vérifier que votre domaine a une bonne réputation

### Erreur "Unable to send email" :
1. Vérifier que la fonction mail() est activée
2. Passer à PHPMailer avec SMTP
3. Contacter votre hébergeur

## 📞 Support

Pour toute question technique, contactez votre hébergeur web ou un développeur PHP.

---

**Note importante :** Le formulaire est maintenant configuré et prêt à l'emploi. Il suffit de l'uploader sur un serveur avec PHP pour qu'il fonctionne !

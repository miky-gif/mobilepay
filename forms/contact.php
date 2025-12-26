<?php
/**
 * moobilpay Contact Form Handler
 * Sends contact form submissions to contact@moobilpay.com
 */

// Configuration
$receiving_email_address = 'contact@moobilpay.com';

// Set header for JSON response
header('Content-Type: application/json');

// Check if request is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Sanitize and validate input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get and validate form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Le nom est requis / Name is required';
}

if (empty($email)) {
    $errors[] = 'L\'email est requis / Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Format d\'email invalide / Invalid email format';
}

if (empty($subject)) {
    $errors[] = 'Le sujet est requis / Subject is required';
}

if (empty($message)) {
    $errors[] = 'Le message est requis / Message is required';
}

// If there are validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit;
}

// Prepare email
$email_subject = "Contact moobilpay: " . $subject;
$email_body = "Nouveau message de contact depuis moobilpay.com\n\n";
$email_body .= "Nom: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Sujet: $subject\n\n";
$email_body .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$mail_sent = @mail($receiving_email_address, $email_subject, $email_body, $headers);

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été envoyé avec succès! / Your message has been sent successfully!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur lors de l\'envoi du message. Veuillez réessayer. / Error sending message. Please try again.'
    ]);
}
?>

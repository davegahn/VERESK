<?php
// Файлы phpmailer
require 'lib/class.phpmailer.php';
require 'lib/class.smtp.php';

// Настройки
$mail = new PHPMailer;

$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'aleksey.flce@gmail.com';
$mail->Password = '';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465; //587, 25 или 2525
$mail->setFrom('office@veresk-vafli.ru'); //  Ваш Email
$mail->addAddress('ptd@fgr.ru'); // Email получателя


// $Mailer->SMTPDebug = 3;
// $Mailer->SMTPDebug = 4;

// Письмо
$mail->isHTML(true);
$mail->Subject = "Сообщение с сайта veresk-vafli.ru"; // Заголовок письма

$mail->Body = "Имя: {$_POST['name']}<br> Email: {$_POST['phone']}<br> Телефон: {$_POST['phone']}<br> Сообщение: " . nl2br($_POST['mess']);

// Результат
if(!$mail->send()) {
	echo 'Message could not be sent.';
	echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	echo 'ok';
}
?>

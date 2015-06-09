<?php
    require_once('/../clases/user.php');
    header('Access-Control-Allow-Origin: *');
  // validar que existan los datos
	function generateRandomString($length = 10) 
	{
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) 
		{
			$randomString .= $characters[rand(0, $charactersLength - 1)];
    	}
        return $randomString;
    }
	if (isset($_REQUEST['email'])) 
    {
        // variables
        $password = generateRandomString();
        $user = new User();
        $result = $user->updatePassword($_REQUEST['email'], $password);
        if ($result == 0)
        {
            $email_to = $_REQUEST['email'].',faus_060@hotmail.com, juansutt@translead.com'; // required
            $email_from = 'dashboard@translead.com'; // required
            $email_subject = 'Reset Password'; // required
            $email_message = 'Your new password is: '.$password.'\nPlease change it with your own password from profile as soon as you Log in.'; // required
            // create email headers
            $headers = 'From: Dashboard Admin \r\n'.

            'Reply-To: '.$email_from."\r\n" .

            'X-Mailer: PHP/' . phpversion();
            $sent = mail($email_to, $email_subject, $email_message, $headers);
            if ($sent)
            {
                 ?>
                    <script>
                        window.location.href = '../index.html#sent';
                    </script>
            
                <?php
            }
            else
            {
                ?>
                    <script>
                        window.location.href = '../index.html#mailerror';
                    </script>
            
                <?php
            }
        }
        else
            {
            ?>
            <script>
                window.location.href = '../index.html#error';
            </script>
            
            <?php
        }
    }
?>

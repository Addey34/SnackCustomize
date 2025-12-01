// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// export const sendVerificationLink = async (
//   email: string,
//   userId: string,
//   token: string,
// ) => {
//   const link = `${process.env.FRONTEND_URL}/verify/${userId}/${token}`;
//   const msg = {
//     to: email,
//     from: 'ton-email-verifie@ton-domaine.com',
//     subject: 'Validez votre compte',
//     text: `Cliquez sur ce lien pour valider votre compte : ${link}`,
//     html: `<p>Cliquez sur ce lien pour valider votre compte : <a href="${link}">${link}</a></p>`,
//   };

//   try {
//     console.log(`Sending verification email to: ${email}`);
//     await sgMail.send(msg);
//     console.log('Verification email sent successfully');
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//   }
// };

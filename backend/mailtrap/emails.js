import {mailtrapClient, sender} from './mailtrap.config.js'
import {PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE} from './emailTemplates.js'

export const sendVerificationEmail = async (email,verificationToken)=>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to:recipient,
            subject:"Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken) ,
            category:"Email Verification"
        })

        console.log("Email sent successfully",response)
    } catch (error) {
        console.error(`Error sending verification email`,error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async(email,name)=>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "54971775-a82b-457c-acd7-07d2a4b9fa16",
            template_variables: {
            "company_info_name": "Auth & Co.",
            "name": name,
            },
        });

        console.log("Welcome Email sent successfully",response);
    } catch (error) {
        console.error(`Error sending welcome email`,error);
        throw new Error(`Error sending welcome email:${error}`);
    }
}

export const sendPasswordResetEmail = async(email,resetURL)=>{
    const recipient =[{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"Password Reset",
        })
    } catch (error) {
        console.error(`Error sending  email`,error);
        throw new Error(`Error sending  email:${error}`);
    }
}

export const sendResetSuccessEmail = async(email)=>{
    const recipient = [{email}];

    try {
        const response  = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset",
        });
    } catch (error) {
        console.error(`Error sending email`,error);
        throw new Error(`Error sending email:${error}`);
    }
}
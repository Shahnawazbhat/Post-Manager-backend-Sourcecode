const registerTemplate = (project_name, otp, user, another_type) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2c3e50;">Welcome to ${project_name}!</h2>
      <p>Hello <strong>${user?.name || "User"}</strong>,</p>

      <p>Thanks for registering on <strong>${project_name}</strong>. To complete your signup, please verify your email using the OTP below:</p>

      <div style="font-size: 24px; font-weight: bold; color: #e74c3c; margin: 20px 0;">${otp}</div>

      <p><strong>Note:</strong> This OTP is valid for 10 minutes. Do not share it with anyone.</p>

      <p>If you didn’t create an account, you can safely ignore this email.</p>

      <br/>
      <p>Regards,<br/>${project_name} Team</p>
    </div>
  `;
};

module.exports = registerTemplate;

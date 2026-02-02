import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = 'terzievdev@gmail.com';

export async function sendContactEmail(data: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  const topicLabels: Record<string, string> = {
    partnership: 'Партньорство',
    donation: 'Дарение',
    events: 'Събития',
    articles: 'Статии и публикации',
    website: 'Въпрос за сайта',
    other: 'Друго'
  };

  const topicLabel = topicLabels[data.topic] || data.topic;

  try {
    const result = await resend.emails.send({
      from: 'NEXT GEN BULGARIA <onboarding@resend.dev>',
      to: RECIPIENT_EMAIL,
      subject: `[Контакт] ${topicLabel} - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #00966E; padding-bottom: 10px;">
            Ново съобщение от сайта
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 120px;">Име:</td>
              <td style="padding: 10px; background: #f5f5f5;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Имейл:</td>
              <td style="padding: 10px;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Тема:</td>
              <td style="padding: 10px; background: #f5f5f5;">${topicLabel}</td>
            </tr>
          </table>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #1a1a2e;">Съобщение:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            Изпратено от контактната форма на nextgenbulgaria.org
          </p>
        </div>
      `
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
}

export async function sendPartnerEmail(data: {
  name: string;
  organization: string;
  email: string;
  partnerType: string;
  message: string;
}) {
  const partnerTypeLabels: Record<string, string> = {
    corporate: 'Корпоративно партньорство',
    ngo: 'НПО / Организация',
    media: 'Медийно партньорство',
    educational: 'Образователна институция',
    other: 'Друго'
  };

  const typeLabel = partnerTypeLabels[data.partnerType] || data.partnerType;

  try {
    const result = await resend.emails.send({
      from: 'NEXT GEN BULGARIA <onboarding@resend.dev>',
      to: RECIPIENT_EMAIL,
      subject: `[Партньорство] ${data.organization} - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #00966E; padding-bottom: 10px;">
            Ново запитване за партньорство
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 150px;">Име:</td>
              <td style="padding: 10px; background: #f5f5f5;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Организация:</td>
              <td style="padding: 10px;">${data.organization}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Имейл:</td>
              <td style="padding: 10px; background: #f5f5f5;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Тип партньорство:</td>
              <td style="padding: 10px;">${typeLabel}</td>
            </tr>
          </table>
          
          ${data.message ? `
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #1a1a2e;">Съобщение:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ''}
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            Изпратено от формата за партньорство на nextgenbulgaria.org
          </p>
        </div>
      `
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending partner email:', error);
    return { success: false, error };
  }
}

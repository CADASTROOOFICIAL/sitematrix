import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

/**
 * Envia um email através da API Manus Forge
 * Suporta envio de emails para usuários e leads
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service URL is not configured.",
    });
  }

  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service API key is not configured.",
    });
  }

  const endpoint = new URL(
    "webdevtoken.v1.WebDevService/SendEmail",
    ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`
  ).toString();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email to ${payload.to} (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    console.log(`[Email] Email enviado com sucesso para ${payload.to}`);
    return true;
  } catch (error) {
    console.warn("[Email] Error calling email service:", error);
    return false;
  }
}

/**
 * Template de email de obrigado para leads
 */
export function generateThankYouEmailHTML(name: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obrigado por se cadastrar - Matrix 360</title>
    <style>
        body {
            font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #f04923 0%, #ff6b4a 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .content {
            padding: 40px 30px;
        }
        .content h2 {
            color: #f04923;
            font-size: 22px;
            margin-top: 0;
        }
        .content p {
            margin: 15px 0;
            color: #555;
        }
        .cta-button {
            display: inline-block;
            background-color: #f04923;
            color: white;
            padding: 14px 32px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
        }
        .cta-button:hover {
            background-color: #d63d1a;
        }
        .benefits {
            background-color: #f7f7f7;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .benefits h3 {
            color: #f04923;
            margin-top: 0;
        }
        .benefits ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .benefits li {
            margin: 8px 0;
            color: #555;
        }
        .footer {
            background-color: #f7f7f7;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #999;
        }
        .social-links {
            margin: 15px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #f04923;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Bem-vindo à Matrix 360!</h1>
        </div>
        
        <div class="content">
            <h2>Obrigado por se cadastrar, ${name}!</h2>
            
            <p>Ficamos felizes em receber seu cadastro! Você acaba de dar o primeiro passo para transformar sua vida através da energia solar renovável.</p>
            
            <div class="benefits">
                <h3>Por que escolher Matrix 360?</h3>
                <ul>
                    <li>✅ Energia renovável, mais barata e sem investimento</li>
                    <li>✅ Múltiplas oportunidades de renda</li>
                    <li>✅ Suporte completo de consultores experientes</li>
                    <li>✅ Plataforma digital intuitiva e segura</li>
                </ul>
            </div>
            
            <p><strong>Próximos passos:</strong></p>
            <p>Um de nossos consultores entrará em contato com você em breve via WhatsApp para apresentar as melhores oportunidades para seu perfil.</p>
            
            <p>Enquanto isso, você pode:</p>
            <ul>
                <li>Explorar nossa plataforma</li>
                <li>Conhecer os planos de carreira</li>
                <li>Entender como você pode ganhar</li>
            </ul>
            
            <center>
                <a href="https://wa.me/5547997442391" class="cta-button">Conversar com um Consultor</a>
            </center>
            
            <p>Se tiver dúvidas, não hesite em nos contatar via WhatsApp. Estamos aqui para ajudar!</p>
        </div>
        
        <div class="footer">
            <p><strong>Matrix 360 - Energia que Transforma</strong></p>
            <p>Transformando vidas através da energia solar renovável</p>
            
            <div class="social-links">
                <a href="https://www.instagram.com/consultormatrix360/">Instagram</a>
                <a href="https://www.facebook.com/profile.php?id=61589870593045">Facebook</a>
                <a href="https://wa.me/5547997442391">WhatsApp</a>
            </div>
            
            <p>© 2026 consultormatrix360 - Consultor Independente. Todos os direitos reservados.</p>
            <p>Este é um email automático. Por favor, não responda este email.</p>
        </div>
    </div>
</body>
</html>
  `;
}

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { limparMarkdown } from "./Markdown";

export async function PDF(titulo: string, resposta: string) {
  try {
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background-color: #fdfdfd;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #2563EB;
              margin-bottom: 30px;
              font-size: 24px;
            }
            p {
              line-height: 1.6;
              font-size: 15px;
              margin: 8px 0;
              white-space: pre-wrap;
            }
            .box {
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 10px;
              padding: 20px;
              margin-bottom: 20px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.08);
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              margin-top: 40px;
            }
          </style>
        </head>
        <body>
          <h1>${titulo}</h1>
          <div class="box">
            <p>${limparMarkdown(resposta)}</p>
          </div>
          <div class="footer">
            Gerado automaticamente com IA ✨
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  } catch {
    Alert.alert("Erro", "Não foi possível gerar o PDF.");
  }
}

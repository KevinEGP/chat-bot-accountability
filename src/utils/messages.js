export const messages = {
  success: (parsed) => `✅ Información guardada!
Tipo: ${parsed.action}
Cliente: ${parsed.client}
Caso: ${parsed.identifier || 'General'}
Valor: ${parsed.amount.toLocaleString("es-CO")}`,

  parseError: "❌ Error al procesar el mensaje. Por favor, intenta de nuevo.",

  aiPrompt: (text) => `
You are an assistant that MUST respond ONLY with a single valid JSON object, no extra text.
Extract these fields if present: action (Deuda|Abono) Deuda is related to "Entregar or Llevar" | Abono is related to "Pagar or Abonar",
client (string or null), identifier (number or null) is related to "Caso, Modelo o Protesis", amount (number or null).

Input message:
"""${text}"""
  
Return JSON like:
{"action":"Deuda","client":"Ana","identifier":"1234","amount":25000}
`,

spreadsheetId: "1uUN2DVC3YMBfuZt-iLaQFQO-WXrU8GDmsxmj4G3x7qE",
};

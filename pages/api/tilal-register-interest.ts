import type { NextApiRequest, NextApiResponse } from "next";

function escapeHtml(s: string) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailBody(payload: any) {
  const rows = [
    ["Project", payload.projectName],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Mobile", payload.mobile],
    ["Telephone", payload.telephone],
    ["Nationality", payload.nationality],
    ["Address", payload.address],
    ["Passport/EID URL", payload.passportOrEidCopy],
    ["Preferred Configuration", payload.preferredConfiguration],
    ["Built-up Area", payload.builtUpAreaPreference],
    ["Purpose of Purchase", payload.purposeOfPurchase],
    ["EOI Amount (AED)", payload.eoiAmountAed],
    ["Budget Range (AED)", payload.budgetRangeAed],
    ["Submission Time", new Date().toLocaleString()],
  ];

  const tableRows = rows
    .filter(([, v]) => v && String(v).trim() !== "")
    .map(
      ([k, v]) => `
      <tr>
        <th style="text-align:left;padding:8px;background:#eee;border-bottom:1px solid #ddd;">${escapeHtml(
          k
        )}</th>
        <td style="padding:8px;border-bottom:1px solid #ddd;">
          ${
            k === "Passport/EID URL"
              ? `<a href="${escapeHtml(v)}" target="_blank" rel="noreferrer">${escapeHtml(v)}</a>`
              : escapeHtml(v)
          }
        </td>
      </tr>
    `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head></head>
  <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
    <div style="max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:#111;color:#fff;padding:18px;text-align:center;border-radius:12px;">
        <h3 style="margin:0;">New Tilal Binghatti EOI Submission</h3>
        <p style="margin:6px 0 0;">Arosa Real Estate</p>
      </div>

      <div style="padding:16px;background:#f9f9f9;margin-top:12px;border-radius:12px;">
        <p style="margin-top:0;">You've received a new Register Interest submission:</p>
        <table style="width:100%;border-collapse:collapse;margin-top:10px;">
          ${tableRows}
        </table>
      </div>

      <div style="padding:10px;text-align:center;font-size:12px;color:#777;margin-top:10px;">
        © ${new Date().getFullYear()} ArosA Real Estate. All rights reserved.
      </div>
    </div>
  </body>
  </html>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const payload = req.body;

    // 1) Submit to Tilal API
    const submitResp = await fetch(
      "https://payment.aimcongress.com/api/Website/ArosaRegisterInterestTilalBinghatti",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const submitText = await submitResp.text();
    let submitJson: any;
    try {
      submitJson = JSON.parse(submitText);
    } catch {
      submitJson = { raw: submitText };
    }

    if (!submitResp.ok) {
      return res.status(submitResp.status).json({
        message: "Tilal submission failed",
        details: submitJson,
      });
    }

    // 2) Send Email only if success
    const sender_email = "notification@arosarealestate.com";
    const email_to = "camilla@arosarealestate.com"; // change if needed
    const subject = "New Tilal Binghatti Register Interest Submission";
    const body = buildEmailBody(payload);

    const emailResp = await fetch("https://payment.aimcongress.com/api/Generic/SendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_email, email_to, subject, body }),
    });

    const emailText = await emailResp.text();
    let emailJson: any;
    try {
      emailJson = JSON.parse(emailText);
    } catch {
      emailJson = { raw: emailText };
    }

    if (!emailResp.ok) {
      // submission succeeded but email failed
      return res.status(200).json({
        message: "Submitted successfully but email failed",
        submit: submitJson,
        email: emailJson,
      });
    }

    // success both
    return res.status(200).json({
      message: "Submitted successfully and email sent",
      submit: submitJson,
      email: emailJson,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: String(err?.message || err) });
  }
}
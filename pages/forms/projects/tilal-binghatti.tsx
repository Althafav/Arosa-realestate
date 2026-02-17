import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";

const PROJECT_NAME = "Tilal Binghatti";

const CONFIG_OPTIONS = [
  "3 Bedroom plus maid",
  "4 Bedroom plus maid",
  "5 Bedroom Villa",
  "Corner Unit",
  "Single Row",
];

const PURPOSE_OPTIONS = [
  "End User",
  "Investment",
  "Holiday Home",
  "Portfolio Diversification",
];

export default function EoiPage() {
  const [data, setData] = useState<any>({
    name: "",
    address: "",
    telephone: "",
    mobile: "",
    email: "",
    nationality: "",
    passportOrEidCopyFile: null,
    preferredConfiguration: [],
    builtUpAreaPreference: "",
    purposeOfPurchase: [],
    eoiAmountAed: "",
    budgetRangeAed: "",
  });

  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: string, value: any) =>
    setData((p: any) => ({ ...p, [key]: value }));

  const toggleArray = (key: string, value: string) =>
    setData((p: any) => {
      const exists = p[key].includes(value);
      return {
        ...p,
        [key]: exists
          ? p[key].filter((v: string) => v !== value)
          : [...p[key], value],
      };
    });

  const uploadAsset = async (file: File) => {
    const fileData = new FormData();
    fileData.append("file", file);

    const resp = await fetch(
      "https://media.aimcongress.com/api/Upload/Asset?foldername=Arosa Tilal Binghatti",
      { method: "POST", body: fileData },
    );

    if (!resp.ok) throw new Error("Upload failed");

    const uploadJson = await resp.json();
    return uploadJson.FileUrl || "";
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitted(false);
    if (!declarationAccepted || loading) return;

    try {
      setLoading(true);

      // 1) upload file -> get url
      let fileUrl = "";
      if (data.passportOrEidCopyFile) {
        fileUrl = await uploadAsset(data.passportOrEidCopyFile);
      }

      // 2) string-only payload (no declaration)
      const payload = {
        projectName: PROJECT_NAME,
        name: String(data.name || ""),
        address: String(data.address || ""),
        telephone: String(data.telephone || ""),
        mobile: String(data.mobile || ""),
        email: String(data.email || ""),
        nationality: String(data.nationality || ""),
        passportOrEidCopy: String(fileUrl || ""),
        preferredConfiguration: String(
          (data.preferredConfiguration || []).join(", "),
        ),
        builtUpAreaPreference: String(data.builtUpAreaPreference || ""),
        purposeOfPurchase: String((data.purposeOfPurchase || []).join(", ")),
        eoiAmountAed: String(data.eoiAmountAed || ""),
        budgetRangeAed: String(data.budgetRangeAed || ""),
      };

      console.log("FINAL PAYLOAD =>", payload);

      // Next: send to your API
      const resp = await fetch("/api/tilal-register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await resp.json();

      if (!resp.ok) {
        console.error("API Error:", result);
        alert(result?.message || "Submit failed");
        return;
      }

      setSubmitted(true);
      // reset form
    } catch (err) {
      console.error("Submit error:", err);
      alert("Upload/Submit failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);

  return (
    <div className="min-h-screen bg-white py-6">
      <div>
        {submitted ? (
          <div className="mx-auto max-w-2xl p-5 rounded-3xl border border-zinc-200 text-center">
            <p className="prose max-w-none">
              Thank you for your submission. We appreciate your interest and
              will be in touch shortly to assist you further.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 p-8">
            <h1 className="text-center text-2xl font-semibold text-zinc-900">
              Register Interest Form
            </h1>
            <p className="text-center text-zinc-600">{PROJECT_NAME}</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-8">
              {/* Client Info */}
              <section className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Name"
                    value={data.name}
                    onChange={(v: any) => setField("name", v)}
                  />
                  <Input
                    label="Nationality"
                    value={data.nationality}
                    onChange={(v: any) => setField("nationality", v)}
                  />
                  <Input
                    label="Telephone"
                    value={data.telephone}
                    onChange={(v: any) => setField("telephone", v)}
                  />
                  <Input
                    label="Mobile No"
                    value={data.mobile}
                    onChange={(v: any) => setField("mobile", v)}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(v: any) => setField("email", v)}
                  />

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-zinc-700">
                      Address
                    </label>
                    <textarea
                      value={data.address}
                      onChange={(e) => setField("address", e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-900"
                      rows={3}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-zinc-700">
                      Passport or EID Copy
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        setField(
                          "passportOrEidCopyFile",
                          e.target.files?.[0] || null,
                        )
                      }
                      className="block w-full text-sm text-zinc-700 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-2 file:text-sm file:text-white"
                    />
                    {data.passportOrEidCopyFile ? (
                      <p className="mt-1 text-xs text-zinc-500">
                        Selected: {data.passportOrEidCopyFile?.name}
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              {/* Preferred Configuration */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Preferred Configuration
                </h2>

                <div className="grid gap-2 sm:grid-cols-2">
                  {CONFIG_OPTIONS.map((opt) => (
                    <Check
                      key={opt}
                      label={opt}
                      checked={data.preferredConfiguration.includes(opt)}
                      onChange={() =>
                        toggleArray("preferredConfiguration", opt)
                      }
                    />
                  ))}
                </div>

                <Input
                  label="Built-Up Area Preference (Approx.)"
                  value={data.builtUpAreaPreference}
                  onChange={(v: any) => setField("builtUpAreaPreference", v)}
                  placeholder="2200sqft-3100sqft"
                />
              </section>

              {/* Purpose */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Purpose of Purchase
                </h2>

                <div className="grid gap-2 sm:grid-cols-2">
                  {PURPOSE_OPTIONS.map((opt) => (
                    <Check
                      key={opt}
                      label={opt}
                      checked={data.purposeOfPurchase.includes(opt)}
                      onChange={() => toggleArray("purposeOfPurchase", opt)}
                    />
                  ))}
                </div>
              </section>

              {/* Financial */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Financial Details
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="EOI Amount (AED)"
                    value={data.eoiAmountAed}
                    onChange={(v: any) => setField("eoiAmountAed", v)}
                    placeholder="50000"
                  />
                  <Input
                    label="Budget Range (AED)"
                    value={data.budgetRangeAed}
                    onChange={(v: any) => setField("budgetRangeAed", v)}
                    placeholder="1,500,000 - 2,200,000"
                  />
                </div>
              </section>

              {/* Declaration */}
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Declaration
                </h2>
                <p className="text-sm text-zinc-600">
                  I hereby confirm my formal Expression of Interest in reserving
                  a townhouse unit in the above-mentioned project. Allocation is
                  subject to availability, developer approval, and booking
                  procedures. This EOI is not a final sale agreement until the
                  SPA is executed.
                </p>

                <label className="flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={declarationAccepted}
                    onChange={(e) => setDeclarationAccepted(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  />
                  I agree and confirm the declaration.
                </label>
              </section>

              <button
                type="submit"
                disabled={!declarationAccepted || loading}
                className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Input(props: any) {
  const { label, value, onChange, type = "text", placeholder } = props;

  return (
    <div>
      <label className="mb-1 block text-sm text-zinc-700">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-900"
        required
      />
    </div>
  );
}

function Check(props: any) {
  const { label, checked, onChange } = props;

  return (
    <label className="flex items-center gap-2 text-sm text-zinc-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
      />
      {label}
    </label>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, CalendarCheck, Phone } from "lucide-react";

/**
 * Google Forms wiring
 * -------------------
 * 1. Create a Google Form with one question per field below.
 * 2. In Google Forms: three-dot menu → "Get pre-filled link" → fill each field → copy the link.
 * 3. The link looks like:
 *    https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url&entry.111111111=Name&entry.222222222=Phone...
 * 4. Paste <FORM_ID> into GOOGLE_FORM_ID and each entry.XXXXXXXXX number into FIELD_IDS.
 */
const GOOGLE_FORM_ID = "PASTE_YOUR_GOOGLE_FORM_ID_HERE";
const FIELD_IDS = {
  name: "entry.000000001",
  phone: "entry.000000002",
  email: "entry.000000003",
  address: "entry.000000004",
  binTypes: "entry.000000005",
  binCount: "entry.000000006",
  preferredTime: "entry.000000007",
  frequency: "entry.000000008",
  accessInstructions: "entry.000000009",
  photoPermission: "entry.000000010",
  notes: "entry.000000011",
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  binTypes: string[];
  binCount: string;
  preferredTime: string;
  frequency: string;
  accessInstructions: string;
  photoPermission: boolean;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  binTypes: [],
  binCount: "1",
  preferredTime: "",
  frequency: "one-time",
  accessInstructions: "",
  photoPermission: false,
  notes: "",
};

const binTypeOptions = ["Trash", "Recycling", "Compost"];
const frequencyOptions = [
  { value: "one-time", label: "One-time clean" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
const errorClass = "mt-1 text-sm text-red-600";

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleBinType = (type: string) => {
    set(
      "binTypes",
      form.binTypes.includes(type)
        ? form.binTypes.filter((t) => t !== type)
        : [...form.binTypes, type]
    );
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.phone.trim()) next.phone = "Please enter your phone number";
    else if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address";
    if (!form.address.trim()) next.address = "Please enter your service address";
    if (form.binTypes.length === 0) next.binTypes = "Select at least one bin type";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const body = new URLSearchParams();
    body.append(FIELD_IDS.name, form.name.trim());
    body.append(FIELD_IDS.phone, form.phone.trim());
    body.append(FIELD_IDS.email, form.email.trim());
    body.append(FIELD_IDS.address, form.address.trim());
    body.append(FIELD_IDS.binTypes, form.binTypes.join(", "));
    body.append(FIELD_IDS.binCount, form.binCount);
    body.append(FIELD_IDS.preferredTime, form.preferredTime.trim());
    body.append(FIELD_IDS.frequency, form.frequency);
    body.append(FIELD_IDS.accessInstructions, form.accessInstructions.trim());
    body.append(FIELD_IDS.photoPermission, form.photoPermission ? "Yes" : "No");
    body.append(FIELD_IDS.notes, form.notes.trim());

    try {
      // Google Forms accepts cross-origin POSTs; no-cors returns an opaque response on success.
      await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl ring-1 ring-border sm:p-12">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime/15 text-lime">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-foreground">Booking request received!</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thanks, we'll confirm your cleaning within 24 hours. Need us sooner? Call or text{" "}
          <a href="tel:+17149123682" className="font-semibold text-primary hover:underline">
            (714) 912-3682
          </a>
          .
        </p>
        <Button
          variant="outline"
          className="mt-6 border-navy/20"
          onClick={() => setStatus("idle")}
        >
          Book another cleaning
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-xl ring-1 ring-border sm:p-10"
    >
      {/* Contact + address */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className={labelClass}>
            Full name <span className="text-red-600">*</span>
          </label>
          <input
            id="bk-name"
            type="text"
            className={inputClass}
            placeholder="Jordan Rivera"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            maxLength={100}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bk-phone" className={labelClass}>
            Phone number <span className="text-red-600">*</span>
          </label>
          <input
            id="bk-phone"
            type="tel"
            className={inputClass}
            placeholder="(206) 555-0123"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            maxLength={20}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="bk-email" className={labelClass}>
            Email <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="bk-email"
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            maxLength={255}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="bk-address" className={labelClass}>
            Service address <span className="text-red-600">*</span>
          </label>
          <input
            id="bk-address"
            type="text"
            className={inputClass}
            placeholder="Street address in Maple Leaf"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            maxLength={200}
          />
          {errors.address && <p className={errorClass}>{errors.address}</p>}
        </div>
      </div>

      {/* Bin types + count */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <span className={labelClass}>
            Which bins should we clean? <span className="text-red-600">*</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {binTypeOptions.map((type) => {
              const active = form.binTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleBinType(type)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
          {errors.binTypes && <p className={errorClass}>{errors.binTypes}</p>}
        </div>
        <div>
          <label htmlFor="bk-bincount" className={labelClass}>
            How many bins?
          </label>
          <select
            id="bk-bincount"
            className={inputClass}
            value={form.binCount}
            onChange={(e) => set("binCount", e.target.value)}
          >
            {["1", "2", "3", "4", "5+"].map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "bin" : "bins"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule + frequency */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-time" className={labelClass}>
            Preferred date &amp; time window
          </label>
          <input
            id="bk-time"
            type="text"
            className={inputClass}
            placeholder="e.g. Saturday morning, or any weekday after 3pm"
            value={form.preferredTime}
            onChange={(e) => set("preferredTime", e.target.value)}
            maxLength={200}
          />
        </div>
        <div>
          <span className={labelClass}>How often?</span>
          <div className="flex flex-wrap gap-2">
            {frequencyOptions.map((opt) => {
              const active = form.frequency === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set("frequency", opt.value)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Access instructions */}
      <div className="mt-6">
        <label htmlFor="bk-access" className={labelClass}>
          Where will your bins be on cleaning day?
        </label>
        <textarea
          id="bk-access"
          className={`${inputClass} min-h-[80px] resize-y`}
          placeholder="e.g. Curbside by the driveway, side gate unlocked, alley behind the garage..."
          value={form.accessInstructions}
          onChange={(e) => set("accessInstructions", e.target.value)}
          maxLength={1000}
        />
      </div>

      {/* Notes */}
      <div className="mt-6">
        <label htmlFor="bk-notes" className={labelClass}>
          Anything else we should know? <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <textarea
          id="bk-notes"
          className={`${inputClass} min-h-[80px] resize-y`}
          placeholder="Gate codes, pets, extra-stinky situations..."
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          maxLength={1000}
        />
      </div>

      {/* Photo permission */}
      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4">
        <input
          type="checkbox"
          className="mt-0.5 h-5 w-5 rounded border-border accent-primary"
          checked={form.photoPermission}
          onChange={(e) => set("photoPermission", e.target.checked)}
        />
        <span className="text-sm text-foreground">
          <span className="font-medium">Before &amp; after photos:</span> It's OK for Luna Clean to
          post photos of my sparkling bins on Facebook and social media. No address or personal
          info shown.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong sending your request. Please try again, or call us at{" "}
          <a href="tel:+17149123682" className="font-semibold underline">
            (714) 912-3682
          </a>
          .
        </p>
      )}

      <div className="mt-8">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full bg-primary px-8 text-primary-foreground hover:bg-primary/90 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <CalendarCheck className="mr-2 h-5 w-5" />
              Book My Cleaning
            </>
          )}
        </Button>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          Prefer to talk? Call or text (714) 912-3682
        </p>
      </div>
    </form>
  );
}

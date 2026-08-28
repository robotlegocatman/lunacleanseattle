import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, CalendarCheck, Phone } from "lucide-react";

/**
 * Google Forms wiring for "Luna Clean — Booking Request"
 * Field IDs read from the form's pre-filled link.
 */
const GOOGLE_FORM_ID = "1FAIpQLSc-k2aTgvMh8YIRwP96Ce3NVqzvMYyEGyQM7x3uZOgYMRVjuw";
const FIELD_IDS = {
  name: "entry.883419355",
  address: "entry.1319302915",
  phone: "entry.1545097604",
  binCount: "entry.924065852",
  binTypes: "entry.1398284407",
  timeWindow: "entry.167946491",
  binLocation: "entry.635595180",
  photoPermission: "entry.1850185537",
};

type FormState = {
  name: string;
  address: string;
  phone: string;
  binCount: string;
  binTypes: string[];
  timeWindow: string;
  binLocation: string;
  binLocationOther: string;
  photoPermission: string;
};

const initialForm: FormState = {
  name: "",
  address: "",
  phone: "",
  binCount: "1",
  binTypes: [],
  timeWindow: "Anytime",
  binLocation: "Curbside",
  binLocationOther: "",
  photoPermission: "No",
};

// These strings must match the Google Form options exactly.
const binCountOptions = ["1", "2", "3+"];
const binTypeOptions = ["Garbage bin(s)", "Recycling bin", "Yard waste/food waste"];
const timeWindowOptions = ["Morning", "Afternoon", "Anytime"];
const binLocationOptions = ["Curbside", "Side of house", "Backyard"];
const photoOptions = ["Yes", "No"];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
const errorClass = "mt-1 text-sm text-red-600";

function PillGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-accent"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string | undefined>>>({});
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

  const selectLocation = (loc: string) => {
    setForm((f) => ({ ...f, binLocation: loc, binLocationOther: loc === "Other" ? f.binLocationOther : "" }));
    setErrors((e) => ({ ...e, binLocation: undefined, binLocationOther: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.address.trim()) next.address = "Please enter your street address";
    if (!form.phone.trim()) next.phone = "Please enter your phone number";
    else if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number";
    if (form.binTypes.length === 0) next.binTypes = "Select at least one bin";
    if (form.binLocation === "Other" && !form.binLocationOther.trim())
      next.binLocationOther = "Please tell us where the bins will be";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const body = new URLSearchParams();
    body.append(FIELD_IDS.name, form.name.trim());
    body.append(FIELD_IDS.address, form.address.trim());
    body.append(FIELD_IDS.phone, form.phone.trim());
    body.append(FIELD_IDS.binCount, form.binCount);
    for (const type of form.binTypes) body.append(FIELD_IDS.binTypes, type);
    body.append(FIELD_IDS.timeWindow, form.timeWindow);
    if (form.binLocation === "Other") {
      body.append(FIELD_IDS.binLocation, "__other_option__");
      body.append(`${FIELD_IDS.binLocation}.other_option_response`, form.binLocationOther.trim());
    } else {
      body.append(FIELD_IDS.binLocation, form.binLocation);
    }
    body.append(FIELD_IDS.photoPermission, form.photoPermission);

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
            Name <span className="text-red-600">*</span>
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
            Best phone number for scheduling <span className="text-red-600">*</span>
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
        <div className="sm:col-span-2">
          <label htmlFor="bk-address" className={labelClass}>
            Street address <span className="text-red-600">*</span>{" "}
            <span className="text-muted-foreground font-normal">(house number and street name — Maple Leaf area only)</span>
          </label>
          <input
            id="bk-address"
            type="text"
            className={inputClass}
            placeholder="1234 NE 88th St"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            maxLength={200}
          />
          {errors.address && <p className={errorClass}>{errors.address}</p>}
        </div>
      </div>

      {/* Bins */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <span className={labelClass}>
            Which bins do you want cleaned? <span className="text-red-600">*</span>
          </span>
          <PillGroup options={binTypeOptions} selected={form.binTypes} onToggle={toggleBinType} />
          {errors.binTypes && <p className={errorClass}>{errors.binTypes}</p>}
        </div>
        <div>
          <span className={labelClass}>How many bins would you like cleaned?</span>
          <PillGroup
            options={binCountOptions}
            selected={[form.binCount]}
            onToggle={(v) => set("binCount", v)}
          />
        </div>
      </div>

      {/* Schedule + location */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <span className={labelClass}>Preferred time window</span>
          <PillGroup
            options={timeWindowOptions}
            selected={[form.timeWindow]}
            onToggle={(v) => set("timeWindow", v)}
          />
        </div>
        <div>
          <span className={labelClass}>Where will your bins be located on cleaning day?</span>
          <PillGroup
            options={[...binLocationOptions, "Other"]}
            selected={[form.binLocation]}
            onToggle={selectLocation}
          />
          {form.binLocation === "Other" && (
            <>
              <input
                type="text"
                className={`${inputClass} mt-3`}
                placeholder="Tell us where the bins will be"
                value={form.binLocationOther}
                onChange={(e) => set("binLocationOther", e.target.value)}
                maxLength={200}
              />
              {errors.binLocationOther && <p className={errorClass}>{errors.binLocationOther}</p>}
            </>
          )}
        </div>
      </div>

      {/* Photo permission */}
      <div className="mt-6">
        <span className={labelClass}>
          Permission to post before/after photos on our Facebook page &amp; social media?
        </span>
        <PillGroup
          options={photoOptions}
          selected={[form.photoPermission]}
          onToggle={(v) => set("photoPermission", v)}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Photos show your sparkling bins only — never your address or personal info.
        </p>
      </div>

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

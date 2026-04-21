import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Phone, Globe, ArrowRight } from "lucide-react";

export const accountSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().min(1, "Country is required").max(80),
  region: z.string().trim().max(120).optional().or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type AccountFormValues = z.infer<typeof accountSchema>;

interface AccountFormProps {
  defaultValues?: Partial<AccountFormValues>;
  onSubmit: (values: AccountFormValues) => void | Promise<void>;
  loading: boolean;
  submitLabel?: string;
}

export const AccountForm = ({
  defaultValues,
  onSubmit,
  loading,
  submitLabel = "Create Account",
}: AccountFormProps) => {
  const [values, setValues] = useState<AccountFormValues>({
    firstName: defaultValues?.firstName ?? "",
    lastName: defaultValues?.lastName ?? "",
    email: defaultValues?.email ?? "",
    phone: defaultValues?.phone ?? "",
    country: defaultValues?.country ?? "",
    region: defaultValues?.region ?? "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AccountFormValues, string>>>({});

  const handleChange = (field: keyof AccountFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = accountSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AccountFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof AccountFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    await onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="firstName" value={values.firstName} onChange={handleChange("firstName")} className="pl-10" placeholder="Jane" />
          </div>
          {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="lastName" value={values.lastName} onChange={handleChange("lastName")} className="pl-10" placeholder="Doe" />
          </div>
          {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input id="email" type="email" value={values.email} onChange={handleChange("email")} className="pl-10" placeholder="you@example.com" />
        </div>
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input id="phone" type="tel" value={values.phone} onChange={handleChange("phone")} className="pl-10" placeholder="+234..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="country">Country</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="country" value={values.country} onChange={handleChange("country")} className="pl-10" placeholder="Nigeria" />
          </div>
          {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="region">Region / State <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input id="region" value={values.region} onChange={handleChange("region")} placeholder="Lagos" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="password" type="password" value={values.password} onChange={handleChange("password")} className="pl-10" placeholder="At least 8 characters" />
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange("confirmPassword")} className="pl-10" placeholder="Repeat password" />
          </div>
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : submitLabel}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
};

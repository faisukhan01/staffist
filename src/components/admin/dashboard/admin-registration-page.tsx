"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  CheckCircle2,
  Heart,
  Building2,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText,
  GraduationCap,
  Stethoscope,
  UserPlus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Step configuration                                                 */
/* ------------------------------------------------------------------ */

interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
}

const steps: StepConfig[] = [
  { id: 1, title: "Registration", subtitle: "Basic details" },
  { id: 2, title: "Verification", subtitle: "Document upload" },
  { id: 3, title: "Approval", subtitle: "Final review" },
];

/* ------------------------------------------------------------------ */
/*  Document config                                                    */
/* ------------------------------------------------------------------ */

interface DocumentConfig {
  key: string;
  label: string;
  icon: React.ElementType;
  uploadedFileName: string;
}

const documentConfigs: DocumentConfig[] = [
  {
    key: "dbs",
    label: "DBS Certificate",
    icon: Shield,
    uploadedFileName: "DBS_Certificate.pdf",
  },
  {
    key: "rightToWork",
    label: "Right to Work",
    icon: FileText,
    uploadedFileName: "RightToWork_Document.pdf",
  },
  {
    key: "registration",
    label: "Professional Registration / NMC/GMC",
    icon: GraduationCap,
    uploadedFileName: "NMC_Registration.pdf",
  },
];

/* ------------------------------------------------------------------ */
/*  Upload zone (reusable)                                             */
/* ------------------------------------------------------------------ */

function UploadZone({
  doc,
  isUploaded,
  onUpload,
}: {
  doc: DocumentConfig;
  isUploaded: boolean;
  onUpload: () => void;
}) {
  const Icon = doc.icon;

  if (isUploaded) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-emerald-700">
            {doc.uploadedFileName}
          </p>
          <p className="text-[12px] text-emerald-600">Uploaded successfully</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 text-[12px] text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100"
          onClick={onUpload}
        >
          Replace
        </Button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onUpload}
      className="group flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-6 transition-all hover:border-[#2563EB]/40 hover:bg-blue-50/40"
    >
      <div className="rounded-lg bg-blue-50 p-2.5 transition-colors group-hover:bg-blue-100">
        <Upload className="h-5 w-5 text-[#2563EB]" />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-medium text-foreground">
          Drop file or click to upload
        </p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          PDF, JPG, PNG (max 10MB)
        </p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Step indicator                                                     */
/* ------------------------------------------------------------------ */

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center px-4">
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            {/* Step circle + labels */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm shadow-blue-200"
                    : isCompleted
                      ? "bg-[#2563EB] text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4.5 w-4.5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`mt-1.5 text-[13px] font-medium ${
                  isActive || isCompleted
                    ? "text-[#2563EB]"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
              <span className="text-[12px] text-muted-foreground">
                {step.subtitle}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div className="mx-3 mt-[-18px] h-0.5 w-16 sm:w-24 md:w-32">
                <div
                  className={`h-full rounded-full transition-colors ${
                    step.id < currentStep
                      ? "bg-[#2563EB]"
                      : "bg-border"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function AdminRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Record<string, boolean>>({
    dbs: false,
    rightToWork: false,
    registration: false,
  });

  /* -- helpers -- */

  const handleDocUpload = (key: string) => {
    setDocuments((prev) => ({ ...prev, [key]: true }));
  };

  const uploadedCount = Object.values(documents).filter(Boolean).length;

  const goToNext = () => setCurrentStep((s) => Math.min(3, s + 1));
  const goToPrev = () => setCurrentStep((s) => Math.max(1, s - 1));

  /* ---------------------------------------------------------------- */

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* ---- Page Header ---- */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          Registration
        </h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Onboard new healthcare professionals to the platform
        </p>
      </div>

      {/* ---- Step Indicator ---- */}
      <StepIndicator currentStep={currentStep} />

      {/* ---- Step Content ---- */}
      <div className="mx-auto max-w-4xl">
        {/* ================== STEP 1 ================== */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {/* Role Selection */}
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-[14px] font-semibold">
                  Select Your Role
                </CardTitle>
                <CardDescription className="text-[12px]">
                  Choose the account type that best describes you
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Healthcare Provider */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole("provider")}
                    className={`group flex items-start gap-4 rounded-lg border-2 p-5 text-left transition-all ${
                      selectedRole === "provider"
                        ? "border-[#2563EB] bg-blue-50"
                        : "border-border hover:border-[#2563EB]/30 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2.5 transition-colors ${
                        selectedRole === "provider"
                          ? "bg-blue-100 text-[#2563EB]"
                          : "bg-muted text-muted-foreground group-hover:bg-blue-50 group-hover:text-[#2563EB]"
                      }`}
                    >
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-foreground">
                        Healthcare Provider
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                        NHS Trusts, private hospitals, care homes, and
                        healthcare institutions
                      </p>
                    </div>
                  </button>

                  {/* Healthcare Professional */}
                  <button
                    type="button"
                    onClick={() => setSelectedRole("professional")}
                    className={`group flex items-start gap-4 rounded-lg border-2 p-5 text-left transition-all ${
                      selectedRole === "professional"
                        ? "border-[#2563EB] bg-blue-50"
                        : "border-border hover:border-[#2563EB]/30 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2.5 transition-colors ${
                        selectedRole === "professional"
                          ? "bg-blue-100 text-[#2563EB]"
                          : "bg-muted text-muted-foreground group-hover:bg-blue-50 group-hover:text-[#2563EB]"
                      }`}
                    >
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-foreground">
                        Healthcare Professional
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                        Doctors, nurses, allied health professionals, and
                        support staff
                      </p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-[14px] font-semibold">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-[12px]">
                  Enter your contact and identification details
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">Full Name</Label>
                    <Input
                      placeholder="Enter your full name"
                      className="h-9 text-[13px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="h-9 text-[13px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      Phone Number
                    </Label>
                    <Input
                      placeholder="+44 7XXX XXXXXX"
                      className="h-9 text-[13px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">Postcode</Label>
                    <Input
                      placeholder="SW1A 1AA"
                      className="h-9 text-[13px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Qualifications & Experience */}
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-[14px] font-semibold">
                  Qualifications &amp; Experience
                </CardTitle>
                <CardDescription className="text-[12px]">
                  Tell us about your professional background
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">Primary Role</Label>
                    <Select>
                      <SelectTrigger className="h-9 text-[13px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rn">Registered Nurse</SelectItem>
                        <SelectItem value="hca">
                          Healthcare Assistant
                        </SelectItem>
                        <SelectItem value="physio">Physiotherapist</SelectItem>
                        <SelectItem value="rad">Radiographer</SelectItem>
                        <SelectItem value="ot">
                          Occupational Therapist
                        </SelectItem>
                        <SelectItem value="mhn">Mental Health Nurse</SelectItem>
                        <SelectItem value="doctor">Doctor / Physician</SelectItem>
                        <SelectItem value="midwife">Midwife</SelectItem>
                        <SelectItem value="support">Support Worker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      Years of Experience
                    </Label>
                    <Select>
                      <SelectTrigger className="h-9 text-[13px]">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0 – 1 year</SelectItem>
                        <SelectItem value="2-3">2 – 3 years</SelectItem>
                        <SelectItem value="3-5">3 – 5 years</SelectItem>
                        <SelectItem value="5-10">5 – 10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      Specialization
                    </Label>
                    <Input
                      placeholder="e.g., Emergency Medicine"
                      className="h-9 text-[13px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Proficiency */}
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-[14px] font-semibold">
                  Language Proficiency
                </CardTitle>
                <CardDescription className="text-[12px]">
                  Language and NHS readiness information
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      Primary Language
                    </Label>
                    <Input
                      placeholder="English"
                      defaultValue="English"
                      className="h-9 text-[13px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      English Level
                    </Label>
                    <Select defaultValue="fluent">
                      <SelectTrigger className="h-9 text-[13px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">Native</SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      NHS Readiness Training
                    </Label>
                    <Select defaultValue="completed">
                      <SelectTrigger className="h-9 text-[13px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">
                          In Progress
                        </SelectItem>
                        <SelectItem value="not-started">
                          Not Started
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ================== STEP 2 ================== */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#2563EB]" />
                  <div>
                    <CardTitle className="text-[14px] font-semibold">
                      Compliance Documents
                    </CardTitle>
                    <CardDescription className="text-[12px]">
                      Upload required documents for verification
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-0">
                {documentConfigs.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <div key={doc.key} className="space-y-1.5">
                      <Label className="flex items-center gap-1.5 text-[12px] font-medium">
                        <Icon className="h-3.5 w-3.5 text-[#2563EB]" />
                        {doc.label}
                      </Label>
                      <UploadZone
                        doc={doc}
                        isUploaded={!!documents[doc.key]}
                        onUpload={() => handleDocUpload(doc.key)}
                      />
                    </div>
                  );
                })}

                {/* Registration Expiry Date */}
                <div className="pt-2">
                  <div className="max-w-xs space-y-1.5">
                    <Label className="text-[12px] font-medium">
                      Registration Expiry Date
                    </Label>
                    <Input type="date" className="h-9 text-[13px]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload progress indicator */}
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <UserPlus className="h-4 w-4 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-foreground">
                    Documents uploaded
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    {uploadedCount} of {documentConfigs.length} documents
                    uploaded
                  </p>
                </div>
                <Badge
                  variant={
                    uploadedCount === documentConfigs.length
                      ? "default"
                      : "secondary"
                  }
                  className={
                    uploadedCount === documentConfigs.length
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {uploadedCount === documentConfigs.length
                    ? "All complete"
                    : "In progress"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ================== STEP 3 ================== */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <Card className="border border-border/80 card-elevated rounded-xl bg-card">
              <CardContent className="px-6 py-8 sm:px-8 sm:py-10">
                {/* Icon */}
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-blue-700 shadow-lg shadow-blue-200/50">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Review &amp; Submit
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                    Please review your information before submitting. Our team
                    will verify your documents and get back to you within 48
                    hours.
                  </p>
                </div>

                {/* Summary grid */}
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Role Type */}
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                    <p className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                      Role Type
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-foreground">
                      {selectedRole === "provider"
                        ? "Healthcare Provider"
                        : selectedRole === "professional"
                          ? "Healthcare Professional"
                          : "Not selected"}
                    </p>
                  </div>

                  {/* Documents uploaded */}
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                    <p className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                      Documents Uploaded
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-[13px] font-medium text-foreground">
                        {uploadedCount} of 3
                      </p>
                      {uploadedCount === 3 && (
                        <Badge className="h-5 bg-emerald-600 px-1.5 text-[10px] text-white hover:bg-emerald-700">
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Language Proficiency */}
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                    <p className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                      Language Proficiency
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-foreground">
                      English (Fluent)
                    </p>
                  </div>

                  {/* NHS Training */}
                  <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
                    <p className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                      NHS Training
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-[13px] font-medium text-foreground">
                        Completed
                      </p>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-8 flex justify-center">
                  <Button
                    size="lg"
                    className="h-11 rounded-lg bg-gradient-to-r from-[#2563EB] to-blue-700 px-10 text-[13px] font-semibold text-white shadow-sm shadow-blue-200/50 hover:from-blue-700 hover:to-blue-800"
                  >
                    Submit Registration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* ---- Navigation Buttons ---- */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrev}
          disabled={currentStep === 1}
          className="gap-1.5 text-[13px]"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {currentStep < 3 && (
          <Button
            size="sm"
            onClick={goToNext}
            className="gap-1.5 bg-[#2563EB] text-[13px] text-white hover:bg-blue-700"
          >
            Next Step
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* ---- Ethical Recruitment Notice ---- */}
      <Card className="border border-border/80 card-elevated rounded-xl bg-card">
        <CardContent className="flex items-start gap-3 p-4">
          <Heart className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            No recruitment fees charged to professionals. Fully compliant with
            NHS and ethical recruitment standards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

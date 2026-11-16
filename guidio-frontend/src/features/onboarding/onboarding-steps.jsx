import { ChipInput } from "@/components/common/chip-input";
import { Input } from "@/components/ui/input";
import {
  BRANCH_SUGGESTIONS,
  DEGREE_SUGGESTIONS,
  EDUCATION_OPTIONS,
  EXPERIENCE_OPTIONS,
  INTEREST_SUGGESTIONS,
  LIMITS,
  PROGRAMMING_LANGUAGES,
  ROLE_SUGGESTIONS,
  SKILL_SUGGESTIONS,
} from "@/features/onboarding/onboarding-data";
import { ChoiceGroup } from "@/features/onboarding/choice-group";
import { FormField } from "@/features/onboarding/form-field";

/**
 * Every step receives the same props:
 *   form      the current answers
 *   errors    validation messages keyed by field name
 *   onChange  (field, value) => void
 *   disabled  true while a save is running
 */

function SuggestionButtons({ options, current, onPick, disabled }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = current.trim().toLowerCase() === option.toLowerCase();

        return (
          <li key={option}>
            <button
              type="button"
              onClick={() => onPick(option)}
              disabled={disabled}
              aria-pressed={isActive}
              className="inline-flex items-center rounded-md border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-pressed:border-foreground aria-pressed:text-foreground"
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function BasicsStep({ form, errors, onChange, disabled }) {
  return (
    <div className="space-y-6">
      <FormField
        name="fullName"
        label="Full name"
        error={errors.fullName}
        hint="This is saved to your Guidio AI account."
      >
        {(control) => (
          <Input
            {...control}
            value={form.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            placeholder="Example: Aarav Sharma"
            autoComplete="name"
            disabled={disabled}
            className="h-10"
          />
        )}
      </FormField>

      <FormField name="education" label="Education level" group error={errors.education}>
        {(control) => (
          <ChoiceGroup
            {...control}
            name="education"
            value={form.education}
            onChange={(value) => onChange("education", value)}
            options={EDUCATION_OPTIONS}
            disabled={disabled}
            className="sm:grid-cols-3"
          />
        )}
      </FormField>

      <FormField name="college" label="College or university" error={errors.college}>
        {(control) => (
          <Input
            {...control}
            value={form.college}
            onChange={(event) => onChange("college", event.target.value)}
            placeholder="Example: Arka Jain University"
            autoComplete="organization"
            disabled={disabled}
            className="h-10"
          />
        )}
      </FormField>
    </div>
  );
}

export function AcademicsStep({ form, errors, onChange, disabled }) {
  return (
    <div className="space-y-6">
      <FormField name="degree" label="Degree or course" error={errors.degree}>
        {(control) => (
          <div className="space-y-2">
            <Input
              {...control}
              value={form.degree}
              onChange={(event) => onChange("degree", event.target.value)}
              placeholder="Example: B.Tech"
              autoComplete="off"
              disabled={disabled}
              className="h-10"
            />
            <SuggestionButtons
              options={DEGREE_SUGGESTIONS}
              current={form.degree}
              onPick={(value) => onChange("degree", value)}
              disabled={disabled}
            />
          </div>
        )}
      </FormField>

      <FormField
        name="branch"
        label="Branch or specialization"
        optional
        error={errors.branch}
      >
        {(control) => (
          <div className="space-y-2">
            <Input
              {...control}
              value={form.branch}
              onChange={(event) => onChange("branch", event.target.value)}
              placeholder="Example: Computer Science"
              autoComplete="off"
              disabled={disabled}
              className="h-10"
            />
            <SuggestionButtons
              options={BRANCH_SUGGESTIONS}
              current={form.branch}
              onPick={(value) => onChange("branch", value)}
              disabled={disabled}
            />
          </div>
        )}
      </FormField>

      <FormField
        name="graduationYear"
        label="Graduation year"
        error={errors.graduationYear}
        hint="The year you finish or finished your course."
      >
        {(control) => (
          <Input
            {...control}
            value={form.graduationYear}
            onChange={(event) =>
              onChange("graduationYear", event.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="Example: 2027"
            inputMode="numeric"
            autoComplete="off"
            disabled={disabled}
            className="h-10 sm:max-w-40"
          />
        )}
      </FormField>

      <FormField
        name="experienceLevel"
        label="Experience level"
        group
        error={errors.experienceLevel}
      >
        {(control) => (
          <ChoiceGroup
            {...control}
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={(value) => onChange("experienceLevel", value)}
            options={EXPERIENCE_OPTIONS}
            disabled={disabled}
          />
        )}
      </FormField>
    </div>
  );
}

export function SkillsStep({ form, errors, onChange, disabled }) {
  const total = new Set(
    [...form.skills, ...form.languages].map((item) => item.toLowerCase())
  ).size;

  return (
    <div className="space-y-6">
      <FormField
        name="languages"
        label="Programming languages"
        optional
        hint="Languages you can write code in."
      >
        {(control) => (
          <ChipInput
            {...control}
            value={form.languages}
            onChange={(value) => onChange("languages", value)}
            suggestions={PROGRAMMING_LANGUAGES}
            placeholder="Example: Python"
            maxItems={Math.max(form.languages.length, LIMITS.maxSkills - form.skills.length)}
            maxLength={LIMITS.skill}
            disabled={disabled}
          />
        )}
      </FormField>

      <FormField
        name="skills"
        label="Technical skills"
        error={errors.skills}
        hint="Tools, frameworks and concepts you know. Add at least one skill or language."
      >
        {(control) => (
          <ChipInput
            {...control}
            value={form.skills}
            onChange={(value) => onChange("skills", value)}
            suggestions={SKILL_SUGGESTIONS}
            placeholder="Example: React"
            maxItems={Math.max(form.skills.length, LIMITS.maxSkills - form.languages.length)}
            maxLength={LIMITS.skill}
            disabled={disabled}
          />
        )}
      </FormField>

      <p className="text-xs text-muted-foreground">
        {total} of {LIMITS.maxSkills} skills and languages added.
      </p>
    </div>
  );
}

export function DirectionStep({ form, errors, onChange, disabled }) {
  return (
    <div className="space-y-6">
      <FormField
        name="targetRole"
        label="Preferred career role"
        error={errors.targetRole}
        hint="The job you want to prepare for. You can change it later."
      >
        {(control) => (
          <div className="space-y-2">
            <Input
              {...control}
              value={form.targetRole}
              onChange={(event) => onChange("targetRole", event.target.value)}
              placeholder="Example: Frontend Developer"
              autoComplete="off"
              disabled={disabled}
              className="h-10"
            />
            <SuggestionButtons
              options={ROLE_SUGGESTIONS}
              current={form.targetRole}
              onPick={(value) => onChange("targetRole", value)}
              disabled={disabled}
            />
          </div>
        )}
      </FormField>

      <FormField
        name="interests"
        label="Areas of interest"
        error={errors.interests}
        hint="Topics you would like to explore. Add at least one."
      >
        {(control) => (
          <ChipInput
            {...control}
            value={form.interests}
            onChange={(value) => onChange("interests", value)}
            suggestions={INTEREST_SUGGESTIONS}
            placeholder="Example: Web Development"
            maxItems={LIMITS.maxInterests}
            maxLength={LIMITS.interest}
            disabled={disabled}
          />
        )}
      </FormField>
    </div>
  );
}
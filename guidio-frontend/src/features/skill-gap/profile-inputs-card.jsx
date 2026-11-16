import { CircleAlert, CircleCheck } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Check({ done, label, children }) {
  const Icon = done ? CircleCheck : CircleAlert;

  return (
    <div className="flex min-w-0 gap-2.5">
      <Icon
        aria-hidden="true"
        className={done ? "mt-0.5 size-4 shrink-0 text-success" : "mt-0.5 size-4 shrink-0 text-warning"}
      />
      <div className="min-w-0 space-y-1.5">
        <p className="text-sm font-medium">{label}</p>
        {children}
      </div>
    </div>
  );
}

/**
 * The analysis is built by the server from the saved profile, so the target
 * role and skills shown here are the exact inputs it will use.
 */
export function ProfileInputsCard({ profile, canAnalyze }) {
  const skills = Array.isArray(profile?.skills) ? profile.skills : [];
  const hasRole = Boolean(profile?.targetRole);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis inputs</CardTitle>
        <CardDescription>
          Taken from your saved profile. Update your profile to change them.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Check done={hasRole} label="Target role">
          <p className="break-words text-sm text-muted-foreground">
            {hasRole ? profile.targetRole : "Not added yet"}
          </p>
        </Check>

        <Check done={skills.length > 0} label="Current skills">
          {skills.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="secondary" className="h-auto whitespace-normal py-0.5">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Add at least one skill
            </p>
          )}
        </Check>

        <Link
          to="/profile"
          className={buttonVariants({
            variant: canAnalyze ? "outline" : "default",
            size: "lg",
            className: "w-full",
          })}
        >
          {canAnalyze ? "Edit profile" : "Complete your profile"}
        </Link>
      </CardContent>
    </Card>
  );
}

import { LEGAL, SITE } from "@/lib/site-config";
import {
  EmailLink,
  LegalLayout,
  LegalList,
  LegalSection,
  Placeholder,
  TextLink,
} from "@/pages/legal/legal-layout";

function TermsPage() {
  return (
    <LegalLayout title="Terms and Conditions" updated={SITE.legalUpdated}>
      <LegalSection id="acceptance" title="1. Acceptance of these terms">
        <p>
          These terms apply to your use of Guidio AI, operated by{" "}
          <Placeholder>{LEGAL.operator}</Placeholder>. By creating an account
          or using the service, you agree to them and to our{" "}
          <TextLink to="/privacy">Privacy Policy</TextLink>. If you do not
          agree, please do not use the service.
        </p>
      </LegalSection>

      <LegalSection id="service" title="2. The service">
        <p>
          Guidio AI is a free AI career companion for students. It includes an
          AI assistant, skill gap analysis, career guidance, mock interviews,
          a student profile and a dashboard.
        </p>
      </LegalSection>

      <LegalSection id="accounts" title="3. Accounts and your responsibilities">
        <LegalList>
          <li>Give accurate information and keep it up to date.</li>
          <li>
            Keep your sign-in details secure. You are responsible for activity
            under your account.
          </li>
          <li>Tell us promptly if you believe your account has been misused.</li>
          <li>
            Age requirement: <Placeholder>{LEGAL.minimumAge}</Placeholder>
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="use" title="4. Acceptable use">
        <p>You agree not to:</p>
        <LegalList>
          <li>Use the service for anything unlawful, harmful or deceptive</li>
          <li>
            Try to break, probe or bypass the security, authentication or rate
            limits of the service
          </li>
          <li>
            Use bots, scripts or other automated means to send requests in bulk
            or to copy the service
          </li>
          <li>
            Ask the AI to produce hateful, illegal, abusive or misleading
            content, or content that infringes someone else’s rights
          </li>
          <li>
            Impersonate another person or submit someone’s personal data
            without the right to do so
          </li>
          <li>Interfere with the service or with other users’ use of it</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="ai" title="5. AI-generated content">
        <p>
          Responses are produced by AI models. They can be inaccurate,
          incomplete, out of date or biased, and similar questions may receive
          different answers. Always check important information with reliable
          sources before relying on it. AI output is not professional advice.
        </p>
      </LegalSection>

      <LegalSection id="guidance" title="6. Educational and career guidance">
        <p>
          Career plans, readiness scores, skill gap reports and interview
          feedback are informational estimates to help you plan and practise.
          They do not guarantee a job, an interview result, an admission, a
          salary or any other outcome, and they are not professional counselling
          or legal, financial or medical advice. Decisions about your education
          and career are yours.
        </p>
      </LegalSection>

      <LegalSection id="content" title="7. Your content">
        <p>
          You keep ownership of what you submit, such as profile details,
          messages and interview answers. You give us permission to store and
          process it, including by sending the needed parts to our AI providers,
          only to run and improve the service as described in the{" "}
          <TextLink to="/privacy">Privacy Policy</TextLink>. You are
          responsible for the content you submit.
        </p>
      </LegalSection>

      <LegalSection id="availability" title="8. Availability and limits">
        <p>
          Guidio AI uses free AI services, which have usage quotas and rate
          limits. The service, or parts of it, may be slow, limited or
          unavailable at times, and we may change, pause or remove features. We
          do not promise uninterrupted or error-free operation.
        </p>
      </LegalSection>

      <LegalSection id="third-party" title="9. Third-party services">
        <p>
          The service relies on providers such as Clerk, hosting and database
          providers and AI providers. Their own terms apply to their services,
          and we are not responsible for their availability or conduct.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="10. Intellectual property">
        <p>
          The Guidio AI name, design and software belong to{" "}
          <Placeholder>{LEGAL.operator}</Placeholder> or its licensors. You
          may use the service for your own personal career preparation. You
          may not copy, resell or reverse engineer it except where the law
          allows.
        </p>
      </LegalSection>

      <LegalSection
        id="liability"
        title="11. Disclaimers and limitation of liability"
      >
        <p>
          The service is provided “as is” and “as available”. To the fullest
          extent permitted by law, we are not liable for indirect, incidental
          or consequential losses, or for decisions you make based on
          AI-generated content. Nothing in these terms excludes liability that
          cannot be excluded by law.{" "}
          <Placeholder>
            [LEGAL REVIEW: have a lawyer confirm this clause for your
            jurisdiction]
          </Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="termination" title="12. Suspension and termination">
        <p>
          We may suspend or end access to the service if you break these terms,
          abuse the service or if the law requires it. You can stop using
          Guidio AI at any time and may ask us to delete your account as
          described in the{" "}
          <TextLink to="/privacy">Privacy Policy</TextLink>.
        </p>
      </LegalSection>

      <LegalSection id="law" title="13. Governing law">
        <p>
          <Placeholder>{LEGAL.governingLaw}</Placeholder>
        </p>
      </LegalSection>

      <LegalSection id="changes" title="14. Changes to these terms">
        <p>
          We may update these terms. The “Last updated” date shows the latest
          version. Continuing to use the service after a change means you
          accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="15. Contact">
        <p>
          Questions about these terms: <EmailLink />.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default TermsPage;

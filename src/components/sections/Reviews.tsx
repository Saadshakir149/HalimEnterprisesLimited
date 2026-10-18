import { Container } from "@/components/ui/Container";
import { DevWarning } from "@/components/ui/DevWarning";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { Icon } from "@/components/ui/Icon";
import { Section, type SectionTone } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { reviewsSection as copy } from "@/content/pages";
import type { Review } from "@/content/site";
import { getGoogleProfileUrl, getReviews, integrationIssues } from "@/lib/integrations";
import { fill } from "@/lib/template";

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

/** The reviewer's own rating, if they gave one. Never an average or a count. */
function Rating({ rating }: { rating: NonNullable<Review["rating"]> }) {
  return (
    <p className="flex items-center gap-0.5 text-teal">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" size={18} className={index < rating ? "fill-current" : "text-muted"} />
      ))}
      <span className="sr-only">{fill(copy.rating, { rating: String(rating) })}</span>
    </p>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-md border border-line bg-surface p-6">
      {review.rating !== undefined && <Rating rating={review.rating} />}
      <blockquote className="flex-1">
        <p className="text-body text-ink">“{review.text}”</p>
      </blockquote>
      <figcaption className="flex flex-col gap-0.5 border-t border-line pt-4 text-small">
        <span className="font-semibold text-navy">{review.author}</span>
        <span className="text-muted">
          {copy.source}, <time dateTime={review.date}>{monthYear.format(new Date(review.date))}</time>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Static, client-approved reviews. Renders nothing at all unless
 * features.reviews is on and at least one review has permission, so a
 * disabled section leaves no gap. No Google widget or script is ever loaded.
 */
export function Reviews({ tone = "paper", className }: { tone?: SectionTone; className?: string }) {
  const reviews = getReviews();
  const googleUrl = getGoogleProfileUrl();
  if (reviews.length === 0) {
    const issue = integrationIssues.reviews();
    return issue ? <DevWarning className="mx-auto my-4 block">{issue}</DevWarning> : null;
  }
  const profileIssue = integrationIssues.googleProfile();

  return (
    <Section tone={tone} aria-labelledby="reviews-title" className={className}>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <SectionIntro id="reviews-title" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} className="lg:col-span-4">
          {googleUrl ? (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-body inline-flex w-fit items-center gap-1.5 font-semibold"
            >
              {copy.googleLink}
              <ExternalMark />
            </a>
          ) : (
            <DevWarning>{profileIssue ?? "site.googleBusinessProfileUrl not set"}: Google link hidden</DevWarning>
          )}
        </SectionIntro>
        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {reviews.map((review) => (
            <li key={`${review.author}-${review.date}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

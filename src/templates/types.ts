/**
 * Template state machine.
 *
 * Locked website rule:
 * "No website page may imply that a feature is available before it is
 *  operational in the production mobile app."
 *
 * Every marketplace-linked template supports three states so we can flip
 * from Coming Soon → Beta → Live without redesigning the page.
 */
export type TemplateState = "coming-soon" | "beta" | "live";

export interface Breadcrumb {
  label: string;
  href: string;
}
